import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {HeaderProps} from '../types/navigation';
import {useDispatch} from 'react-redux';
import {removeUser} from '../redux/reducers/authSlice/authSlice';
import {MAIN_FONT_COLOR, MAIN_TINT_COLOR} from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuOptions from './molecules/MenuOptions/MenuOptions';

const Header = ({
  isHome,
  title,
  navigation,
  cleanup,
  ...props
}: HeaderProps) => {
  const dispatch = useDispatch();
  const [notiCount, setNotiCount] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const handleBackPress = () => {
    navigation.goBack();
    if (cleanup) cleanup();
  };

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <View style={styles.headerContainer}>
      <MenuOptions
        navigation={navigation}
        isModalVisible={isMenuVisible}
        setModalVisible={setMenuVisible}
        handleLogout={handleLogout}
      />
      <View style={styles.backTitleCont}>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon
              name="menu"
              size={28}
              color={MAIN_FONT_COLOR}
              onPress={() => setMenuVisible(true)}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleBackPress()}>
            <Icon name="keyboard-backspace" size={28} color={MAIN_FONT_COLOR} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTxt}>{title}</Text>
      </View>
      {isHome ? (
        <View style={styles.othersCont}>
          <TouchableOpacity style={styles.notiContainer}>
            <Icon
              name="bell-outline"
              size={26}
              color={'#333'}
              style={{opacity: 0.75}}
            />
            <Text style={styles.notiCount}>{notiCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="heart-multiple-outline"
              size={26}
              color={'#333'}
              style={{opacity: 0.75}}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="logout" size={25} color={MAIN_FONT_COLOR} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  backTitleCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    gap: 8,
  },
  headerTxt: {
    color: MAIN_FONT_COLOR,
    fontSize: 17.5,
    textAlignVertical: 'center',
    fontFamily: 'Nunito-Bold',
  },
  headerBtn: {
    borderColor: MAIN_TINT_COLOR,
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 1.8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  othersCont: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  notiContainer: {
    position: 'relative',
  },
  notiCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    fontSize: 11,
    backgroundColor: 'rgba(255,69,69,0.88)',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
