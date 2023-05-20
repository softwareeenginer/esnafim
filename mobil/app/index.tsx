import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/screens/Login";
import { NativeBaseProvider, Box } from "native-base";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Story" component={Login} />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
}
