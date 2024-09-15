import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { HeaderProps } from '../types/navigation';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/reducers/authSlice/authSlice';

const Header = ({ isHome, title, navigation }: HeaderProps) => {
  const dispatch = useDispatch();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <View style={styles.headerContainer}>
      {!isHome && (
        <TouchableOpacity onPress={() => handleBackPress()}>
          <Image
            style={styles.headerImg}
            source={require('../images/header-back.png')}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTxt}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={[styles.headerTxt, { borderColor: "#fff", borderRadius: 10, fontSize: 16, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 2, elevation: 5 }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
    padding: 15,
    width: '100%',
    height: 60,
    backgroundColor: '#02386e',
  },
  headerImg: {
    height: 23,
    width: 23,
    lineHeight: 24,
    tintColor: '#fff',
  },
  headerTxt: {
    color: '#fff',
    fontSize: 19,
    lineHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: 1,
  },
});
