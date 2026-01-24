import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../../ui/Container";
import ButtonCustom from "../../ui/ButtonCustom";
import { customStyles } from "../../styles/customStyles";
import { useNavigation } from "@react-navigation/native";
import type { VacunasStackParamList } from "../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type VacunasScreenNavigationProp = NativeStackNavigationProp<
  VacunasStackParamList,
  "IndexVacunas"
>;

const IndexVacunasScreen = () => {
  const navigation = useNavigation<VacunasScreenNavigationProp>();
  return (
    <Container>
      <ButtonCustom
        title="Lista de Vacunas"
        btnTitleStyle={customStyles.btnText}
        btnStyle={[customStyles.btnStyle, customStyles.menuButton]}
        onPress={() => navigation.navigate("VacunasList")}
      />
      <ButtonCustom
        title="Lista de Vacunas"
        btnTitleStyle={customStyles.btnText}
        btnStyle={[customStyles.btnStyle, customStyles.menuButton]}
        onPress={() => navigation.navigate("VacunasList")}
      />
    </Container>
  );
};

export default IndexVacunasScreen;

const styles = StyleSheet.create({});
