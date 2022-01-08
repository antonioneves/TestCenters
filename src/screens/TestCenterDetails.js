import React from 'react';
import {Text, StyleSheet, SafeAreaView, ScrollView, useColorScheme, Linking} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import { useStatusBar } from '../utils/Hooks';

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function getLink(website) {
  if (website.includes('http')) {
    return website;
  }
  return 'http://' + website;
}

function goToWebsite(website) {
  return website
            ? Linking.openURL(getLink(website))
            : null;
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function OpeningTimes(testCenter) {
  return (
    days.map(day => {
      if (testCenter.openingHours[day].length)
        return (
          <Text key={day}>
            <Text style={{textDecorationLine: 'underline'}}>{'\n' + toTitleCase(day) + '\n'}</Text>
            {
              testCenter.openingHours[day].map(hour => {
                return (
                  <Text key={hour}>
                    {' ' + hour.start + ' - ' + hour.end + ' h\n'}
                  </Text>
                );
              })
            }
          </Text>
        );
      return null;
    })
  )
}

function Opening({testCenter}) {
  const colorScheme = useColorScheme();
  const openingTimes = OpeningTimes(testCenter);

  if (!openingTimes.every( v => v === null ))
    return (
      <Text style={[styles.textGroup, {color: colorScheme === 'dark' ? Colors.white : Colors.dark}]}>
        <Text style={styles.textStyleTitle}>{'Opening Hours\n'}</Text>
        <Text style={{color: colorScheme === 'dark' ? Colors.white : Colors.dark}}>
          <Text>{openingTimes}</Text>
        </Text>
      </Text>
    );

  return null;
}

function Properties({name, value, link = false}) {
  const colorScheme = useColorScheme();

  if (value) {
    if (!link)
      return (
        <Text style={[styles.textGroup, {color: colorScheme === 'dark' ? Colors.white : Colors.dark}]}>
          <Text style={styles.textStyleTitle}>{name}: </Text>
          <Text>{value}</Text>
        </Text>
      );

    return (
      <Text style={[styles.textGroup, {color: colorScheme === 'dark' ? Colors.white : Colors.dark}]}>
        <Text style={styles.textStyleTitle}>{name}: </Text>
        <Text onPress={() => goToWebsite(value)}>{value}</Text>
      </Text>
    );
  }
    
  return null;
}

export default function TestCenterDetails({route}) {
  const {testCenter} = route.params;
  const colorScheme = useColorScheme();

  useStatusBar(colorScheme === 'dark' ? 'light-content' : 'dark-content');

  return (
    <SafeAreaView style={[styles.container, {
      backgroundColor: colorScheme === 'dark' ? Colors.dark : Colors.white,
    }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={[styles.textViewStyle, {
          backgroundColor: colorScheme === 'dark' ? Colors.dark : Colors.white,
        }]}>
        <Text style={styles.textGroup}>
          <Text style={styles.titleText}>{testCenter.name}</Text>
        </Text>
        <Properties name={"Website"} value={testCenter.website} link/>
        <Properties name={"Appointment"} value={testCenter.appointmentUrl} link/>
        <Properties name={"Phone"} value={testCenter.phone} />
        <Properties name={"Email"} value={testCenter.email} />
        <Properties name={"Address"} value={testCenter.street + ', ' + testCenter.postalCode + ' ' + testCenter.city} />
        <Properties name={"Appointment Required"} value={toTitleCase(testCenter.requiresAppointment)} />
        <Properties name={"Pcr"} value={testCenter.hasConfirmatoryPcr ? 'Yes' : 'No'} />
        <Properties name={"Child Testing"} value={testCenter.hasChildTesting ? 'Yes' : 'No'} />
        <Properties name={"Accessible"} value={testCenter.isAccessible ? 'Yes' : 'No'} />
        <Properties name={"Mobile"} value={testCenter.isMobile ? 'Yes' : 'No'} />
        <Properties name={"Senate Station"} value={testCenter.isSenateStation ? 'Yes' : 'No'} />
        <Opening testCenter={testCenter}></Opening>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 180,
    height: 300,
    margin: 20,
  },
  textGroup: {
    marginTop: 14,
  },
  textStyleTitle: { 
    fontWeight: 'bold',
  },
  textViewStyle: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
});