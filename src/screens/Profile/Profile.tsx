import {StyleSheet, View, Image, Pressable, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Modal from '../../components/Modal';
import {RootScreenProps} from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../redux/reducers/userSlice/userSlice';
import {authSelector} from '../../redux/reducers/authSlice/authSlice';
import GenderSelect from '../../components/molecules/GenderSelect/GenderSelect';
import TextInputVarient from '../../components/atoms/TextInputVarient/TextInputVarient';

const imagePickerOptions = {
  maxWidth: 500,
  maxHeight: 500,
  mediaType: 'photo' as const,
  saveToPhotos: true,
  quality: 1 as const,
};

const Profile = ({navigation}: RootScreenProps<'Profile'>) => {
  const dispatch = useDispatch();
  const {userData} = useSelector(authSelector);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(
    `${userData?.firstName || ''} ${userData?.lastName || ''}`,
  );
  const [address, setAddress] = useState(userData?.address || '');
  const [gender, setGender] = useState(userData?.gender || '');

  // useEffect(() => {
  //   console.log(userData);
  // }, []);

  const handleCamera = () => {
    launchCamera(imagePickerOptions, response => {
      if (!response.didCancel) {
        if (response.assets && response.assets[0].uri) {
          uploadImage(response.assets[0]);
        }
        setModalVisible(false);
      }
    });
  };

  const handleGallery = () => {
    launchImageLibrary(imagePickerOptions, response => {
      if (!response.didCancel) {
        if (response.assets && response.assets[0].uri) {
          uploadImage(response.assets[0]);
        }
        setModalVisible(false);
      }
    });
  };

  const uploadImage = async (asset: Asset) => {
    const formData = new FormData();
    formData.append('image', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName,
    });
    dispatch<any>(updateUser({user: userData, data: formData}));
  };

  const handleCancel = () => {
    setName(`${userData?.firstName || ''} ${userData?.lastName || ''}`);
    setAddress(userData?.address || '');
    setGender(userData?.gender || '');
    setIsEditing(false);
  };

  const updateProfile = () => {
    const formData = new FormData();
    formData.append('firstName', name.split(' ')[0]);
    formData.append('lastName', name.split(' ')[1]);
    formData.append('gender', gender);
    formData.append('address', address);
    dispatch<any>(updateUser({user: userData, data: formData})).then(
      (res: any) => {
        if (res.payload) {
          if (!res.error) {
            setIsEditing(false);
          }
        }
      },
    );
  };

  return (
    <SafeScreen>
      <View style={styles.profileContainer}>
        <Header isHome={false} title={'Profile'} navigation={navigation} />
        <View style={styles.profileMainCont}>
          {/* Profile Image Section */}
          <View style={styles.profileImgCont}>
            <Image
              style={styles.profileImg}
              source={
                !userData?.image
                  ? require('../../images/user-icon.png')
                  : {uri: userData?.image}
              }
            />
            <Pressable
              style={styles.profileEditIconCont}
              onPress={() => setModalVisible(true)}>
              <Image
                style={styles.profileEditIcon}
                source={require('../../images/edit-icon.png')}
              />
            </Pressable>
          </View>

          {/* User Information Section */}
          {isEditing ? (
            <View
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: 20,
              }}>
              <TextInputVarient
                value={name}
                onChangeText={setName}
                placeholder="Name"
              />
              <TextInputVarient
                value={address}
                onChangeText={setAddress}
                placeholder="Address"
              />
              <GenderSelect
                selectedGender={gender || userData?.gender}
                onGenderSelect={(val: string) => setGender(val)}
              />
              <View style={styles.buttonContainer}>
                <Pressable style={styles.saveButton} onPress={updateProfile}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={handleCancel}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.userInfoCard}>
              <Text style={styles.profileLabel}>Full Name:</Text>
              <Text style={styles.profileText}>{`${userData?.firstName || ''} ${
                userData?.lastName || ''
              }`}</Text>
              <Text style={styles.profileLabel}>Username:</Text>
              <Text style={styles.profileText}>{userData?.username}</Text>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileText}>{userData?.email}</Text>
              <Text style={styles.profileLabel}>Address:</Text>
              <Text style={styles.profileText}>{userData?.address}</Text>
              <Text style={styles.profileLabel}>Gender:</Text>
              <Text style={styles.profileText}>{userData?.gender}</Text>
              <Pressable
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>
            </View>
          )}

          {/* Image Picker Modal */}
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
    backgroundColor: '#f9f9f9',
  },
  profileMainCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileImgCont: {
    position: 'relative',
    borderRadius: 65,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  profileImg: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    borderRadius: 65,
    overflow: 'hidden',
  },
  profileEditIconCont: {
    position: 'absolute',
    height: 35,
    width: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(68,182,120)',
    bottom: 3,
    right: 2.5,
  },
  profileEditIcon: {
    height: 18,
    width: 18,
    tintColor: 'white',
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    marginTop: 20,
  },
  profileLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontWeight: '600',
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: 'rgb(68,182,120)',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: 'rgb(68,182,120)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
