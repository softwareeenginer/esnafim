import React, { useState } from "react";
import { ImageBackground, StyleSheet, Button } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Input, Icon } from "native-base";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import CheckButton from "../Components/CheckButton";

const ProductEdit = () => {
  const navigation: any = useNavigation();
  const [isDiscount, setIsDiscount] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
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
        <Text bold>Ürün Düzenle </Text>
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
        <VStack>
          <Text marginLeft={5} bold>
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
              ></ImageBackground>
            </Box>
            <Box width={Layout.window.width * 0.3}>
              <Text bold fontSize={14}>
                Ürün Fiyatı
              </Text>
              <Input
                maxLength={40}
                width={Layout.window.width * 0.4}
                height={8}
                placeholder="25 TL"
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
              <TouchableOpacity
                onPressIn={() => {
                  setIsDiscount(true);
                }}
                style={{
                  backgroundColor: "#FF7B00",
                  paddingVertical: 5,
                  width: Layout.window.width * 0.4,
                  marginTop: 10,
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Text bold color={"white"} fontSize={14}>
                  İndirimli Fiyat
                </Text>
              </TouchableOpacity>

              {isDiscount == true ? (
                <Input
                  maxLength={40}
                  width={Layout.window.width * 0.4}
                  height={8}
                  placeholder="20 TL"
                  placeholderTextColor={"black"}
                  textAlign={"center"}
                  backgroundColor={"white"}
                />
              ) : (
                <></>
              )}
            </Box>
          </HStack>
          <TouchableOpacity
            style={{
              width: Layout.window.width * 0.1,
              height: Layout.window.width * 0.1,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
              marginTop: -Layout.window.width * 0.08,
              marginLeft: Layout.window.width * 0.37,
            }}
          >
            <Ionicons size={24} name="settings-outline" />
          </TouchableOpacity>

          <VStack width={Layout.window.width} space={3} padding={5} alignItems={"center"}>
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder="LAYS FIRINDAN 500 GR"
              placeholderTextColor={"black"}
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
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder="22/02/2024"
              inputMode="decimal"
              placeholderTextColor={"black"}
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
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder="1 Adet, 500 Gr"
              inputMode="decimal"
              placeholderTextColor={"black"}
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
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder="Açıklamalar"
              inputMode="decimal"
              placeholderTextColor={"black"}
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
              text="Kaydet"
              color="#00C599"
              navigate="ProductEdit"
              navigation={navigation}
            />
            <CheckButton
              text="Ürünü Sil"
              color="#B3B4B3"
              navigate="MyMarket"
              navigation={navigation}
            />
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
export default ProductEdit;
