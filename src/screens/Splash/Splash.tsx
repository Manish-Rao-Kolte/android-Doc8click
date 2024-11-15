import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RootScreenProps} from '../../types/navigation';
import SafeScreen from '../../components/layout/SafeScreen/SafeScreen';

const Splash = ({navigation}: RootScreenProps<'Splash'>) => {
  return (
    <SafeScreen>
      <View style={styles.splashContainer}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Image
          style={styles.splashImg}
          source={require('../../images/splash-logo.png')}
        />
        <View style={styles.splashTxtCont}>
          <Text style={styles.splashTxt}>Welcome to Doc@Click 👋</Text>
          <Text style={styles.splashSubTxt}>
            Your personalized healthcare companion. Designed to make managing
            your health effortless, our app allows you to schedule doctor
            appointments with just a few taps.
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    gap: 35,
  },
  splashImg: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  },
  splashTxtCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  splashTxt: {
    fontSize: 38,
    fontFamily: 'Nunito-Black',
    letterSpacing: 5,
    color: '#02386e',
    opacity: 0.85,
  },
  splashSubTxt: {
    fontSize: 17,
    letterSpacing: 0.3,
    color: '#8e8e8e',
    fontFamily: 'Nunito-SemiBold',
    textAlign: 'center',
  },
});
