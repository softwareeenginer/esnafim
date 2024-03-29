import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Spinner, Text, VStack } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Product from "../Components/Product";
import { post } from "../networking/Server";

const MarketDetail = (props: any) => {
  const navigation: any = useNavigation();
  const [marketInfo, setMarketInfo]: any = React.useState(null);
  const [productsInfo, setProductsInfo]: any = React.useState(null);
  const [status, setStatus]: any = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [marketId] = React.useState(props.route.params.id);
  useFocusEffect(
    React.useCallback(() => {
      getMarkets();
    }, [])
  );

  const postFollows = (marketId: number) => {
    post("/api/follow/set/update", {
      marketId,
    }).then((res: any) => {
      if (res.result) {
        setLoading(false);
        getMarkets();
      } else {
      }
    });
  };
  const getMarkets = () => {
    post("/api/market/get-one", { marketId }).then((res: any) => {
      if (res.result) {
        setLoading(false);
        setMarketInfo(res.market);
        setProductsInfo(res.products);
        setStatus(res.follow);
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
  // console.log(marketInfo, productsInfo);
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ImageBackground
        alt=" "
        style={{
          width: Layout.window.width,
          height: Layout.window.height * 0.3,
          justifyContent: "space-between",
        }}
        source={{ uri: marketInfo?.image }}
      >
        <HStack
          width={Layout.window.width}
          justifyContent={"space-between"}
          alignItems={"center"}
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
          <TouchableOpacity
            onPress={() => {
              [postFollows(marketInfo?.marketId)];
            }}
            style={{
              backgroundColor: "white",
              paddingHorizontal: 16,
              paddingVertical: 5,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {status?.status == true ? (
              <Text bold fontSize={"lg"} color={"#FF7B00"}>
                Takibi bırak
              </Text>
            ) : (
              <Text bold fontSize={"lg"} color={"#FF7B00"}>
                Takip et
              </Text>
            )}
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
            {marketInfo?.name}
          </Text>
          <Text bold fontSize={"xl"} color={"white"}>
            {productsInfo?.length}
          </Text>
        </HStack>
      </ImageBackground>

      <VStack width={Layout.window.width}>
        <Text
          bold
          fontSize={"2xl"}
          alignSelf={"center"}
          marginTop={10}
          color={"#FF7B00"}
        >
          {" "}
          ÜRÜNLER{" "}
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
                navigation.navigate("ProductDetail", {
                  urunId: item.urunId,
                  marketId: marketId,
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
            </TouchableOpacity>
          )}
        />
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
export default MarketDetail;
