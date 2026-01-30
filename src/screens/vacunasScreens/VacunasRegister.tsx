import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useCreateVacunaMutation } from "../../redux/features/vacunaSlice";
import { useNavigation } from "@react-navigation/native";

type VacunaFormValues = {
  nombre: string;
  dosis: string;
  proveedor: string;
  laboratorio: string;
  descripcion: string;
};

const VacunasRegister = () => {
  const [vacuna, setVacuna] = useState<VacunaFormValues>({
    nombre: "",
    dosis: "",
    proveedor: "",
    laboratorio: "",
    descripcion: "",
  });

  const handleChange = (key: keyof VacunaFormValues, value: string) => {
    setVacuna((prev) => ({ ...prev, [key]: value }));
  };

  const [createVacuna, { isLoading, isError, data }] = useCreateVacunaMutation();

  const navigate = useNavigation()
  const handleSubmit = async () => {
    try {
      await createVacuna(vacuna)
      navigate.navigate('VacunasList')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // ajusta según tu header
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la vacuna"
              value={vacuna.nombre}
              onChangeText={(text) => handleChange("nombre", text)}
            />
          </View>

          {/* Dosis */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dosis:</Text>
            <TextInput
              style={styles.input}
              placeholder="Cantidad de dosis"
              value={vacuna.dosis}
              onChangeText={(text) => handleChange("dosis", text)}
            />
          </View>

          {/* Proveedor */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Proveedor:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del proveedor"
              value={vacuna.proveedor}
              onChangeText={(text) => handleChange("proveedor", text)}
            />
          </View>

          {/* Laboratorio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Laboratorio:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del laboratorio"
              value={vacuna.laboratorio}
              onChangeText={(text) => handleChange("laboratorio", text)}
            />
          </View>

          {/* Descripción */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Descripción de la vacuna"
              value={vacuna.descripcion}
              onChangeText={(text) => handleChange("descripcion", text)}
              multiline
            />
          </View>

          <Button title="Guardar Vacuna" onPress={handleSubmit} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default VacunasRegister;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  textarea: {
    height: 80,
    textAlignVertical: "top",
  },
});
