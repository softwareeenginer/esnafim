import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/screens/Login";
import { NativeBaseProvider, Box, Icon } from "native-base";
import Register from "../src/screens/Register";
import ForgotPassword from "../src/screens/ForgotPassword";
import PasswordUpdate from "../src/screens/PasswordUpdate";
import ChoiceRegister from "../src/screens/ChoiceRegister";
import HomePage from "../src/screens/HomePage";
import MarketDetail from "../src/screens/MarketDetail";
import ProductDetail from "../src/screens/ProguctDetail";
import NeighbourhoodPage from "../src/screens/NeighbourhoodPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  color,
  position,
} from "native-base/lib/typescript/theme/styled-system";
import NotificationsPage from "../src/screens/NotificationsPage";
import ProfilePage from "../src/screens/ProfilePage";
import PersonalSettings from "../src/screens/PersonalSettings";
import FollowMarketPage from "../src/screens/FollowMarketPage";
import MyMarket from "../src/screens/MyMarket";
import ProductEdit from "../src/screens/ProductEdit";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="HomeBottom" component={MyTabs} />
        <Stack.Screen name="MarketDetail" component={MarketDetail} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="NeighBottom" component={MyTabs} />
        <Stack.Screen name="NotificationsBottom" component={MyTabs} />
        <Stack.Screen name="ProfileBottom" component={MyTabs} />
        <Stack.Screen name="FollowBottom" component={MyTabs} />
        <Stack.Screen name="PersonalSettings" component={PersonalSettings} />
        <Stack.Screen name="MyMarket" component={MyMarket} />
        <Stack.Screen name="ProductEdit" component={ProductEdit} />
      </Stack.Navigator>
    </NativeBaseProvider>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="HomePage">
      <Tab.Screen
        name="NeighbourhoodPage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="location" color={"#B3B4B3"} size={22} />
          ),
          tabBarActiveBackgroundColor: "#E4F4F1",
          headerShown: false,
          tabBarShowLabel: false,
        }}
        component={NeighbourhoodPage}
      />
      <Tab.Screen
        name="NotificationsPage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={"#B3B4B3"} size={22} />
          ),
          tabBarActiveBackgroundColor: "#E4F4F1",
          headerShown: false,
          tabBarShowLabel: false,
        }}
        component={NotificationsPage}
      />
      <Tab.Screen
        name="HomePage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation
              style={{ marginBottom: 10 }}
              name="home"
              color={"#00C599"}
              size={30}
            />
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="FollowMarketPage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="handshake-o" color={"#B3B4B3"} size={22} />
          ),
          tabBarActiveBackgroundColor: "#E4F4F1",
          headerShown: false,
          tabBarShowLabel: false,
        }}
        component={FollowMarketPage}
      />
      <Tab.Screen
        name="ProfilePage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person" color={"#B3B4B3"} size={22} />
          ),
          tabBarActiveBackgroundColor: "#E4F4F1",
          headerShown: false,
          tabBarShowLabel: false,
        }}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
}
