import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  useColorScheme,
  Switch,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {store} from '../store';
import {setFilterValues} from '../actions';

const FiltersModal = ({modalVisible, setModalVisible}) => {
  const colorScheme = useColorScheme();

  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(previousState => !previousState);

  const [isPCR, setIsPCR] = useState(false);
  const toggleIsPCR = () => setIsPCR(previousState => !previousState);

  const [isAccessible, setIsAccessible] = useState(false);
  const toggleIsAccessible = () =>
    setIsAccessible(previousState => !previousState);

  const [isAppointment, setIsAppointment] = useState(false);
  const toggleIsAppointment = () =>
    setIsAppointment(previousState => !previousState);

  const [isChildTesting, setIsChildTesting] = useState(false);
  const toggleIsChildTesting = () =>
    setIsChildTesting(previousState => !previousState);

  let onSave = () => {
    store.dispatch(
      setFilterValues({
        open: isOpen,
        hasPCR: isPCR,
        accessible: isAccessible,
        noAppointment: isAppointment,
        childTesting: isChildTesting,
      }),
    );
    setModalVisible(!modalVisible);
  };

  let onReset = () => {
    setIsOpen(() => false);
    setIsPCR(() => false);
    setIsAccessible(() => false);
    setIsAppointment(() => false);
    setIsChildTesting(() => false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                colorScheme === 'dark' ? Colors.dark : Colors.white,
            },
          ]}>
          <View style={styles.container}>
            <Switch
              thumbColor={isOpen ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIsOpen}
              value={isOpen}
              style={styles.switch}
            />
            <Text> Open Now</Text>
          </View>

          <View style={styles.container}>
            <Switch
              thumbColor={isPCR ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIsPCR}
              value={isPCR}
            />
            <Text> PCR</Text>
          </View>

          <View style={styles.container}>
            <Switch
              thumbColor={isAccessible ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIsAccessible}
              value={isAccessible}
            />
            <Text> Accessible</Text>
          </View>

          <View style={styles.container}>
            <Switch
              thumbColor={isAppointment ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIsAppointment}
              value={isAppointment}
            />
            <Text> No Appointment Necessary</Text>
          </View>

          <View style={styles.container}>
            <Switch
              thumbColor={isChildTesting ? '#2196F3' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleIsChildTesting}
              value={isChildTesting}
            />
            <Text> Child Testing</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.buttonReset]}
              onPress={onReset}>
              <Text style={styles.textStyle}>Reset</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onSave}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 20,
    marginLeft: 20,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  buttonReset: {
    backgroundColor: '#3e3e3e',
    borderColor: '#73818d',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#73818d',
  },
  checkbox: {
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    width: 230,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default FiltersModal;
