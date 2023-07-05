import React from "react";
import { HStack, Image, Text, VStack } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  notificationInfo: any;
}

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
      borderWidth={1}
      borderColor={props.notificationInfo?.statu==1?"#FF7B00":"white"}
    >
      <Image
        alt=" "
        width={Layout.window.width * 0.16}
        height={Layout.window.width * 0.16}
        borderRadius={"full"}
        source={require("../../assets/images/bakkal.png")}
      />
      <VStack>
        {props.notificationInfo?.priceDiscount == "NULL" ? (
          <Text bold fontSize={14}>
            {" "}
            Yeni Ürün / {props.notificationInfo?.name}
          </Text>
        ) : (
          <Text bold fontSize={14}>
            {" "}
            Kampanya / {props.notificationInfo?.name}
          </Text>
        )}

        <Text fontSize={12}>
          {props.notificationInfo?.name} yeni ürün ekledi.
        </Text>
        <Text fontSize={12}>
          {props.notificationInfo?.product}{" "}
          {props.notificationInfo?.priceProduct} TL{" "}
        </Text>
        {props.notificationInfo?.priceDiscount == "NULL" ? (
          <></>
        ) : (
          <Text>Değil ! {props.notificationInfo?.priceDiscount} TL</Text>
        )}
      </VStack>
    </HStack>
  );
}
