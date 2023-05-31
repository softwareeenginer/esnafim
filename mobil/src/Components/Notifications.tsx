import React from "react";
import { HStack, Image, Text, VStack } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {}

export default function Notifications(props: IProps) {
  return (
    <HStack
      marginTop={3}
      bg={"white"}
      width={Layout.window.width * 0.9}
      alignSelf={"center"}
      padding={3}
      borderRadius={15}
      space={5}
    >
        <Image
          alt=" "
          width={Layout.window.width * 0.16}
          height={Layout.window.width * 0.16}
          borderRadius={"full"}
          source={require("../../assets/images/bakkal.png")}
        />
        <VStack>
          <Text bold fontSize={14}>Market Adı</Text>
          <Text fontSize={12}>Seçkin market yeni ürün ekledi.</Text>
          <Text fontSize={12}>Lays Cips 20 TL </Text>
        </VStack>
      
    </HStack>
  );
}
