import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';

export default function ListScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
    </SafeAreaProvider>
  );
}
