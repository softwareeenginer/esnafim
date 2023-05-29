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

const NeighbourhoodPage = () => {
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
        <Text bold>Mahalle Adı </Text>
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
        {[1, 2].map((i) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MarketDetail")}
            key={i}
            style={{ marginTop: 20, marginBottom: i == 12 ? 20 : 0 }}
          >
            <Market takip={i % 2 == 0 ? true : false} />
          </TouchableOpacity>
        ))}
        <Text marginLeft={6} marginTop={5} fontSize={"md"} bold>Yeni Eklenen Ürünler</Text>
        {[1, 2, 3].map((i) => (
          <HStack
            marginTop={5}
            space={5}
            paddingX={5}
            key={i}
            width={Layout.window.width}
            marginBottom={i==3?10:0}
          >
            <Product
              navigation={navigation}
              navigate="ProductDetail"
              indirim={true}
            />
            <Product
              navigation={navigation}
              navigate="ProductDetail"
              indirim={false}
            />
          </HStack>
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
export default NeighbourhoodPage;
