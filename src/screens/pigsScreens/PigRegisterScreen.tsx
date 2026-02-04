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
import { useNavigation } from "@react-navigation/native";
import { useCreateAPigMutation } from "../../redux/features/pigSlice";
import { Picker } from "@react-native-picker/picker";
import type { Situacion } from "../../types/pigTypes";

type PigFormValues = {
  nroCaravana: string;
  estadio: Situacion;
  fechaFallecido?: string;
  descripcion?: string;
  ubicacion?: string;
  enfermedadActual?: string;
};

const PigRegister = () => {
  const [pig, setPig] = useState<PigFormValues>({
    nroCaravana: "",
    estadio: "nulipara",
    fechaFallecido: "",
    descripcion: "",
    ubicacion: "",
    enfermedadActual: "",
  });

  const handleChange = (key: keyof PigFormValues, value: string) => {
    setPig((prev) => ({ ...prev, [key]: value }));
  };

  const [createPig] = useCreateAPigMutation();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const payload = { ...pig, nroCaravana: Number(pig.nroCaravana) };
    await createPig(payload);
    navigation.navigate("PigList" as never);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        {/* Nro Caravana */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nro Caravana:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pig.nroCaravana}
            onChangeText={(t) => handleChange("nroCaravana", t)}
          />
        </View>

        {/* Estadio */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Estadio:</Text>
          <Picker
            selectedValue={pig.estadio}
            onValueChange={(value) => handleChange("estadio", value)}
          >
            <Picker.Item label="Nulípara" value="nulipara" />
            <Picker.Item label="Servida" value="servida" />
            <Picker.Item label="Gestación Confirmada" value="gestación confirmada" />
            <Picker.Item label="Parida con Lechones" value="parida con lechones" />
            <Picker.Item label="Destetada" value="destetada" />
            <Picker.Item label="Vacía" value="vacía" />
            <Picker.Item label="Descarte" value="descarte" />
            <Picker.Item label="Fallecido" value="fallecido" />
          </Picker>
        </View>

        {/* Fecha Fallecido (solo si fallecido) */}
        {pig.estadio === "fallecido" && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha Fallecido:</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={pig.fechaFallecido}
              onChangeText={(t) => handleChange("fechaFallecido", t)}
            />
          </View>
        )}

        {/* Descripción */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            textAlignVertical="top"
            value={pig.descripcion}
            onChangeText={(t) => handleChange("descripcion", t)}
          />
        </View>

        {/* Ubicación */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ubicación:</Text>
          <TextInput
            style={styles.input}
            value={pig.ubicacion}
            onChangeText={(t) => handleChange("ubicacion", t)}
          />
        </View>

        {/* Enfermedad Actual */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enfermedad Actual:</Text>
          <TextInput
            style={styles.input}
            value={pig.enfermedadActual}
            onChangeText={(t) => handleChange("enfermedadActual", t)}
          />
        </View>

        <Button title="Guardar Cerdo" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default PigRegister;

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
