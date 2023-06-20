import React from "react";
import { StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Spinner, Text } from "native-base";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Market from "../Components/Market";
import { post } from "../networking/Server";

const HomePage = () => {
  const navigation: any = useNavigation();

  const [marketInfo, setMarketInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getMarkets();
  }, []);

  const getMarkets = () => {
    post("/api/market/get").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setMarketInfo(res.markets);
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
        marginTop={5}
        width={Layout.window.width * 0.9}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 2,
            borderRadius: 5,
            opacity: 0,
          }}
        >
          <Icon
            as={<Entypo name="menu" />}
            marginRight={2}
            size={8}
            ml="2"
            color="#FF7B00"
            opacity={0}
          />
        </TouchableOpacity>
        <Text bold fontSize={"2xl"}>
          ESNAFIM
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfilePage")}
          style={{
            backgroundColor: "white",
            paddingVertical: 5,
            paddingHorizontal: 2,
            borderRadius: 5,
          }}
        >
          <Icon
            as={<Ionicons name="md-person-sharp" />}
            marginRight={2}
            size={8}
            ml="2"
            color="#303030"
          />
        </TouchableOpacity>
      </HStack>
      <ScrollView
        style={{ marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {marketInfo?.map((i:any) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MarketDetail")}
            key={i}
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
export default HomePage;
