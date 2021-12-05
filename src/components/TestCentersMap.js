import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Dimensions} from 'react-native';

export default class TestCentersMap extends React.Component {
  render() {
    return (
      <MapView
        style={this.styles.map}
        initialRegion={{
          latitude: 52.520008,
          longitude: 13.404954,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <MapView.Marker
          coordinate={{latitude: 52.520008, longitude: 13.404954}}
          title={'title'}
          description={'description'}
        />
      </MapView>
    );
  }

  styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
      position: 'absolute',
    },
  });
}
