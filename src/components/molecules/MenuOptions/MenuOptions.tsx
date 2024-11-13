import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/reducers/authSlice/authSlice';
import {MAIN_FONT_COLOR} from '../../../utils/colors';

const menuItems = [
  {
    name: 'Home',
    icon: 'home-outline',
  },
  {
    name: 'Appointments',
    icon: 'calendar-check-outline',
  },
  {
    name: 'Profile',
    icon: 'account-circle-outline',
  },
];

const MenuOptions = ({
  isModalVisible,
  setModalVisible,
  navigation,
}: {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: any;
}) => {
  const {userData} = useSelector(authSelector);

  const handleNavigation = (e: any, item: {name: string; icon: string}) => {
    e.stopPropagation();
    setModalVisible(false);
    navigation.navigate(item.name);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="left"
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalCloseBtn}>
            <Icon name="close" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.menuUserInfo}>
            <Text style={styles.menuUserName}>
              {userData.firstName + ' ' + userData.lastName}
            </Text>
            <Text style={styles.menuUserEmail}>{userData.email}</Text>
          </View>
          <View style={styles.menuItemContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={e => handleNavigation(e, item)}>
                <Icon
                  name={item.icon}
                  size={25}
                  color="black"
                  style={styles.menuItemIcon}
                />
                <Text style={styles.menuItemTxt}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  modal: {
    margin: 0,
    flex: 1,
    width: '70%',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    padding: 22,
    paddingTop: 50,
    gap: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  menuUserInfo: {
    gap: 5,
    borderBottomWidth: 1.5,
    paddingBottom: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuUserName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: MAIN_FONT_COLOR,
  },
  menuUserEmail: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: MAIN_FONT_COLOR,
  },
  menuItemContainer: {
    flex: 1,
    gap: 10,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuItemIcon: {
    opacity: 0.65,
  },
  menuItemTxt: {
    fontSize: 16.5,
    opacity: 0.8,
    fontFamily: 'Nunito-SemiBold',
    color: MAIN_FONT_COLOR,
  },
});

export default MenuOptions;
