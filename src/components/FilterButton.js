import React, {useState} from 'react';
import {StyleSheet, useColorScheme, Pressable} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSlidersH} from '@fortawesome/free-solid-svg-icons';

import FiltersModal from './FiltersModal';

function FilterButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={[
        styles.filterButtonStyle,
        {backgroundColor: colorScheme === 'dark' ? Colors.dark : Colors.white},
      ]}
      onPress={() => setModalVisible(!modalVisible)}>
      <FontAwesomeIcon style={styles.iconStyle} icon={faSlidersH} />
      <FiltersModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filterButtonStyle: {
    borderRadius: 50,
    width: '10%',
    marginTop: 10,
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#73818d',
  },
});

export default FilterButton;
