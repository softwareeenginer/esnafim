import React from "react";
import { Box, HStack, Image, Text, VStack } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";

interface IProps {
  indirim: boolean;
  navigation:any;
  navigate:string;
}

export default function Product(props: IProps) {
  return (
    <TouchableOpacity
    onPress={()=>props.navigation.navigate(props.navigate)}
      style={{ backgroundColor: "white", paddingBottom: 10, borderRadius: 16 }}
    >
      <HStack width={Layout.window.width * 0.4} alignItems={"center"}>
        <Box
          padding={1}
          width={Layout.window.width * 0.25}
          height={Layout.window.height * 0.15}
          alignItems={"center"}
          justifyContent={"center"}
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 1,
            marginTop: -5,
            marginLeft: -5,
            borderTopLeftRadius: 16,
          }}
        >
          <ImageBackground
            style={{
              width: Layout.window.width * 0.1,
              height: Layout.window.height * 0.2,
            }}
            resizeMode="contain"
            source={require("../../assets/images/Lays.jpg")}
          >
            {props.indirim == true ? 
            <Box
            marginTop={5}
            marginLeft={-5}
            backgroundColor={"#FF7B00"}
            width={38}
            height={38}
            borderRadius={"full"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Text bold color={"white"} textAlign={"center"} fontSize={8}>
              indirimli ürün
            </Text>
          </Box> 
            : 
            <></>
            }
            
          </ImageBackground>
        </Box>

        <VStack width={Layout.window.width * 0.15} alignItems={"center"}>
          <Text bold color={"#FF7B00"}>
            20 TL
          </Text>
          <Text fontSize={"xs"}>1 Adet</Text>
          <Text fontSize={"xs"}>500 gr</Text>
        </VStack>
      </HStack>
      <Text marginTop={3} bold fontSize={"xs"} alignSelf={"center"}>
        Lays Fırından 500 gr
      </Text>
      <Text fontSize={"xs"} alignSelf={"center"}>
        Ürün Açıklaması
      </Text>
    </TouchableOpacity>
  );
}
