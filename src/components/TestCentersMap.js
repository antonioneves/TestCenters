import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import {StyleSheet, Dimensions, Linking, Text} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {setFilteredTestCenters} from '../actions';
import {store} from '../store';

function getLink(website) {
  if (website.includes('http')) {
    return website;
  }
  return 'http://' + website;
}

function getDirectionUrl(lat, lng) {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = `${lat},${lng}`;
  const label = 'Custom Label';
  return Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
}

function filterTestCenters(centers, search) {
  // Filter testCenters by name, street and postalCode
  // Get max min and mean lat and lng

  let maxLat, maxLng, minLat, minLng;

  let testCenters = [];

  for (const center of centers) {
    // Search center
    if (
      (center.attributes.name
        .toLowerCase()
        .includes(search.search.toLowerCase()) ||
        center.attributes.street
          .toLowerCase()
          .includes(search.search.toLowerCase()) ||
        center.attributes.postalCode
          .toLowerCase()
          .includes(search.search.toLowerCase())) &&
      center.attributes.latitude > 47.40724 &&
      center.attributes.latitude < 54.9079 &&
      center.attributes.longitude > 5.98815 &&
      center.attributes.longitude < 14.98853
    ) {
      testCenters.push(center);

      if (!maxLat || center.attributes.latitude > maxLat) {
        maxLat = center.attributes.latitude;
      }
      if (!maxLng || center.attributes.longitude > maxLng) {
        maxLng = center.attributes.longitude;
      }
      if (!minLat || center.attributes.latitude < minLat) {
        minLat = center.attributes.latitude;
      }
      if (!minLng || center.attributes.longitude < minLng) {
        minLng = center.attributes.longitude;
      }
    }
  }

  let region = {
    latitude: (maxLat + minLat) / 2,
    longitude: (maxLng + minLng) / 2,
    latitudeDelta: Math.abs(maxLat - minLat) + 0.005,
    longitudeDelta: Math.abs(maxLng - minLng) + 0.005,
  };

  if (!testCenters.length) {
    testCenters = centers;

    if (search.location)
      region = {
        latitude: search.location.lat,
        longitude: search.location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    else
      region = {
        latitude: 52.520007,
        longitude: 13.404954,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
  }
  
  useEffect(() => {
    store.dispatch(setFilteredTestCenters(testCenters));
  }, [testCenters])

  return {
    testCenters,
    region,
  };
}

function TestCentersCallout(attributes) {
  return (
    <Callout style={styles.callout}>
      <Text
        style={{color: 'blue'}}
        onPress={() => {
          console.log(attributes.website);
          return attributes.website
            ? Linking.openURL(getLink(attributes.website))
            : null;
        }}>
        {attributes.name}
      </Text>
      <Text>
        {attributes.street +
          ', ' +
          attributes.postalCode +
          ' ' +
          attributes.city}
      </Text>
      <Icon
        name="navigate-circle-outline"
        onPress={() =>
          Linking.openURL(
            getDirectionUrl(attributes.latitude, attributes.longitude),
          )
        }
      />
    </Callout>
  );
}

function Map() {
  const allTestCenters = useSelector(state => state.testCenters);
  const search = useSelector(state => state.searchResults);

  let {testCenters, region} = filterTestCenters(allTestCenters, search);

  return (
    <MapView style={styles.map} region={region}>
      {testCenters.map((center, key) => (
        <Marker
          key={key}
          coordinate={{
            latitude: center.attributes.latitude,
            longitude: center.attributes.longitude,
          }}>
          <TestCentersCallout {...center.attributes} />
        </Marker>
      ))}
    </MapView>
  );
}

export default class TestCentersMap extends React.Component {
  render() {
    return <Map />;
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    position: 'absolute',
  },
  callout: {
    backgroundColor: '#fff',
  },
});
