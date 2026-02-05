import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { Vacuna } from "../../types/vacunaType";
import { useDeleteVacunaByIdMutation } from "../../redux/features/vacunaSlice";
import ButtonCustom from "../../ui/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { customStyles } from "../../styles/customStyles";
import { Alert } from "react-native";

type VacunaCardNavigationProp = NativeStackNavigationProp<
  {
    VacunaUpdater: { id: string };
    VacunaAplicar: { id: string };
  }
>;

const VacunaCard: React.FC<Vacuna> = (props) => {

  const navigation = useNavigation<VacunaCardNavigationProp>();
  
  const [deleteVacunaById, { isLoading }] = useDeleteVacunaByIdMutation();

const handleRemove = async () => {
  try {
    await deleteVacunaById(props._id).unwrap();
    console.log("Vacuna eliminada");
  } catch (error) {
    console.log("Error al eliminar:", error);
  }
};

const confirmDelete = () => {
  Alert.alert(
    "Confirmar eliminación",
    "¿Estás seguro de que deseas eliminar esta vacuna?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: handleRemove,
      },
    ]
  );
};

  
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{props.nombre}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Laboratorio:</Text>
        <Text style={styles.value}>{props.laboratorio}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Dosis:</Text>
        <Text style={styles.value}>{props.dosis}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Proveedor:</Text>
        <Text style={styles.value}>{props.proveedor}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{props.descripcion}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Última actualización:</Text>
        <Text style={styles.value}>
          {new Date(props.updatedAt).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonCustom
          title={isLoading ? "Eliminando vacuna..." : "Eliminar"}
          onPress={confirmDelete}
          btnStyle={customStyles.deleteButton}
          btnTitleStyle={[customStyles.goBackButtonText, {color: '#fff'}]}
        />
        <ButtonCustom
        btnStyle={customStyles.updateButton}
          title={"Actualizar"}
          onPress={() =>
            navigation.navigate("VacunaUpdater", {id: props._id})
          }
        />
        <ButtonCustom
        btnStyle={customStyles.infoButtonAmber}
          title={"Aplicar vacuna"}
          onPress={() =>
            navigation.navigate("VacunaAplicar", {id: props._id})
          }
        />
      </View>
    </View>
  );
};

export default VacunaCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    alignItems: "center", // centra horizontalmente todos los hijos
  },
  row: {
    marginVertical: 4,
    width: "100%",
    alignItems: "center", // centra horizontalmente los textos
  },
  label: {
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    marginTop: 12,
    width: "100%",
   gap: 10,
  }
});
