import React, { useEffect } from "react";
import { View, Image, ImageBackground, StyleSheet, Alert } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import CheckButton from "../Components/CheckButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { post } from "../networking/Server";
import { MainStore } from "../../stores/MainStore";
import { goPage } from "../../constants/goPage";

const Login = () => {
  const navigation: any = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  const handleLogin = (email: string = "", password: string = "") => {
    setLoading(true);
    post("login", { email, password }).then((res: any) => {
      console.log(res);
      if (res.result) {
        MainStore.setToken(res.token);
        setLoading(false);
        goPage(navigation, "HomeBottom", {}, false);
      } else {
        setLoading(false);
        Alert.alert("Hatalı Giriş", "Şifre veya kullanıcı girişi hatalı.", [
          {
            text: "İptal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "Tamam", onPress: () => console.log("OK Pressed") },
        ]);
      }
    });
  };

  const getCountries = () => {
    axios({
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      //data: {
      ///  firstName: 'Fred',
      //  lastName: 'Flintstone'
      //}
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <View style={styles.Page}>
          <ImageBackground
            source={require("../../assets/images/backIcon.png")}
            style={styles.BackgroundImage}
          >
            <Image source={require("../../assets/images/title.png")} />
          </ImageBackground>
        </View>
        <View style={styles.FormArea}>
          <View style={styles.InputArea}>
            <Text
              style={{ alignSelf: "center" }}
              fontSize="3xl"
              bold
              marginBottom={5}
            >
              Giriş Yap
            </Text>

            <Input
              variant="underlined"
              numberOfLines={4}
              maxLength={40}
              placeholder="E-Posta"
              onChangeText={(text) => {
                setEmail(text);
              }}
              InputLeftElement={
                <Icon
                  as={<Feather name="mail" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
            />
            <Input
              variant="underlined"
              numberOfLines={4}
              keyboardType="numeric"
              maxLength={40}
              placeholder="Şifre"
              onChangeText={(text) => {
                setPassword(text);
              }}
              InputLeftElement={
                <Icon
                  as={<AntDesign name="unlock" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
            />
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                şifremi unuttum
              </Text>
            </TouchableOpacity>
          </View>

          <VStack marginTop={5} space={5}>
            {loading ? (
              <Spinner color={"#FF7B00"} size={18} />
            ) : (
              <CheckButton
                onPress={() => {
                  handleLogin(email, password);
                }}
                navigation={navigation}
                navigate="HomeBottom"
                text="Giriş Yap"
                color="#FF7B00"
              />
            )}

            <HStack marginTop={5} space={3} alignItems={"center"}>
              <View style={styles.Line}></View>
              <Text bold fontSize={"md"} color={"#878BFF"}>
                ya da
              </Text>
              <View style={styles.Line}></View>
            </HStack>

            <CheckButton
              onPress={() => navigation.navigate("ChoiceRegister")}
              navigation={navigation}
              navigate="ChoiceRegister"
              text="Kayıt ol"
              color="#00C599"
            />
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: "#FF7B00",
    flexDirection: "column",
  },
  Page: {
    width: Layout.window.width,
    height: Layout.window.height * 0.4,
    justifyContent: "center",
  },
  BackgroundImage: {
    width: Layout.window.width,
    height: Layout.window.height * 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  FormArea: {
    backgroundColor: "#FFF7F0",
    width: Layout.window.width,
    paddingBottom: Layout.window.height * 0.1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  InputArea: {
    backgroundColor: "#ffffff",
    width: Layout.window.width * 0.8,
    marginTop: -Layout.window.height * 0.05,
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  Line: {
    borderBottomColor: "#878BFF",
    borderBottomWidth: 1,
    width: Layout.window.width * 0.3,
  },
});
export default Login;
