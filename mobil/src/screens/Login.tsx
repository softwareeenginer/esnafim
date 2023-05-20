import React from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HStack, Icon, Input, Text, VStack } from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import CheckButton from "../Components/CheckButton";

const Login = () => {
  return (
    <SafeAreaView
      style={styles.SafeAreaView}
    >
      <View
        style={styles.Page}
      >
        <ImageBackground
          source={require("../../assets/images/backIcon.png")}
          style={styles.BackgroundImage}
        >
          <Image source={require("../../assets/images/title.png")} />
        </ImageBackground>
      </View>
      <View
        style={styles.FormArea}
      >
        <View
          style={styles.InputArea}
        >
          <Text
            style={{ alignSelf: "center" }}
            fontSize="3xl"
            bold
            marginBottom={5}
          >
            Giriş Yap
          </Text>
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
        </View>

        <VStack marginTop={10} space={10}>
          <HStack  space={3} alignItems={"center"}>
            <View
              style={styles.Line}
            ></View>
            <Text bold fontSize={"md"} color={"#878BFF"}>
              ya da
            </Text>
            <View
              style={styles.Line}
            ></View>
          </HStack>
          <CheckButton text="Kayıt ol"/>
        </VStack>
      </View>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
    SafeAreaView:{ flex: 1, backgroundColor: "#FF7B00", flexDirection: "column" },
    Page:{
        width: Layout.window.width,
        height: Layout.window.height * 0.4,
        justifyContent: "center",
      },
    BackgroundImage:{
        width: Layout.window.width,
        height: Layout.window.height * 0.45,
        justifyContent: "center",
        alignItems: "center",
      },  
    FormArea:{
        backgroundColor: "#FFF7F0",
        width: Layout.window.width,
        height: Layout.window.height * 0.7,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
      },
    InputArea:{
        backgroundColor: "#ffffff",
        width: Layout.window.width * 0.8,
        height: Layout.window.height * 0.4,
        marginTop: -Layout.window.height * 0.05,
        borderRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 20,
      },  
    Line:{
        borderBottomColor: "#878BFF",
        borderBottomWidth: 1,
        width: Layout.window.width * 0.3,
      }  
    
  });
export default Login;
