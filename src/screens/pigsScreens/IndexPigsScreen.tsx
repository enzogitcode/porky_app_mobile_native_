import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { customStyles } from "../../styles/customStyles";

const IndexPigsScreen = () => {
  return (
    <Container>
      <ButtonCustom
        btnStyle={[customStyles.menuButton, customStyles.btnStyle]}
        btnTitleStyle={customStyles.btnText}
        title="Ver Lista de cerdos"
      />
      <ButtonCustom
        btnStyle={[customStyles.menuButton, customStyles.btnStyle]}
        btnTitleStyle={customStyles.btnText}
        title="Registrar un cerdo"
      />
    </Container>
  );
};

export default IndexPigsScreen;

const styles = StyleSheet.create({});
