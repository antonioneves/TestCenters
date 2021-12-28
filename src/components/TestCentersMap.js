import React, { useEffect } from 'react';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import {StyleSheet, Dimensions, Text, useColorScheme, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {setFilteredTestCenters} from '../actions';
import {store} from '../store';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function isOpen(center, dayName, time) {
  const openingHours = center.attributes.openingHours[dayName];

  for (const openingHour of openingHours)
    if (openingHour.start < time && openingHour.end > time)
      return true;
  
  return false;
}

function filterTestCenters(centers, search, filters) {
  // Filter testCenters by name, street and postalCode
  // Get max min and mean lat and lng

  let maxLat, maxLng, minLat, minLng;

  let testCenters = [];
  let filteredTestCenters = [];

  const today = new Date();
  const day = today.getDay();

  const dayName = days[day];
  const time = today.toLocaleTimeString('de').replace(/(:\d{2}| [AP]M)$/, "");

  for (const center of centers) {
    // Search center

    if (filters.open && !isOpen(center, dayName, time))
      continue;

    if (filters.hasPCR && !center.attributes.hasConfirmatoryPcr)
      continue;

    if (filters.accessible && !center.attributes.isAccessible)
      continue;

    if (filters.noAppointment && center.attributes.requiresAppointment === "YES")
      continue;

    if (filters.childTesting && !center.attributes.hasChildTesting)
      continue;

    center.attributes.name = center.attributes.name.replace(center.attributes.postalCode,'').trim();

    filteredTestCenters.push(center);

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
      center.attributes.latitude > 52.339858 &&
      center.attributes.latitude < 52.674251 &&
      center.attributes.longitude > 13.090999 &&
      center.attributes.longitude < 13.765285
    ) {
      testCenters.push(center);

      if (!maxLat || center.attributes.latitude > maxLat)
        maxLat = center.attributes.latitude;
      
      if (!maxLng || center.attributes.longitude > maxLng)
        maxLng = center.attributes.longitude;
      
      if (!minLat || center.attributes.latitude < minLat)
        minLat = center.attributes.latitude;
      
      if (!minLng || center.attributes.longitude < minLng)
        minLng = center.attributes.longitude;
    }
  }

  const latDif = Math.abs(maxLat - minLat);
  const lngDif = Math.abs(maxLng - minLng);

  let region = {
    latitude: (maxLat + minLat) / 2,
    longitude: (maxLng + minLng) / 2,
    latitudeDelta: latDif + 0.1*latDif,
    longitudeDelta: lngDif + 0.1*lngDif,
  };

  if (!testCenters.length) {
    if (search.location) {
      testCenters = filteredTestCenters;
      region = {
        latitude: search.location.lat,
        longitude: search.location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
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

function TestCentersCallout({attributes, navigation}) {
  const colorScheme = useColorScheme();
  return (
    <Callout tooltip onPress={() => navigation.navigate('Test Center Details', {testCenter: attributes})}>
      <View style={[
        styles.callout,
        {
          backgroundColor:
            colorScheme === 'dark' ? Colors.dark : Colors.white
        },
      ]}>
        <Text style={[styles.text, styles.title, {
          color: colorScheme === 'dark' ? Colors.white : Colors.black,
        }]}>
          {attributes.name}
        </Text>
        <Text
          style={[styles.text, {
            color: colorScheme === 'dark' ? Colors.white : Colors.black,
          }]}>
            {attributes.street}
        </Text>
        <Text
          style={[styles.text, {
            color: colorScheme === 'dark' ? Colors.white : Colors.black,
          }]}>
            {attributes.postalCode +
              ' ' +
              attributes.city}
        </Text>
      </View>
    </Callout>
  );
}

function Map({navigation}) {
  const allTestCenters = useSelector(state => state.testCenters);
  const search = useSelector(state => state.searchResults);
  const filters = useSelector(state => state.filterValues);

  let {testCenters, region} = filterTestCenters(allTestCenters, search, filters);

  return (
    <MapView style={styles.map} region={region}>
      {testCenters.map((center, key) => (
        <Marker
          key={key}
          coordinate={{
            latitude: center.attributes.latitude,
            longitude: center.attributes.longitude,
          }}>
          <TestCentersCallout attributes={center.attributes} navigation={navigation}/>
        </Marker>
      ))}
    </MapView>
  );
}

export default class TestCentersMap extends React.Component {
  render() {
    return <Map navigation={this.props.navigation}/>;
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50,
    flex: 1,
    position: 'absolute',
  },
  callout: {
    borderRadius: 10,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text: {
    alignContent: 'center',
    textAlign: 'center',
  },
});
