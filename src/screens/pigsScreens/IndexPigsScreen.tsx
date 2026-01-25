import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { customStyles } from "../../styles/customStyles";
import { useNavigation } from "@react-navigation/native";

type IndexPigsScreenProps = ''

const IndexPigsScreen = () => {
  const navigation = useNavigation()
  return (
    <Container>
      <ButtonCustom
        btnStyle={[customStyles.menuButton, customStyles.btnStyle]}
        btnTitleStyle={customStyles.btnText}
        title="Ver Lista de cerdos"
        onPress={() => navigation.navigate('PigsList')}
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
