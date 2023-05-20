import React from "react";
import { Box, HStack, Image, Button, Text, VStack } from "native-base";

interface IProps {
  text?: string;
  navigate?: string;
}

export default function CheckButton(props: IProps) {
  const [IsLike, setIsLike] = React.useState(true);
  return (
    <VStack>
      <Button
        backgroundColor={"#00C599"}
        height={12}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={() => console.log("hello world")}
      >
        {" "}
        <Text color={"white"} fontSize={"xl"} bold marginTop={-5}>
          {props.text}
        </Text>
      </Button>
    </VStack>
  );
}
