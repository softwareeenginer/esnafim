import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/screens/Login";
import { NativeBaseProvider, Box } from "native-base";
import Register from "../src/screens/Register";
import ForgotPassword from "../src/screens/ForgotPassword";
import PasswordUpdate from "../src/screens/PasswordUpdate";
import ChoiceRegister from "../src/screens/ChoiceRegister";
import HomePage from "../src/screens/HomePage";
import MarketDetail from "../src/screens/MarketDetail";

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PasswordUpdate" component={PasswordUpdate} />
        <Stack.Screen name="ChoiceRegister" component={ChoiceRegister} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="MarketDetail" component={MarketDetail} />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
}
