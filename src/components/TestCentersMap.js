import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {createStore} from 'redux';

import getTestCenters from '../requests/testCenters.js';
import rootReducer from '../reducers';

function Map() {
  const testCenters = useSelector(state => state.testCenters);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 52.520008,
        longitude: 13.404954,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}>
      {testCenters.map((center, key) => (
        <MapView.Marker
          key={key}
          coordinate={{
            latitude: center.attributes.latitude,
            longitude: center.attributes.longitude,
          }}
          title={center.attributes.name}
          description={
            center.attributes.street +
            ', ' +
            center.attributes.postalCode +
            ' ' +
            center.attributes.city
          }
        />
      ))}
    </MapView>
  );
}

export default class TestCentersMap extends React.Component {
  store = createStore(rootReducer);

  constructor(props) {
    super(props);
    getTestCenters(this.store);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Map />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    position: 'absolute',
  },
});
