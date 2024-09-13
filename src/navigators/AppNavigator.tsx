import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash/Splash';
import { createStackNavigator } from '@react-navigation/stack';
import { RootNavParamList } from '../types/navigation';
import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createStackNavigator<RootNavParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
