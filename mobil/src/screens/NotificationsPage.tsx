import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";
import Market from "../Components/Market";
import Notifications from "../Components/Notifications";

const NotificationsPage = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <HStack
        width={Layout.window.width}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={5}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
        <Text bold>Bildirimler</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        {[1, 2, 3, 4, 5].map((i) => (
          <VStack key={i} marginBottom={i==5?10:0}>
            <Notifications/>
          </VStack>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#FFF7F0",
    flexDirection: "column",
    alignItems: "center",
  },
});
export default NotificationsPage;
