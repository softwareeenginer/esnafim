import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, HStack, Icon, Image, Input, Text, VStack } from "native-base";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";
import CheckButton from "../Components/CheckButton";

const MyMarket = () => {
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
        <Text bold>Marketim </Text>
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
        <VStack alignItems={"center"} space={5}>
          <VStack
            backgroundColor={"white"}
            width={Layout.window.width * 0.9}
            alignSelf={"center"}
            alignItems={"center"}
            space={3}
            paddingBottom={3}
          >
            <HStack>
              <TouchableOpacity>
                <Image
                  alt=" "
                  width={Layout.window.width * 0.5}
                  height={Layout.window.height * 0.2}
                  resizeMode="contain"
                  borderRadius={"xl"}
                  source={require("../../assets/images/bakkal.png")}
                />
                <Box
                  width={10}
                  height={10}
                  borderRadius={"full"}
                  backgroundColor={"white"}
                  marginTop={-8}
                  alignItems={"center"}
                  justifyContent={"center"}
                  alignSelf={"flex-end"}
                >
                  <Feather size={20} name="edit" />
                </Box>
              </TouchableOpacity>
              <VStack
                alignSelf={"center"}
                alignItems={"center"}
                width={Layout.window.width * 0.4}
              >
                <Text bold fontSize={20} color={"#FF7B00"}>
                  18 Ürün
                </Text>
                <Text bold fontSize={22} color={"#878BFF"}>
                  22 Takipçi
                </Text>
              </VStack>
            </HStack>
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              placeholder="Market Adı"
              placeholderTextColor={"black"}
              textAlign={"center"}
              backgroundColor={"white"}
              InputRightElement={
                <Icon
                  as={<Feather name="edit" />}
                  marginRight={2}
                  size={4}
                  ml="2"
                  color="#000000"
                />
              }
            />
            <CheckButton
              text="Güncelle"
              color="#FF7B00"
              navigation={navigation}
              navigate="MyMarket"
            />
          </VStack>
          <CheckButton
            text="Ürün Ekle"
            color="#00C599"
            navigation={navigation}
            navigate="ProductAdd"
          />
          <VStack width={Layout.window.width} space={5}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <HStack
                space={5}
                key={i}
                width={Layout.window.width}
                justifyContent={"center"}
                marginBottom={i == 12 ? 5 : 0}
              >
                <Product
                  navigation={navigation}
                  navigate="ProductEdit"
                  indirim={true}
                />
                <Box marginLeft={-Layout.window.width*0.1}>
                  <Feather size={16} name="edit" />
                </Box>

                <Product
                  navigation={navigation}
                  navigate="ProductEdit"
                  indirim={false}
                />
                <Box marginLeft={-Layout.window.width*0.1}>
                  <Feather size={16} name="edit" />
                </Box>
              </HStack>
            ))}
          </VStack>
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
});
export default MyMarket;
