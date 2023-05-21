import React from "react";
import { Box, HStack, Image, Button, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  text?: string;
  navigation: any;
  navigate:string
}

export default function CheckButton(props: IProps) {

  return (
    <VStack>
      <Button
        backgroundColor={"#00C599"}
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
