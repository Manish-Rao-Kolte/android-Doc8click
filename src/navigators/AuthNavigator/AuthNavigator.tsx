import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootNavParamList } from '../../types/navigation';
import Login from '../../screens/Login/Login';
import SignUp from '../../screens/SignUp/SignUp';

const Stack = createStackNavigator<RootNavParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
