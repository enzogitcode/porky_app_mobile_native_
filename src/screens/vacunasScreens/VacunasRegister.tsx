import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

  const [createVacuna] = useCreateVacunaMutation();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    await createVacuna(vacuna);
    navigation.navigate("VacunasList" as never);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={vacuna.nombre}
            onChangeText={(t) => handleChange("nombre", t)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosis:</Text>
          <TextInput
            style={styles.input}
            value={vacuna.dosis}
            onChangeText={(t) => handleChange("dosis", t)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Proveedor:</Text>
          <TextInput
            style={styles.input}
            value={vacuna.proveedor}
            onChangeText={(t) => handleChange("proveedor", t)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Laboratorio:</Text>
          <TextInput
            style={styles.input}
            value={vacuna.laboratorio}
            onChangeText={(t) => handleChange("laboratorio", t)}
          />
        </View>

        {/* ✅ AQUÍ YA NO SE TAPA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            textAlignVertical="top"
            value={vacuna.descripcion}
            onChangeText={(t) => handleChange("descripcion", t)}
          />
        </View>

        <Button title="Guardar Vacuna" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default VacunasRegister;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  textarea: {
    height: 120,
  },
});
