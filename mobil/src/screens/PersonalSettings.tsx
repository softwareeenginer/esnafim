import React from "react";
import { StyleSheet, View } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Image, Input, Spinner, Text, VStack } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CheckButton from "../Components/CheckButton";
import SelectDropdown from "react-native-select-dropdown";
import { post } from "../networking/Server";
import * as ImagePicker from "expo-image-picker";

const PersonalSettings = () => {
  const navigation: any = useNavigation();
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  const [userInfo, setUserInfo]: any = React.useState(null);
  const [name, setName]: any = React.useState(null);
  const [surname, setSurname]: any = React.useState(null);
  const [email, setEmail]: any = React.useState(null);
  const [password, setPassword]: any = React.useState(null);

  const [loadingImage, setLoadingImage] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const handleSave = (
    name: string = "",
    surname: string = "",
    email: string = "",
    password: string = ""
  ) => {
    setLoading(true);
    post("/api/profile/get/edit", {
      name,
      surname,
      email,
      password,
    }).then((res: any) => {
      console.log(res.result);
      if (res.result) {
        setLoading(false);
        getProfile();
      } else {
        navigation.pop();
      }
    });
  };

  const getProfile = () => {
    post("/api/profile/get").then((res: any) => {
      if (res.result) {
        setLoading(false);
        setUserInfo(res.info);
      } else {
        navigation.pop();
      }
    });
  };

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Spinner size={22} color={"black"} />
      </View>
    );
  }

  const setImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (result) {
      setLoadingImage(true);
      const imageUri = result.assets[0].uri;

      const imageExtension = imageUri.substr(imageUri.lastIndexOf(".") + 1);

      const formData: any = new FormData();

      console.log(imageUri,`${new Date().getTime()}.${imageExtension}`,`${result.assets[0].type}/${imageExtension}`)

      formData.append("image", {
        uri: imageUri,
        name: `${new Date().getTime()}.${imageExtension}`,
        type: `${result.assets[0].type}/${imageExtension}`,
      });
      console.log("girdi1");
      const data: any = await post("/api/profile/set-image");
      console.log("1");
      const info: any = await post("/api/profile/get");
      console.log("2");
      const image = info.info.image;
      setUserInfo({ ...userInfo, image });
      console.log(data);

      setLoadingImage(false);
      if (data?.result) {
        console.log("başarıyla değiştirildi.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <HStack
        width={Layout.window.width}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={5}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.HeaderButton}
        >
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
        <Text bold>Ayarlar</Text>
        <TouchableOpacity style={styles.HeaderGhostButton}>
          <AntDesign name="left" size={20} color={"black"} />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={3} alignItems={"center"} marginBottom={10}>
          <TouchableOpacity
            onPress={() => {
              setImage();
            }}
          >
            <Image
              width={Layout.window.width * 0.7}
              height={Layout.window.height * 0.3}
              borderRadius={"2xl"}
              resizeMode="contain"
              alt=" "
              source={{ uri: userInfo?.image }}
            />
            <Feather
              style={{ marginTop: -14, alignSelf: "flex-end" }}
              name="edit"
              size={20}
            />
          </TouchableOpacity>

          <HStack space={5}>
            <Input
              maxLength={40}
              width={Layout.window.width * 0.37}
              placeholder={userInfo?.name}
              placeholderTextColor={"black"}
              backgroundColor={"white"}
              InputRightElement={
                <Icon
                  as={<Feather name="edit" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <Input
              maxLength={40}
              width={Layout.window.width * 0.37}
              placeholder={userInfo?.surname}
              placeholderTextColor={"black"}
              backgroundColor={"white"}
              InputRightElement={
                <Icon
                  as={<Feather name="edit" />}
                  marginRight={2}
                  size={5}
                  ml="2"
                  color="#000000"
                />
              }
              onChangeText={(text) => {
                setSurname(text);
              }}
            />
          </HStack>
          <Input
            maxLength={40}
            width={Layout.window.width * 0.8}
            placeholder={userInfo?.email}
            placeholderTextColor={"black"}
            backgroundColor={"white"}
            InputRightElement={
              <Icon
                as={<Feather name="edit" />}
                marginRight={2}
                size={5}
                ml="2"
                color="#000000"
              />
            }
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <HStack space={5}>
            <SelectDropdown
              data={countries}
              defaultButtonText="Gaziantep"
              buttonStyle={{
                backgroundColor: "white",
                borderBottomColor: "#878BFF",
                width: Layout.window.width * 0.37,
              }}
              dropdownOverlayColor="rgba(0,0,0,0.7)"
              buttonTextStyle={{ fontSize: 12, position: "absolute", right: 5 }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <SelectDropdown
              data={countries}
              defaultButtonText="Şehitkamil"
              buttonStyle={{
                backgroundColor: "white",
                borderBottomColor: "#878BFF",
                width: Layout.window.width * 0.37,
              }}
              dropdownOverlayColor="rgba(0,0,0,0.7)"
              buttonTextStyle={{ fontSize: 12, position: "absolute", right: 5 }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </HStack>
          <SelectDropdown
            data={countries}
            defaultButtonText="Seyrantepe mah."
            buttonStyle={{
              backgroundColor: "white",
              borderBottomColor: "#878BFF",
              width: Layout.window.width * 0.8,
            }}
            dropdownOverlayColor="rgba(0,0,0,0.7)"
            buttonTextStyle={{ fontSize: 12, position: "absolute", right: 5 }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <Input
            maxLength={40}
            width={Layout.window.width * 0.8}
            keyboardType="numeric"
            placeholder="Yeni Şifre"
            placeholderTextColor={"black"}
            backgroundColor={"white"}
            InputRightElement={
              <Icon
                as={<Feather name="edit" />}
                marginRight={2}
                size={5}
                ml="2"
                color="#000000"
              />
            }
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <CheckButton
            onPress={() => {
              handleSave(name, surname, email, password);
            }}
            text="Kaydet"
            color="#878BFF"
            navigation={navigation}
            navigate="ProfilePage"
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "#FFF7F0",
    flexDirection: "column",
    alignItems: "center",
  },
  HeaderButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderGhostButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
});
export default PersonalSettings;
