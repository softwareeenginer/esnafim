import React from "react";
import {  HStack, Image, Text, VStack } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  takip: boolean;
}

export default function Market(props: IProps) {
  return (
    <VStack bg={"white"} width={Layout.window.width*0.9} alignSelf={"center"}  borderRadius={15}>
      <HStack space={5}>
        <Image
          borderTopLeftRadius={15}
          resizeMode="contain"
          alt="Market Görsel"
          height={Layout.window.height * 0.15}
          width={Layout.window.width * 0.5}
          source={require("../../assets/images/bakkal.png")}
        />
        <VStack  height={Layout.window.height*0.15} alignItems={"center"} justifyContent={"flex-end"}>
          <Text bold fontSize={"md"}>
            Market Adı
          </Text>
          <Text bold>18 Ürün</Text>
          <TouchableOpacity
            style={{
              backgroundColor: props.takip == true ? "#B3B4B3" : "#00C599",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 8,
            }}
          >
            {props.takip == true ? <Text bold color={"white"} fontSize={"md"}>
              Takibi Bırak
            </Text> : <Text bold color={"white"} fontSize={"md"}>
              Takip et
            </Text>}
            
          </TouchableOpacity>
        </VStack>
      </HStack>
      <VStack  paddingTop={2} space={1} paddingLeft={5} paddingBottom={3} width={Layout.window.width * 0.7}>
        <Text bold color={"black"}>
          500 m uzaklıkta
        </Text>
        <Text bold color={"black"}>
          Selahattin Eyyubi Selahattin Eyyubi Mah Şehit Ejder Yılmaz Sokak no:2
        </Text>
      </VStack>
    </VStack>
  );
}
