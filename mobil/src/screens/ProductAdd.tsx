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

const ProductAdd = () => {
  const navigation: any = useNavigation();
  const [isDiscount, setIsDiscount] = useState(false);
  const [isNotification, setIsNotification] = useState(true);
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
        <Text bold>Ürün Ekle</Text>
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
                  opacity: 0,
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
                placeholder="  "
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
                  placeholder="  "
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

          <VStack
            width={Layout.window.width}
            space={3}
            padding={5}
            alignItems={"center"}
          >
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder="Ürün Adı"
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
              placeholder="Son Kullanma Bilgisi"
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
              placeholder="Adet/Kg"
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
              placeholder="Açıklama"
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
            <HStack
              width={Layout.window.width * 0.9}
              justifyContent={"space-between"}
              padding={2}
            >
              <Text bold width={Layout.window.width * 0.6}>
                Paylaşımı takipçilerime bildirim olarak gönder
              </Text>
              <TouchableOpacity
              onPress={()=>{setIsNotification(!isNotification);}}
                style={{
                  width: Layout.window.width * 0.15,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <Box
                  width={5}
                  height={5}
                  borderRadius={"full"}
                  background={isNotification==true?"#00C599":"#B3B4B3"}
                  alignSelf={isNotification==true?"flex-end":"flex-start"}
                ></Box>
              </TouchableOpacity>
            </HStack>
            <CheckButton
              text="Paylaş"
              color="#00C599"
              navigate="InfoPage"
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
export default ProductAdd;
