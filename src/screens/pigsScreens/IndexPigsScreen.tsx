import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { customStyles } from "../../styles/customStyles";
import { useNavigation } from "@react-navigation/native";
import type { PigStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type PigsScreensProps = NativeStackNavigationProp<PigStackParamList, "IndexPigs">;

const IndexPigsScreen = () => {
  const navigation = useNavigation<PigsScreensProps>()
  return (
    <Container>
      <ButtonCustom
        btnStyle={[customStyles.menuButton, customStyles.btnStyle]}
        btnTitleStyle={customStyles.btnText}
        title="Ver Lista de cerdos"
        onPress={() => navigation.navigate("PigsList")}
      />
      <ButtonCustom
        btnStyle={[customStyles.menuButton, customStyles.btnStyle]}
        btnTitleStyle={customStyles.btnText}
        title="Registrar un cerdo"
        onPress={() => navigation.navigate("PigRegister")}
      />
    </Container>
  );
};

export default IndexPigsScreen;

const styles = StyleSheet.create({});
