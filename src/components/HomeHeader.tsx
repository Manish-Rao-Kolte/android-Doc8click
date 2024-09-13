import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HomeHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarNameCont}>
        <Image
          style={styles.avatarImg}
          source={require('../images/user-icon.png')}
        />
        <View style={styles.avatarTxtCont}>
          <Text style={styles.avatarTxtGreet}>Good Morning 👋</Text>
          <Text style={styles.avatarTxtName}>John Doe</Text>
        </View>
      </View>
      <View style={styles.othersCont}>
        <Image
          style={styles.othersIcon}
          source={require('../images/notification-bell-icon.png')}
        />
        <Image
          style={styles.othersIcon}
          source={require('../images/heart-icon.png')}
        />
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
    gap: 10,
    padding: 15,
    width: '100%',
  },
  avatarNameCont: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarImg: {
    height: 60,
    width: 60,
    borderRadius: 35,
  },
  avatarTxtCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  avatarTxtGreet: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
  },
  avatarTxtName: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  othersCont: {
    display: 'flex',
    flexDirection: 'row',
    height: '50%',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  othersIcon: {
    height: 30,
    width: 30,
    tintColor: '#333',
  },
});
