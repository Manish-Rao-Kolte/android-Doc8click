import {StyleSheet, Text, View, Modal, Alert, Pressable} from 'react-native';
import React from 'react';

type CustomModalProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleCamera: () => void;
  handleGallery: () => void;
};

const CustomModal = ({
  modalVisible,
  setModalVisible,
  handleCamera,
  handleGallery,
}: CustomModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <Text style={styles.modalText}>Upload Image</Text>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleCamera}>
            <Text style={styles.textStyle}>Use Camera</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleGallery}>
            <Text style={styles.textStyle}>Choose from Gallery</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              X
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: '150%',
  },
  modalView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    margin: 20,
    backgroundColor: 'white',
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
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
  },
});
