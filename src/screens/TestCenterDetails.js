import React from 'react';
import {Text, View, Linking} from 'react-native';

function getLink(website) {
  if (website.includes('http')) {
    return website;
  }
  return 'http://' + website;
}

function goToWebsite(attributes) {
  return attributes.website
            ? Linking.openURL(getLink(attributes.website))
            : null;
}

export default function TestCenterDetails({ navigation }) {
  return (
    <View>
      <Text></Text>
    </View>
  );
}
