import React from "react";
import { Box, HStack, Image, Button, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../constants/Layout";
import { space } from "native-base/lib/typescript/theme/styled-system";

interface IProps {
    text?: string;
    image:any;
    color:string;
}

export default function Info(props: IProps) {
  return (
    <VStack alignItems={"center"}>
      <Image
        width={Layout.window.width * 0.7}
        alt=" "
        resizeMode="contain"
        source={props.image}
      />
      <VStack
        space={5}
        alignItems={"center"}
        padding={5}
        backgroundColor={"white"}
        borderRadius={10}
        shadow={3}
      >
        <Text color={props.color} bold>{props.text}</Text>
        <Button
          backgroundColor={"white"}
          shadow={3}
          width={Layout.window.width * 0.5}
        >
          <Text>TAMAM</Text>
        </Button>
      </VStack>
    </VStack>
  );
}
