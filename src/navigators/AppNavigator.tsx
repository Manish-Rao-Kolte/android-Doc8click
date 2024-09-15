import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash/Splash';
import { createStackNavigator } from '@react-navigation/stack';
import { RootNavParamList } from '../types/navigation';
import AuthNavigator from './AuthNavigator/AuthNavigator';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authSlice/authSlice';
import MyTabsNavigator from './MyTabsNavigator';

const Stack = createStackNavigator<RootNavParamList>();

const AppNavigator = () => {
  const { userData } = useSelector(authSelector);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {splash && <Stack.Screen name="Splash" component={Splash} />}
        {userData ? <Stack.Screen
          name="MyTabsNavigator"
          component={MyTabsNavigator}
        /> : <Stack.Screen name="AuthNavigator" component={AuthNavigator} />}
      </Stack.Navigator>
    </NavigationContainer >
  );
};

export default AppNavigator;
