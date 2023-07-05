import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Spinner } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Product from "../Components/Product";
import { post } from "../networking/Server";

const ProductDetail = (props: any) => {
  const navigation: any = useNavigation();
  const [marketInfo, setMarketInfo]: any = React.useState(null);
  const [productInfo, setProductInfo]: any = React.useState(null);
  const [productsInfo, setProductsInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [urunId, setUrunId] = React.useState(props.route.params.urunId);
  const [marketId] = React.useState(props.route.params.marketId);

  React.useEffect(() => {
    getMarkets();
  }, [urunId]);

  const getMarkets = () => {
    setLoading(true);
    // console.log("1")
    post("/api/market/get-one/detail", { urunId, marketId }).then(
      (res: any) => {
        if (res.result) {
          setLoading(false);
          setMarketInfo(res.market);
          setProductInfo(res.urun);
          setProductsInfo(res.products);
        } else {
          navigation.pop();
        }
      }
    );
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
          {marketInfo?.name}
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
      <VStack>
        <Text alignSelf={"center"} bold>
          {productInfo?.name}
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
            >
              {productInfo?.priceDiscount == null ? (
                <></>
              ) : (
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
              )}
            </ImageBackground>
          </Box>
          <Box width={Layout.window.width * 0.3}>
            <Text bold fontSize={10}>
              İndirimsiz Fiyat :
            </Text>
            {productInfo?.priceDiscount == null ? (
              <Text alignSelf={"flex-end"} bold fontSize={12} color={"#FF7B00"}>
                ---
              </Text>
            ) : (
              <Text alignSelf={"flex-end"} bold fontSize={12} color={"#FF7B00"}>
                25 TL
              </Text>
            )}
            <Text bold fontSize={12}>
              İndirimli Fiyat :
            </Text>
            <Text alignSelf={"flex-end"} bold fontSize={16} color={"#FF7B00"}>
              {productInfo?.price} TL
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
              {productInfo?.description}
            </Text>
            <Text bold fontSize={10}>
              {productInfo?.description}
            </Text>
          </HStack>
          <Text bold width={Layout.window.width * 0.7}>
            {productInfo?.name} ,{productInfo?.description}
          </Text>
        </VStack>
        <VStack width={Layout.window.width} padding={5}>
          <Text bold fontSize={"md"}>
            Marketin Diğer Ürünleri
          </Text>
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
                  setUrunId(item.urunId);
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
              </TouchableOpacity>
            )}
          />
        </VStack>
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
export default ProductDetail;
