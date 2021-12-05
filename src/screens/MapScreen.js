import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StatusBar, useColorScheme} from 'react-native';

import TestCenterSearch from '../components/SearchBar.js';
import TestCentersMap from '../components/TestCentersMap.js';

export default function MappScreen() {
  const colorScheme = useColorScheme();

  const searchProps = {
    color: colorScheme,
  };

  const barColor = Platform.OS === 'ios' ? 'light-content' : 'dark-content';

  return (
    <SafeAreaProvider>
      <TestCentersMap />
      <StatusBar
        translucent
        animated
        barStyle={barColor}
        backgroundColor="transparent"
      />
      <TestCenterSearch {...searchProps} />
    </SafeAreaProvider>
  );
}
