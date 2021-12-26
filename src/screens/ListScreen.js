import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme, SafeAreaView, ScrollView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const testCenters = useSelector(state => state.filteredTestCenters);

  return (
    <ScrollView>
      <SafeAreaProvider>
          {testCenters.map((center, key) => (
          <ListItem key={key} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{center.attributes.name}</ListItem.Title>
              <ListItem.Subtitle>
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
