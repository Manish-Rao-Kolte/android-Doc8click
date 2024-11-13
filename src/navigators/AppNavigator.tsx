import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash/Splash';
import {createStackNavigator} from '@react-navigation/stack';
import {RootNavParamList} from '../types/navigation';
import AuthNavigator from './AuthNavigator/AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {
  authSelector,
  resetLoading,
} from '../redux/reducers/authSlice/authSlice';
import MyTabsNavigator from './MyTabsNavigator';
import BookAppointment from '../screens/BookAppointment/BookAppointment';
import SpecialtyDoctors from '../screens/SpecialtyDoctors/SpecialtyDoctors';

const Stack = createStackNavigator<RootNavParamList>();

const AppNavigator = () => {
  const {userData, isLoading} = useSelector(authSelector);
  const [splash, setSplash] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (splash) {
      if (isLoading) {
        dispatch(resetLoading());
      }
    }
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {splash && <Stack.Screen name="Splash" component={Splash} />}
        {userData ? (
          <Stack.Group>
            <Stack.Screen name="MyTabsNavigator" component={MyTabsNavigator} />
            <Stack.Screen name="BookAppointment" component={BookAppointment} />
            <Stack.Screen
              name="SpecialtyDoctors"
              component={SpecialtyDoctors}
            />
          </Stack.Group>
        ) : (
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
