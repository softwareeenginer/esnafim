import React from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Spinner } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  const [marketsInfo, setMarketsInfo]: any = React.useState([]);
  const [productsInfo, setProductsInfo]: any = React.useState(null);
  const [neighbourhoodInfo, setneighbourhoodInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);
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
      {marketsInfo.length < 1 ? (
        <View
          style={{
            width: Layout.window.width,
            height: Layout.window.height,
            alignItems: "center",
            justifyContent:"space-around",
          }}
        >
           <Text
            bold
            fontSize={20}
            style={{
              margin: 30,
              color: "red",
              textAlign: "center",
              width: Layout.window.width * 0.7,
            }}
          >
            {"Üzgünüz, Bir sorun oluştu !:("}
          </Text>
          <Image alt=" " source={require("../../assets/images/ret.png")} />
          <Text
            bold
            fontSize={20}
            style={{
              color: "black",
              textAlign: "center",
              width: Layout.window.width * 0.7,
            }}
          >
            {"Mahallenizde sisteme kayıtlı bir market bulunamadı"}
          </Text>
        </View>
      ) : (
        <>
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
              {neighbourhoodInfo?.name}{" "}
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

          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                {marketsInfo?.map((i: any, index: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("MarketDetail", {
                          id: i.marketler.marketId,
                        })
                      }
                      key={index}
                      style={{ marginTop: 20, marginBottom: i == 12 ? 20 : 0 }}
                    >
                      <Market
                        marketInfo={i.marketler}
                        status={i.follow ? i.follow.status : 0}
                        onPress={() => {
                          postFollows(i.marketler.marketId);
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
                <Text marginLeft={6} marginTop={5} fontSize={"md"} bold>
                  Yeni Eklenen Ürünler
                </Text>
              </>
            }
            columnWrapperStyle={{ justifyContent: "space-between" }}
            style={{
              width: Layout.window.width * 0.9,
              alignSelf: "center",
              marginBottom: "2%",
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
        </>
      )}
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
