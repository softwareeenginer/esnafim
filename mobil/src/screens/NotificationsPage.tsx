import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Box, Text, VStack, Spinner } from "native-base";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Product from "../Components/Product";
import Market from "../Components/Market";
import Notifications from "../Components/Notifications";
import { post } from "../networking/Server";

const NotificationsPage = () => {
  const navigation: any = useNavigation();

  const [notificationsInfo, setNotificationsInfo]: any = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [])
  );

  const getNotifications = () => {
    post("/api/notification/get").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setNotificationsInfo(res.notifications);
      } else {
        //navigation.pop();
      }
    });
  };

  // Okundu bilgisini göndereceğimiz API

  const handleRead = (notificationId: any) => {
    setLoading(true);
    post("/api/notification/get-one", { notificationId }).then(
      (res: any) => {
        getNotifications();
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
        <Text bold>Bildirimler</Text>
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
        {notificationsInfo?.map((i: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleRead(i.bildirimId);
              }}
              key={index}
              style={{ marginBottom: i == 12 ? 20 : 0 }}
            >
              <Notifications notificationInfo={i} />
            </TouchableOpacity>
          );
        })}
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
export default NotificationsPage;
