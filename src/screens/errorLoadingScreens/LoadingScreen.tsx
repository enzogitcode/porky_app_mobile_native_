import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { customStyles } from "../../styles/customStyles";

const LoadingScreen = () => {
  return (
    <View>
      <Text style={customStyles.titleText}>Cargando Datos...</Text>
      <Image source={require("./cerdo_durmiendo.webp")} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
