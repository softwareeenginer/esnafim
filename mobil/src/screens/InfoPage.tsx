import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Info from "../Components/Info";


const InfoPage = () => {
  const navigation: any = useNavigation();
  const image = require("../../assets/images/Approval.png");
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <Info text="ÜRÜN EKLENDİ" color="#00C599" image={image} /> 
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#FFF7F0",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center"
  },
});
export default InfoPage;
