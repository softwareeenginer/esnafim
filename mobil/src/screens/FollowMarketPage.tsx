import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Spinner } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";
import Market from "../Components/Market";
import { post } from "../networking/Server";

const FollowMarketPage = () => {
  const navigation: any = useNavigation();
  const [marketsInfo, setMarketsInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getFollows();
  }, []);

  const getFollows = () => {
    post("/api/follow/get").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setMarketsInfo(res.markets);
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
        <Text bold fontSize={20}>
          Takip Ettiğim Marketler{" "}
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
export default FollowMarketPage;
