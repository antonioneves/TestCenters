import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme, Dimensions} from 'react-native';
import {Provider} from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapScreen from './src/screens/MapScreen.js';
import ListScreen from './src/screens/ListScreen.js';

import getTestCenters from './src/requests/testCenters.js';
import { store } from './src/store';

const {Navigator, Screen} = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  getTestCenters(store);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Map')
                iconName = focused ? 'ios-map' : 'ios-map-outline';
              else if (route.name === 'List')
                iconName = focused ? 'ios-list' : 'ios-list-outline';

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#2196F3',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor:
                colorScheme === 'dark' ? Colors.dark : Colors.white,
              paddingBottom: 5,
              paddingTop: 5,
              width: '50%',
              height: '7%',
              position: 'absolute',
              borderRadius: 100,
              bottom: 15,
              left: Dimensions.get('window').width / 4,
            },
          })}>
          <Screen
            name="Map"
            options={{headerShown: false}}
            component={MapScreen}
          />
          <Screen name="List" component={ListScreen} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
