import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { customStyles } from "../../styles/customStyles";
import ButtonCustom from "../../ui/ButtonCustom";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation= useNavigation()
  return (
    <View>
      <Text style={customStyles.titleText}>Cargando Datos...</Text>
      <Image source={require("./cerdo_durmiendo.webp")} />
            <ButtonCustom title="volver" onPress={() => navigation.goBack()} btnStyle={customStyles.menuButton} btnTitleStyle={customStyles.btnText}/>

    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
