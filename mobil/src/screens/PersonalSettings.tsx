import React from "react";
import {  StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Image, Input, Text, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CheckButton from "../Components/CheckButton";

const PersonalSettings = () => {
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
          style={styles.HeaderButton}
        >
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
        <Text bold>Ayarlar</Text>
        <TouchableOpacity style={styles.HeaderGhostButton}>
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={3} alignItems={"center"} marginBottom={10}>
          <Image
            width={Layout.window.width * 0.7}
            height={Layout.window.height * 0.3}
            borderRadius={"2xl"}
            resizeMode="contain"
            alt=" "
            source={require("../../assets/images/Profile.jpg")}
          />
          <Input
            variant="underlined"
            numberOfLines={4}
            keyboardType="numeric"
            maxLength={40}
            placeholder="Şifre"
            InputLeftElement={
              <Icon
                as={<AntDesign name="unlock" />}
                marginRight={2}
                size={5}
                ml="2"
                color="#000000"
              />
            }
          />
          
          <CheckButton
            text="Kaydet"
            color="#878BFF"
            navigation={navigation}
            navigate="Login"
          />
        </VStack>
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
  HeaderButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderGhostButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity:0
  },
  
});
export default PersonalSettings;
