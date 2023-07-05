import React from "react";
import { Box, HStack, Image, Text, VStack, View } from "native-base";
import Layout from "../../constants/Layout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";

interface IProps {
  indirim: boolean;
  productInfo: any;
  marketInfo: any;
}

export default function Product(props: IProps) {
  return (
    <View>
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
              width: Layout.window.width * 0.2,
              height: Layout.window.height * 0.2,
            }}
            resizeMode="contain"
            source={{ uri: props.productInfo?.image }}
          >
            {props.productInfo?.priceDiscount == true ? (
              <Box
                marginTop={Layout.window.height * 0.035}
                backgroundColor={"#FF7B00"}
                width={38}
                height={38}
                borderRadius={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                zIndex={5}
                
              >
                <Text bold color={"white"} textAlign={"center"} fontSize={8}>
                  indirimli ürün
                </Text>
              </Box>
            ) : (
              <></>
            )}
          </ImageBackground>
        </Box>

        <VStack width={Layout.window.width * 0.15} alignItems={"center"}>
          <Text bold color={"#FF7B00"}>
            {props.productInfo?.price}
          </Text>
          <Text fontSize={"xs"}>{props.productInfo?.howMany} A / Kg </Text>
          <Text fontSize={"xs"}>{props.productInfo?.name}</Text>
        </VStack>
      </HStack>
      <Text marginTop={3} bold fontSize={"xs"} alignSelf={"center"}>
        {props.productInfo?.name}
      </Text>
      <Text fontSize={"xs"} alignSelf={"center"}>
        {props.productInfo?.description}
      </Text>
    </View>
  );
}
