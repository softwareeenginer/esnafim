import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Product from "../Components/Product";
import CheckButton from "../Components/CheckButton";
import { post } from "../networking/Server";

const MyMarket = () => {
  const navigation: any = useNavigation();
  const [userInfo, setUserInfo]: any = React.useState(null);
  const [marketInfo, setMarketInfo]: any = React.useState(null);
  const [productsInfo, setProductsInfo]: any = React.useState(null);
  const [follows, setFollows]: any = React.useState(null);
  const [products, setProducts]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const getProfile = () => {
    post("/api/profile/get").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setUserInfo(res.info);
        setMarketInfo(res.myMarket);
        setFollows(res.followsCount);
        setProducts(res.productsCount);
        setProductsInfo(res.products);
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
        <Text fontSize={20} bold>
          Marketim{" "}
        </Text>
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
                  source={{ uri: marketInfo?.image }}
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
                  Ürünlerim
                </Text>
                <Text bold fontSize={20} color={"#FF7B00"}>
                  {products}
                </Text>
                <Text bold fontSize={20} color={"#878BFF"}>
                  Takipçilerim
                </Text>
                <Text bold fontSize={22} color={"#878BFF"}>
                  {follows}
                </Text>
              </VStack>
            </HStack>
            <Input
              maxLength={40}
              width={Layout.window.width * 0.9}
              placeholder={marketInfo?.name}
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
              onPress={() => navigation.navigate("MyMarket")}
              text="Güncelle"
              color="#FF7B00"
              navigation={navigation}
              navigate="MyMarket"
            />
          </VStack>
          <CheckButton
            onPress={() => navigation.navigate("ProductAdd")}
            text="Ürün Ekle"
            color="#00C599"
            navigation={navigation}
            navigate="ProductAdd"
          />
          <FlatList
            columnWrapperStyle={{ justifyContent: "space-between" }}
            style={{
              width: Layout.window.width * 0.9,
              alignSelf: "center",
              marginTop: "5%",
            }}
            numColumns={2}
            data={productsInfo}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductEdit", {
                    urunId: item.urunId,
                    marketId: marketInfo?.marketId,
                  });
                }}
                style={{
                  backgroundColor: "white",
                  paddingBottom: 10,
                  borderRadius: 16,
                  marginTop: "10%",
                }}
              >
                <Product
                  productInfo={item}
                  marketInfo={marketInfo}
                  indirim={true}
                />
                <Box position={"absolute"} zIndex={5} right={0}>
                  <Feather size={16} name="edit" />
                </Box>
              </TouchableOpacity>
            )}
          />
          {/* <VStack width={Layout.window.width} space={5}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <HStack
                space={5}
                key={i}
                width={Layout.window.width}
                justifyContent={"center"}
                marginBottom={i == 12 ? 5 : 0}
              >
                <Product marketInfo={true} productInfo={true} indirim={true} />
                <Box marginLeft={-Layout.window.width * 0.1}>
                  <Feather size={16} name="edit" />
                </Box>

                <Product marketInfo={true} productInfo={true} indirim={false} />
                <Box marginLeft={-Layout.window.width * 0.1}>
                  <Feather size={16} name="edit" />
                </Box>
              </HStack>
            ))}
          </VStack> */}
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
