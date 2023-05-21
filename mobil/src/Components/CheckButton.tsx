import React from "react";
import { Box, HStack, Image, Button, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../constants/Layout";

interface IProps {
  text?: string;
  navigation: any;
  navigate:string;
  color:string;
}

export default function CheckButton(props: IProps) {

  return (
    <VStack>
      <Button
      width={Layout.window.width*0.8}
        backgroundColor={props.color}
        height={12}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={()=>{
          props.navigation.navigate(props.navigate)
        }}
      >
        {" "}
        <Text color={"white"} fontSize={"xl"} bold marginTop={-5}>
          {props.text}
        </Text>
      </Button>
    </VStack>
  );
}
