import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import { useStatusBar } from '../utils/Hooks';

export default function ListScreen({navigation}) {
  const colorScheme = useColorScheme();
  const testCenters = useSelector(state => state.filteredTestCenters);

  useStatusBar(colorScheme === 'dark' ? 'light-content' : 'dark-content');

  const backgroundstyle = {
    backgroundColor: colorScheme === 'dark' ? Colors.dark : Colors.white,
  };

  const textstyle = {
    color: colorScheme === 'dark' ? Colors.white : Colors.black,
  };

  return (
    <ScrollView style={backgroundstyle}>
      <SafeAreaProvider>
        {testCenters.map((center, key) => (
          <ListItem containerStyle={backgroundstyle} key={key} bottomDivider onPress={() => { navigation.navigate('Test Center Details', {testCenter: center.attributes})}}>
            <ListItem.Content>
              <ListItem.Title style={textstyle}>{center.attributes.name}</ListItem.Title>
              <ListItem.Subtitle style={textstyle}>
                {center.attributes.street +
                ', ' +
                center.attributes.postalCode +
                ' ' +
                center.attributes.city}
            </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </SafeAreaProvider>
    </ScrollView>
  );
}
