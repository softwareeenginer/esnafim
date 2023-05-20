import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../src/screens/Login';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='Story'
                component={Login}
            />

        </Stack.Navigator>
    );
}