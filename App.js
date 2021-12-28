import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MapScreen from './src/screens/MapScreen.js';
import ListScreen from './src/screens/ListScreen.js';
import TestCenterDetails from './src/screens/TestCenterDetails.js';

import getTestCenters from './src/requests/testCenters.js';
import {store} from './src/store';

function Home() {
  const {Navigator, Screen} = createBottomTabNavigator();
  const colorScheme = useColorScheme();
  getTestCenters(store);

  return (
    <Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Map')
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          else if (route.name === 'Test Centers List')
            iconName = focused ? 'ios-list' : 'ios-list-outline';

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor:
            colorScheme === 'dark' ? Colors.darker : Colors.white,
          paddingBottom: 5,
          paddingTop: 5,
          // width: '50%',
          // height: '7%',
          // position: 'absolute',
          // borderRadius: 100,
          // bottom: 15,
          // left: Dimensions.get('window').width / 4,
        },
      })}>
      <Screen
        name="Map"
        options={{headerShown: false}}
        component={MapScreen}
      />
      <Screen name="Test Centers List" component={ListScreen} options={{headerStyle: {
              backgroundColor: colorScheme === 'dark' ? Colors.darker : Colors.white
           }, headerTitleStyle: { color: colorScheme === 'dark' ? Colors.white : Colors.dark }}}/>
    </Navigator>
  );
}

export default function App() {
  const {Navigator, Screen} = createNativeStackNavigator();
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Screen name="Test Center Details" component={TestCenterDetails} options={{headerStyle: {
              backgroundColor: colorScheme === 'dark' ? Colors.darker : Colors.white
           }, headerTintColor: { color: colorScheme === 'dark' ? Colors.white : Colors.dark }}}/>
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
}
