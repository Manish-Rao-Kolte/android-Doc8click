import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/reducers/authSlice/authSlice';

const HomeHeader = () => {
  const {userData} = useSelector(authSelector);
  const [greeting, setGreeting] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Morning');
    } else if (hour < 18) {
      setGreeting('Afternoon');
    } else {
      setGreeting('Evening');
    }
  };

  useEffect(() => {
    getGreeting();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarNameCont}>
        <Image
          style={styles.avatarImg}
          source={
            userData?.image
              ? {uri: userData?.image}
              : require('../../images/user-icon.png')
          }
        />
        <View style={styles.avatarTxtCont}>
          <Text style={styles.avatarTxtGreet}>Good {greeting} 👋</Text>
          <Text style={styles.avatarTxtName}>{userData?.firstName || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
  },
  avatarNameCont: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImg: {
    height: 62,
    width: 62,
    borderRadius: 36,
  },
  avatarTxtCont: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatarTxtGreet: {
    color: '#333',
    fontSize: 18,
    fontFamily: 'Nunito-Medium',
    fontWeight: '400',
  },
  avatarTxtName: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0.4,
  },
});
