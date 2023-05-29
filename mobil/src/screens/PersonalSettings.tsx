import React from "react";
import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { HStack, Icon, Image, Input, Text, VStack } from "native-base";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CheckButton from "../Components/CheckButton";
import SelectDropdown from "react-native-select-dropdown";

const PersonalSettings = () => {
  const navigation: any = useNavigation();
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
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
          <TouchableOpacity>
          <Image
            width={Layout.window.width * 0.7}
            height={Layout.window.height * 0.3}
            borderRadius={"2xl"}
            resizeMode="contain"
            alt=" "
            source={require("../../assets/images/Profile.jpg")}
          />
          <Feather style={{marginTop:-14, alignSelf:"flex-end"}} name="edit" size={20}/>
          </TouchableOpacity>
          
          <HStack space={5}>
            <Input
              maxLength={40}
              width={Layout.window.width * 0.37}
              placeholder="Rabia"
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
            />
            <Input
              maxLength={40}
              width={Layout.window.width * 0.37}
              placeholder="Parlak"
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
            />
          </HStack>
          <Input
            maxLength={40}
            width={Layout.window.width * 0.8}
            placeholder="rparlak345@gmailcom"
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
          />
          <CheckButton
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