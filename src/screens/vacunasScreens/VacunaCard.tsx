import { StyleSheet, Text, View } from "react-native";
import React from "react";
import type { Vacuna } from "../../types/vacunaType";
import { useDeleteVacunaByIdMutation } from "../../redux/features/vacunaSlice";
import ButtonCustom from "../../ui/ButtonCustom";

const VacunaCard: React.FC<Vacuna> = (props) => {
  const [deleteVacunaById, { isLoading }] = useDeleteVacunaByIdMutation();

  const handleRemove = async () => {
    try {
      const results = await deleteVacunaById(props._id).unwrap()
      console.log(results)
    } catch (error) {
      console.log(error);
    }
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
      <View>
        <ButtonCustom
          title={isLoading ? "Eliminando vacuna..." : "Eliminar"}
          onPress={handleRemove}
        />
      </View>
    </View>
  );
};

export default VacunaCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
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
});
