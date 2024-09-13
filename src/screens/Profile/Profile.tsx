import { StyleSheet, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from '../../components/Modal';
import { RootScreenProps } from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';

const imagePickerOptions = {
  maxWidth: 72,
  maxHeight: 72,
  mediaType: 'photo' as const,
  saveToPhotos: true,
};

const Profile = ({ navigation }: RootScreenProps<'Profile'>) => {
  const [imagePath, setImagePath] = useState<string | boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCamera = () => {
    launchCamera(imagePickerOptions, response => {
      if (!response.didCancel) {
        if (response.assets && response.assets[0].uri) {
          setImagePath(response.assets[0].uri);
        }
        setModalVisible(false);
      }
    },
    );
  };

  const handleGallery = () => {
    launchImageLibrary(
      imagePickerOptions,
      response => {
        if (!response.didCancel) {
          if (response.assets && response.assets[0].uri) {
            setImagePath(response.assets[0].uri);
          }
          setModalVisible(false);
        }
      },
    );
  };
  return (
    <SafeScreen>
      <View style={styles.profileContainer}>
        <Header isHome={false} title={'Profile'} navigation={navigation} />
        <View style={styles.profileMainCont}>
          <View style={styles.profileImgCont}>
            <Image style={styles.profileImg} source={!imagePath ? require("../../images/user-icon.png") : { uri: imagePath }} />
            <Pressable
              style={styles.profileEditIconCont}
              onPress={() => setModalVisible(true)}>
              <Image
                style={styles.profileEditIcon}
                source={require('../../images/edit-icon.png')}
              />
            </Pressable>
          </View>
          <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            handleCamera={handleCamera}
            handleGallery={handleGallery}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileMainCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImgCont: {
    position: 'relative',
    height: 74,
    width: 74,
    borderRadius: 37,
  },
  profileImg: {
    objectFit: 'cover',
    height: 72,
    width: 72,
    borderRadius: 35,
  },
  profileEditIconCont: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(68,182,120)',
    bottom: 5,
    right: 2,
  },
  profileEditIcon: {
    height: 10,
    width: 10,
    tintColor: 'white',
  },
});
