import React from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ChoiceRegister = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Page}>
          <ImageBackground
            source={require("../../assets/images/backIcon.png")}
            style={styles.BackgroundImage}
          >
            <Image source={require("../../assets/images/title.png")} />
          </ImageBackground>
        </View>

        <View style={styles.FormArea}>
          <View style={{ marginTop: -Layout.window.height * 0.2 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Image
                style={{ width: Layout.window.width * 0.9 }}
                resizeMode="contain"
                source={require("../../assets/images/Satici.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: -Layout.window.height * 0.1 }}
            >
              <Image
                style={{ width: Layout.window.width * 0.9 }}
                resizeMode="contain"
                source={require("../../assets/images/Alici.png")}
              />
            </TouchableOpacity>
          </View>

          <VStack marginTop={10} space={10}>
            <HStack space={3} alignItems={"center"}>
              <View style={styles.Line}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate("HomeBottom")}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  borderRadius: 15,
                }}
              >
                <Text bold fontSize={"md"}>
                  Misafir olarak devam et
                </Text>
              </TouchableOpacity>
              <View style={styles.Line}></View>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
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
    // height: Layout.window.height * 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    paddingBottom:Layout.window.height*0.1
  },
  InputArea: {
    backgroundColor: "#ffffff",
    width: Layout.window.width * 0.8,
    marginTop: -Layout.window.height * 0.05,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  Line: {
    borderBottomColor: "#303030",
    borderBottomWidth: 1,
    width: Layout.window.width * 0.2,
  },
});
export default ChoiceRegister;
