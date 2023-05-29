import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";

const ProductDetail = () => {
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
        onPress={()=>navigation.goBack()}
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
        <Text bold>Market Adı </Text>
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
        <VStack >
          <Text alignSelf={"center"} bold>
            LAYS FIRINDAN 500 GR
          </Text>
          <HStack
            width={Layout.window.width}
            marginTop={5}
            paddingX={5}
            alignItems={"flex-end"}
            space={3}
          >
            <Box
              padding={5}
              backgroundColor={"white"}
              shadow={3}
              borderRadius={5}
            >
              <ImageBackground
                style={{
                  width: Layout.window.width * 0.3,
                  height: Layout.window.height * 0.2,
                }}
                resizeMode="contain"
                source={require("../../assets/images/Lays.jpg")}
              >
                <Box
                  backgroundColor={"#FF7B00"}
                  width={70}
                  height={70}
                  borderRadius={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  alignSelf={"flex-end"}
                  marginRight={-8}
                  marginTop={-8}
                >
                  <Text
                    bold
                    color={"white"}
                    textAlign={"center"}
                    fontSize={"sm"}
                  >
                    indirimli ürün
                  </Text>
                </Box>
              </ImageBackground>
            </Box>
            <Box width={Layout.window.width * 0.3}>
              <Text bold fontSize={10}>
                İndirimsiz Fiyat :
              </Text>
              <Text alignSelf={"flex-end"} bold fontSize={12} color={"#FF7B00"}>
                25 TL
              </Text>
              <Text bold fontSize={12}>
                İndirimli Fiyat :
              </Text>
              <Text alignSelf={"flex-end"} bold fontSize={16} color={"#FF7B00"}>
                20 TL
              </Text>
            </Box>
          </HStack>
          <VStack marginLeft={6} space={3}>
            <HStack
              marginTop={1}
              width={Layout.window.width * 0.4}
              justifyContent={"space-between"}
            >
              <Text bold fontSize={10}>
                70 GR
              </Text>
              <Text bold fontSize={10}>
                6 ADET
              </Text>
            </HStack>
            <Text bold width={Layout.window.width * 0.7}>
              Lorem Ipsum has been the industry's standard dummy text ever
            </Text>
          </VStack>
          <VStack width={Layout.window.width} padding={5}>
          <Text bold fontSize={"md"}>Marketin Diğer Ürünleri</Text>  
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <HStack
              marginTop={5}
              space={5}
              key={i}
              width={Layout.window.width}
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
export default ProductDetail;
