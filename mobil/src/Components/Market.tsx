import React from "react";
import {  HStack, Image, Text, VStack } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  takip: boolean;
  marketInfo:any;
}

export default function Market(props: IProps) {
  console.log(props);
  return (
    <VStack bg={"white"} width={Layout.window.width*0.9} alignSelf={"center"}  borderRadius={15}>
      <HStack space={5}>
        <Image
          borderTopLeftRadius={15}
          resizeMode="contain"
          alt="Market Görsel"
          height={Layout.window.height * 0.15}
          width={Layout.window.width * 0.5}
          source={{uri:props.marketInfo?.image}}
        />
        <VStack  height={Layout.window.height*0.15} alignItems={"center"} justifyContent={"flex-end"}>
          <Text bold fontSize={"md"}>
            {props.marketInfo?.name}
          </Text>
          <Text bold>{props.marketInfo?.product}</Text>
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
          {props.marketInfo?.address}
       </Text>
      </VStack>
    </VStack>
  );
}
