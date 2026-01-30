import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Container from "../../ui/Container";
import Card from "../../ui/Card";
import { useGetAllVacunasQuery } from "../../redux/features/vacunaSlice";
import LoadingScreen from "../errorLoadingScreens/LoadingScreen";
import ErrorScreen from "../errorLoadingScreens/ErrorScreen";
import VacunaCard from "./VacunaCard";
import { useNavigation } from "@react-navigation/native";
import { customStyles } from "../../styles/customStyles";

const VacunasListScreen = () => {
  const navigate = useNavigation()
  const { data, isLoading, isError } = useGetAllVacunasQuery();

  if (isError) return <ErrorScreen />;
  if (isLoading) return <LoadingScreen />;
  if (!isError || !isLoading)
    return (
      <Container>
        <Pressable style={customStyles.goBackButton} onPress={() => navigate.goBack()} >

        <Text style={customStyles.goBackButtonText}>Volver</Text>
        </Pressable>
        <Text style={customStyles.titleText}>Lista de vacunas registradas</Text>
        <FlatList 
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={({item}) => <VacunaCard {...item}/>}
        />
      </Container>
    );
};

export default VacunasListScreen;

const styles = StyleSheet.create({});
