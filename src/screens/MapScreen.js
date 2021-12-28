import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StatusBar, useColorScheme} from 'react-native';

import TestCenterSearch from '../components/TestCenterSearch.js';
import TestCentersMap from '../components/TestCentersMap.js';

import { useStatusBar } from '../utils/Hooks';

export default function MapScreen({navigation}) {
  const colorScheme = useColorScheme();

  const barColor = Platform.OS === 'ios' ? 'light-content' : 'dark-content';
  useStatusBar(barColor);

  return (
      <SafeAreaProvider>
        <TestCentersMap navigation={navigation}/>
        <StatusBar
          translucent
          animated
          backgroundColor="transparent"
        />
        <TestCenterSearch color={colorScheme} />
      </SafeAreaProvider>
  );
}
