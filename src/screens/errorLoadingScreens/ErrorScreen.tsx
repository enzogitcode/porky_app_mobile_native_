import { StyleSheet, Text, Image } from "react-native";
import React from "react";
import Container from "../../ui/Container";
import { customStyles } from "../../styles/customStyles";
import ButtonCustom from "../../ui/ButtonCustom";
import { useNavigation } from "@react-navigation/native";


const ErrorScreen = () => {
  const navigation= useNavigation()
  return (
    <Container>
      <Text style={customStyles.titleText}>Hubo un error</Text>
      <Image
        style={{ width: 200, height: 200, borderRadius: 20 }}
        source={require("./pigError.jpg")}
      />
<ButtonCustom title="volver" onPress={() => navigation.goBack()} btnStyle={customStyles.menuButton} btnTitleStyle={customStyles.btnText}/>    </Container>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({});
