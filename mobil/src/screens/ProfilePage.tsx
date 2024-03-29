import React from "react";
import { StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Image, Spinner, Text, VStack } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CheckButton from "../Components/CheckButton";
import { MainStore } from "../../stores/MainStore";
import { goPage } from "../../constants/goPage";
import { post } from "../networking/Server";

const ProfilePage = () => {
  const navigation: any = useNavigation();

  const [userInfo, setUserInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    post("/api/profile/get").then((res: any) => {
      console.log(res)
      if (res.result) {
        setLoading(false);
        setUserInfo(res.info);
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
          style={styles.HeaderButton}
        >
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
        <Text bold>Profilim</Text>
        <TouchableOpacity style={styles.HeaderGhostButton}>
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={3} alignItems={"center"} marginBottom={10}>
          <Image
            width={Layout.window.width * 0.7}
            height={Layout.window.height * 0.3}
            borderRadius={"2xl"}
            resizeMode="contain"
            alt=" "
            source={{ uri: userInfo?.image }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalSettings")}
            style={styles.SettingsButton}
          >
            <Text bold fontSize={"md"}>
              Kişisel Ayarlar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MyMarket")}
            style={styles.SettingsButton}
          >
            <Text bold fontSize={"md"}>
              Market Ayarlarım
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationsPage")}
            style={styles.SettingsButton}
          >
            <Text bold fontSize={"md"}>
              Bildirimler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("FollowMarketPage")}
            style={styles.SettingsButton}
          >
            <Text bold fontSize={"md"}>
              Takip Ettiğim Marketler
            </Text>
          </TouchableOpacity>
          <CheckButton
            onPress={() => {
              MainStore.setToken("");
              goPage(navigation, "Loading", {}, false);
            }}
            text="Çıkış Yap"
            color="#878BFF"
            navigation={navigation}
            navigate="Login"
          />
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
  HeaderButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderGhostButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
  SettingsButton: {
    width: Layout.window.width * 0.8,
    paddingVertical: Layout.window.height * 0.02,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default ProfilePage;
