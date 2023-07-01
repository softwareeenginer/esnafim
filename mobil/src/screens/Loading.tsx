import { Spinner } from "native-base";
import React from "react";
import { View } from "react-native";
import { MainStore } from "../../stores/MainStore";
import { goPage } from "../../constants/goPage";
import { useNavigation } from "@react-navigation/native";

const Loading = () => {
  // -- NAVIGATION -- //
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      if (MainStore.token) {
        goPage(navigation, "HomeBottom", {}, false);
      } else {
        goPage(navigation, "Login", {}, false);
      }
    }, 1000);
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Spinner color={"orange.500"} size={30} />
    </View>
  );
};
export default Loading;
