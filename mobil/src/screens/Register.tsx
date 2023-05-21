import React from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";

import {
  Select,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  CheckIcon,
  Box,
} from "native-base";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CheckButton from "../Components/CheckButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const Register = () => {
  const navigation = useNavigation();
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.Page}>
        <ImageBackground
          source={require("../../assets/images/backIcon.png")}
          style={styles.BackgroundImage}
        >
          <Image source={require("../../assets/images/title.png")} />
        </ImageBackground>
      </View>
      <View style={styles.FormArea}>
        <View style={styles.InputArea}>
          <Text
            style={{ alignSelf: "center" }}
            fontSize="3xl"
            bold
            marginBottom={5}
          >
            Kayıt Ol
          </Text>
          <ScrollView>
            <SelectDropdown
              data={countries}
              defaultButtonText="İl Seç"
              buttonStyle={{
                backgroundColor: "white",
                borderBottomColor: "#878BFF",
                borderBottomWidth: 1,
                width: Layout.window.width * 0.7,
            
              }}
              
              dropdownOverlayColor="rgba(0,0,0,0.7)"
              buttonTextStyle={{fontSize:12,position:"absolute", right:5}}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <SelectDropdown
              data={countries}
              defaultButtonText="İlçe Seç"
              dropdownOverlayColor="rgba(0,0,0,0.7)"
              buttonTextStyle={{fontSize:12,position:"absolute", right:5}}
              buttonStyle={{
                backgroundColor: "white",
                borderBottomColor: "#878BFF",
                borderBottomWidth: 1,
                width: Layout.window.width * 0.7,
              }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <SelectDropdown
              data={countries}
              defaultButtonText="Mahalle Seç"
              dropdownOverlayColor="rgba(0,0,0,0.7)"
              buttonTextStyle={{fontSize:12, position:"absolute",right:5}}
              buttonStyle={{
                backgroundColor: "white",
                borderBottomColor: "#878BFF",
                borderBottomWidth: 1,
                width: Layout.window.width * 0.7,
                
              }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />

            <Input
              variant="underlined"
              numberOfLines={4}
              maxLength={40}
              placeholder="İşletme İsmi"
              InputLeftElement={
                <Icon
                  as={<SimpleLineIcons name="bag" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
            />
            <Input
              variant="underlined"
              numberOfLines={4}
              maxLength={40}
              placeholder="E-Posta"
              InputLeftElement={
                <Icon
                  as={<Feather name="mail" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
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
            <Input
              variant="underlined"
              numberOfLines={4}
              keyboardType="numeric"
              maxLength={40}
              placeholder="Şifre Tekrar"
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
          </ScrollView>
        </View>

        <VStack marginTop={10} space={10}>
          <HStack space={3} alignItems={"center"}>
            <View style={styles.Line}></View>
            <Text bold fontSize={"md"} color={"#878BFF"}>
              ya da
            </Text>
            <View style={styles.Line}></View>
          </HStack>
          <CheckButton
            navigation={navigation}
            navigate="Login"
            text="Giriş Yap"
          />
        </VStack>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#FF7B00",
    flexDirection: "column",
  },
  Page: {
    width: Layout.window.width,
    height: Layout.window.height * 0.4,
    justifyContent: "center",
  },
  BackgroundImage: {
    width: Layout.window.width,
    height: Layout.window.height * 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  FormArea: {
    backgroundColor: "#FFF7F0",
    width: Layout.window.width,
    height: Layout.window.height * 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  InputArea: {
    backgroundColor: "#ffffff",
    width: Layout.window.width * 0.8,
    height: Layout.window.height * 0.5,
    marginTop: -Layout.window.height * 0.1,
    borderRadius: 30,
    padding: 20,
  },
  Line: {
    borderBottomColor: "#878BFF",
    borderBottomWidth: 1,
    width: Layout.window.width * 0.3,
  },
});
export default Register;