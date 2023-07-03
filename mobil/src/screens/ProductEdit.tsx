import React, { useState } from "react";
import { ImageBackground, StyleSheet, Button, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Input, Icon, Spinner } from "native-base";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CheckButton from "../Components/CheckButton";
import { post } from "../networking/Server";

const ProductEdit = (props: any) => {
  const navigation: any = useNavigation();
  const [isDiscount, setIsDiscount] = useState(false);
  const [productInfo, setProductInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [urunId, setUrunId] = React.useState(props.route.params.urunId);
  const [marketId] = React.useState(props.route.params.marketId);
  const [price, setPrice]: any = React.useState(null);
  const [name, setName]: any = React.useState(null);
  const [description, setDescription]: any = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const handleSave = (
    price: string = "",
    name: string = "",
    description: string = ""
  ) => {
    setLoading(true);
    post("/api/profile/get/product-edit", {
      price,
      name,
      urunId,
      description,
    }).then((res: any) => {
      if (res.result) {
        setLoading(false);
        getProfile();
      } else {
        navigation.pop();
      }
    });
  };

  const getProfile = () => {
    post("/api/profile/get/product", {
      urunId,
      marketId,
    }).then((res: any) => {
      if (res.result) {
        setLoading(false);
        setProductInfo(res.urun);
      } else {
        navigation.pop();
      }
    });
  };

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Spinner size={22} color={"black"} />
      </View>
    );
  }

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
        <Text fontSize={20}>Ürün Düzenle </Text>
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
            {productInfo?.name} {productInfo?.description}
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
                source={{ uri: productInfo?.image }}
              ></ImageBackground>
            </Box>
            <Box width={Layout.window.width * 0.3}>
              <Text bold fontSize={14}>
                Ürün Fiyatı TL
              </Text>
              <Input
                maxLength={40}
                width={Layout.window.width * 0.4}
                height={8}
                placeholder={productInfo?.price}
                inputMode="decimal"
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
                onChangeText={(text) => {
                  setPrice(text);
                }}
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
              placeholder={productInfo?.name}
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
              onChangeText={(text) => {
                setName(text);
              }}
            />

            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder={productInfo?.description}
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
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder={productInfo?.updatedAt}
              inputMode="decimal"
              placeholderTextColor={"black"}
              backgroundColor={"white"}
              editable={false}
            />
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              height={8}
              placeholder={productInfo?.createdAt}
              inputMode="decimal"
              placeholderTextColor={"black"}
              backgroundColor={"white"}
              editable={false}
            />
            <CheckButton
              onPress={() => {
                handleSave(price, name, description);
              }}
              text="Kaydet"
              color="#00C599"
              navigate="ProductEdit"
              navigation={navigation}
            />
            <CheckButton
              onPress={() => console.log("deleted")}
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
