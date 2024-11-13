import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RootNavParamList, TabBarIconProps} from '../types/navigation';
import Home from '../screens/Home/Home';
import MyAppointments from '../screens/MyAppointments/MyAppointments';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator<RootNavParamList>();

const getTabBarIconImage = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return require('../images/bottom-tab-icon/home-icon.png');
    case 'MovieHome':
      return require('../images/bottom-tab-icon/movie-icon.png');
    case 'Appointments':
      return require('../images/bottom-tab-icon/appointment-icon.png');
    case 'Profile':
      return require('../images/bottom-tab-icon/profile-icon.png');
    case 'PdfViever':
      return require('../images/bottom-tab-icon/profile-icon.png');
    default:
      return '';
  }
};

const TabBarIcon = ({color, route}: TabBarIconProps) => {
  return (
    <View style={styles.bottomTabContainer}>
      <Image
        source={getTabBarIconImage(route.name)}
        style={[styles.bottomTabImage, {tintColor: color}]}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[styles.bottomTabTitle, {color: color}]}>
        {route.name}
      </Text>
    </View>
  );
};

const MyTabsNavigator = () => {
  const screenOptions = ({route}: {route: TabBarIconProps['route']}) => ({
    headerShown: false,
    tabBarActiveBackgroundColor: '#fff',
    tabBarInactiveBackgroundColor: '#fff',
    tabBarActiveTintColor: '#02386e',
    tabBarInactiveTintColor: '#8B8A8B',
    tabBarLabel: () => {
      return null;
    },
    tabBarIcon: (props: {focused: boolean; color: string; size: number}) => (
      <TabBarIcon {...props} route={route} />
    ),
  });

  return (
    <Tab.Navigator screenOptions={screenOptions} backBehavior="history">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Appointments" component={MyAppointments} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="MovieHome" component={MovieHome} /> */}
      {/* <Tab.Screen name="PdfViever" component={PdfViewer} /> */}
    </Tab.Navigator>
  );
};

export default MyTabsNavigator;

const styles = StyleSheet.create({
  bottomTabContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomTabImage: {
    height: 28,
    width: 28,
    marginTop: 4,
  },
  bottomTabTitle: {
    height: 16,
    fontSize: 10.5,
    letterSpacing: 0.2,
    overflow: 'hidden',
  },
});
