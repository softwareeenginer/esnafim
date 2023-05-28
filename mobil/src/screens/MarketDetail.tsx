import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Text, VStack } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";

const HomePage = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground
        alt=" "
        style={{
          width: Layout.window.width,
          height: Layout.window.height * 0.3,
          justifyContent: "space-between",
        }}
        source={require("../../assets/images/bakkal.png")}
      >
        <HStack
          width={Layout.window.width}
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={5}
        >
          <TouchableOpacity
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
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingHorizontal: 16,
              paddingVertical: 5,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text bold fontSize={"lg"} color={"#FF7B00"}>
              Takip et
            </Text>
          </TouchableOpacity>
        </HStack>
        <HStack
          backgroundColor={"rgba(0,0,0,0.7)"}
          width={Layout.window.width}
          height={Layout.window.height * 0.07}
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingX={5}
        >
          <Text bold fontSize={"xl"} color={"white"}>
            Market Adı
          </Text>
          <Text bold fontSize={"xl"} color={"white"}>
            1000 km
          </Text>
        </HStack>
      </ImageBackground>

      <VStack width={Layout.window.width}>
        <Text bold fontSize={"xl"} alignSelf={"flex-start"}>
          {" "}
          KAPALI{" "}
        </Text>
        <Text bold fontSize={"2xl"} alignSelf={"center"} color={"#FF7B00"}>
          {" "}
          ÜRÜNLER{" "}
        </Text>

        <ScrollView
          style={{ marginTop: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <HStack marginTop={5} space={5} paddingX={5} key={i} width={Layout.window.width}>
              <Product indirim={true}/>
              <Product indirim={false}/>
            </HStack>
          ))}
        </ScrollView>
      </VStack>
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
export default HomePage;
