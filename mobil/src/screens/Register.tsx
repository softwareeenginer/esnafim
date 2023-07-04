import React, { useEffect, useState } from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";

import {
  Select,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  CheckIcon,
  Box,
} from "native-base";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CheckButton from "../Components/CheckButton";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { post } from "../networking/Server";

const Register = (props: any) => {
  const navigation: any = useNavigation();

  const [isCitys, setIsCitys] = useState([]);
  const [isD, setIsD] = useState([]);
  const [isN, setIsN] = useState([]);
  const [selectedC, isSelectedC] = useState("");
  const [selectedD, isSelectedD] = useState("");
  const [selectedN, isSelectedN] = useState("");

  // name, surname, email, password, code, type
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  // code -> selectedN
  // type -> choice

  // name, surname, email, password, code, type
  const handleLogin = () => {
    post("register", {
      name: name,
      surname: surname,
      email: email,
      password: password,
      code: selectedN,
      type: props.route.params.choice,
    }).then((res: any) => {
      console.log(res)
      if (res.result) {
        navigation.navigate("Login");
      } else {
        console.log("kayıt yapılamadı");
      }
    });
  };

  useEffect(() => {
    getLocations();
  }, []);

  // ilçe getirme kodu
  useEffect(() => {
    post("location", { status: 1, code: selectedC }).then((res: any) => {
      if (res.result) {
        setIsD(res.districts);
      }
    });
  }, [selectedC]);

  // mahalle getirme kodu
  useEffect(() => {
    post("location", { status: 2, code: selectedD }).then((res: any) => {
      if (res.result) {
        setIsN(res.neighborhoods);
      }
    });
  }, [selectedD]);

  const getLocations = () => {
    post("location", { status: 0, code: 1 }).then((res: any) => {
      if (res.result) {
        setIsCitys(res.citys);
      } else {
        console.log("hata");
        //navigation.pop();
      }
    });
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
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
              Kayıt Ol
            </Text>
            <ScrollView>
              {/*isCitys.map((city: any, index: number) => {
                return (
                  <VStack key={index}>
                    <Text color={"black"}>{city.name}</Text>
                  </VStack>
                );
              })*/}
              <Select
                // selectedValue={service}
                minWidth="200"
                accessibilityLabel="Şehir Seç"
                placeholder="Şehir Seç"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue: any) => isSelectedC(itemValue)}
              >
                {isCitys?.map((item: any, index) => {
                  return (
                    <Select.Item
                      key={index}
                      label={item.name}
                      value={item.sehir_key}
                    />
                  );
                })}
              </Select>

              <Select
                // selectedValue={service}
                minWidth="200"
                accessibilityLabel="İlçe Seç"
                placeholder="İlçe Seç"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue: any) => isSelectedD(itemValue)}
              >
                {isD?.map((item: any, index) => {
                  return (
                    <Select.Item
                      key={index}
                      label={item.name}
                      value={item.ilce_key}
                    />
                  );
                })}
              </Select>

              <Select
                // selectedValue={service}
                minWidth="200"
                accessibilityLabel="Mahalle Seç"
                placeholder="Mahalle Seç"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue: any) => isSelectedN(itemValue)}
              >
                {isN?.map((item: any, index) => {
                  return (
                    <Select.Item
                      key={index}
                      label={item.name}
                      value={item.mahalle_key}
                    />
                  );
                })}
              </Select>

              <Input
                variant="underlined"
                numberOfLines={4}
                maxLength={40}
                placeholder="İsim"
                onChangeText={(text: string) => {
                  setName(text);
                }}
                InputLeftElement={
                  <Icon
                    as={<SimpleLineIcons name="bag" />}
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
                maxLength={40}
                placeholder="Soy isim"
                onChangeText={(text: string) => {
                  setSurname(text);
                }}
                InputLeftElement={
                  <Icon
                    as={<SimpleLineIcons name="bag" />}
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
                maxLength={40}
                placeholder="E-Posta"
                keyboardType="email-address"
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
                secureTextEntry
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder="Şifre"
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
              <Input
                variant="underlined"
                numberOfLines={4}
                keyboardType="numeric"
                maxLength={40}
                secureTextEntry
                placeholder="Şifre Tekrar"
                onChangeText={(text) => {
                  setRePassword(text);
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
            </ScrollView>
          </View>

          <VStack marginTop={3} space={5}>
            <CheckButton
              onPress={() => {handleLogin()}}
              navigation={navigation}
              navigate="Login"
              text="Kayıt Ol"
              color="#FF7B00"
            />
            <HStack space={3} alignItems={"center"}>
              <View style={styles.Line}></View>
              <Text bold fontSize={"md"} color={"#878BFF"}>
                ya da
              </Text>
              <View style={styles.Line}></View>
            </HStack>
            <CheckButton
              onPress={() => console.log("Regsiter")}
              navigation={navigation}
              navigate="Login"
              text="Giriş Yap"
              color="#00C599"
            />
          </VStack>
        </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
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
    height: Layout.window.height * 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
  },
  InputArea: {
    backgroundColor: "#ffffff",
    width: Layout.window.width * 0.8,
    height: Layout.window.height * 0.5,
    marginTop: -Layout.window.height * 0.1,
    borderRadius: 30,
    padding: 20,
  },
  Line: {
    borderBottomColor: "#878BFF",
    borderBottomWidth: 1,
    width: Layout.window.width * 0.3,
  },
});
export default Register;
