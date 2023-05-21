import React from "react";
import { View, Image, ImageBackground, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HStack, Icon, Input, KeyboardAvoidingView, Text, VStack } from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import CheckButton from "../Components/CheckButton";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const PasswordUpdate = () => {
    const navigation:any = useNavigation();
  return (
    <SafeAreaView
      style={styles.SafeAreaView}
    >
      <View
        style={styles.Page}
      >
        <ImageBackground
          source={require("../../assets/images/backIcon.png")}
          style={styles.BackgroundImage}
        >
          <Image source={require("../../assets/images/title.png")} />
        </ImageBackground>
      </View>
      <KeyboardAvoidingView>
      <View
        style={styles.FormArea}
      >
        <View
          style={styles.InputArea}
        >
          <Text
            style={{ alignSelf: "center" }}
            fontSize="3xl"
            bold
            marginBottom={5}
          >
            Şifremi Unuttum
          </Text>
          <View style={{width:Layout.window.width*0.5, alignSelf:"center"}}>
          <Text
            style={{ alignSelf: "center" }}
            fontSize="xl"
            bold
            marginBottom={5}
            textAlign={"center"}
          >
            Yeni Şifreni gir!
          </Text>
          </View>
          <Input
            variant="underlined"
            numberOfLines={4}
            keyboardType="numeric"
            maxLength={40}
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
            placeholder="Şifre Tekrarı"
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
        </View>

        
          <View style={{marginTop:40}}>
          <CheckButton 
          navigation={navigation}
          navigate="Login"
          text="Onayla"
          />
          </View>
          
          
       
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
    SafeAreaView:{ flex: 1, backgroundColor: "#FF7B00", flexDirection: "column" },
    Page:{
        width: Layout.window.width,
        height: Layout.window.height * 0.4,
        justifyContent: "center",
      },
    BackgroundImage:{
        width: Layout.window.width,
        height: Layout.window.height * 0.45,
        justifyContent: "center",
        alignItems: "center",
      },  
    FormArea:{
        backgroundColor: "#FFF7F0",
        width: Layout.window.width,
        height: Layout.window.height * 0.7,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: "center",
      },
    InputArea:{
        backgroundColor: "#ffffff",
        width: Layout.window.width * 0.8,
        marginTop: -Layout.window.height * 0.05,
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
      },  
    
  });
export default PasswordUpdate;
