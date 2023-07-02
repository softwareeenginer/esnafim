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
import Market from "../Components/Market";
import { post } from "../networking/Server";

const NeighbourhoodPage = () => {
  const navigation: any = useNavigation();
  const [marketsInfo, setMarketsInfo]: any = React.useState(null);
  const [productsInfo, setProductsInfo]: any = React.useState(null);
  const [neighbourhoodInfo, setneighbourhoodInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getMarkets();
  }, []);
  const getMarkets = () => {
    post("/api/market/get/location").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setMarketsInfo(res.markets);
        setProductsInfo(res.products);
        setneighbourhoodInfo(res.mahalle);
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
        <Text fontSize={20} bold>{neighbourhoodInfo?.name} </Text>
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

      <FlatList
      showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {marketsInfo?.map((i: any, index: number) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MarketDetail", { id: i.marketId })
                }
                key={index}
                style={{ marginTop: 20, marginBottom: i == 12 ? 20 : 0 }}
              >
                <Market marketInfo={i} takip={i % 2 == 0 ? true : false} />
              </TouchableOpacity>
            ))}
            <Text marginLeft={6} marginTop={5} fontSize={"md"} bold>
              Yeni Eklenen Ürünler
            </Text>
          </>
        }
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{
          width: Layout.window.width * 0.9,
          alignSelf: "center",
          marginBottom:"2%"
        }}
        numColumns={2}
        data={productsInfo}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetail", {
                urunId: item.urunId,
                marketId: item.marketId,
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
              marketInfo={marketsInfo}
              indirim={true}
            />
          </TouchableOpacity>
        )}
      />
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
