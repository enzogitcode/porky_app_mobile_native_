import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useGetVacunaByIdQuery, useUpdateVacunaMutation } from '../../redux/features/vacunaSlice'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { customStyles } from '../../styles/customStyles'
import ButtonCustom from '../../ui/ButtonCustom'

type Props = {
  route: {
    params: {
      id: string
    }
  }
}

const VacunaUpdaterScreen = ({ route }: Props) => {
  const navigation = useNavigation()
  const { id } = route.params

  const { data } = useGetVacunaByIdQuery(id)

  const [vacunaUpdaterForm, setVacunaUpdaterForm] = useState({
    nombre: '',
    laboratorio: '',
    dosis: '',
    proveedor: '',
    descripcion: ''
  })

  const [updateVacuna, { isError }] = useUpdateVacunaMutation()

  // 🔹 Cargar datos cuando llegan del backend
  useEffect(() => {
    if (data) {
      setVacunaUpdaterForm({
        nombre: data.nombre ?? '',
        laboratorio: data.laboratorio ?? '',
        dosis: data.dosis ?? '',
        proveedor: data.proveedor ?? '',
        descripcion: data.descripcion ?? ''
      })
    }
  }, [data])

  const handleSubmit = async () => {
    try {
      await updateVacuna({ id, data: vacunaUpdaterForm }).unwrap()
      if (!isError) navigation.navigate('VacunasList')
    } catch (error) {
      console.log(error)
    }
  }

  const renderInput = (
    label: string,
    field: keyof typeof vacunaUpdaterForm,
    previousValue?: string
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      {previousValue && (
        <View style={styles.previousValueBox}>
          <Text style={styles.previousValueText}>
            Valor anterior: {previousValue}
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        value={vacunaUpdaterForm[field]}
        onChangeText={(text) =>
          setVacunaUpdaterForm({ ...vacunaUpdaterForm, [field]: text })
        }
        placeholder={`Editar ${label.toLowerCase()}`}
      />
    </View>
  )

  return (
    <TouchableWithoutFeedback>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <Text style={customStyles.titleText}>Actualizar vacuna</Text>

        {renderInput('Nombre', 'nombre', data?.nombre)}
        {renderInput('Laboratorio', 'laboratorio', data?.laboratorio)}
        {renderInput('Dosis', 'dosis', data?.dosis)}
        {renderInput('Proveedor', 'proveedor', data?.proveedor)}
        {renderInput('Descripción', 'descripcion', data?.descripcion)}

        <ButtonCustom title="Actualizar" onPress={handleSubmit} />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  )
}

export default VacunaUpdaterScreen

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  inputContainer: {
    marginBottom: 18
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  previousValueBox: {
    backgroundColor: '#f2f2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#999',
    padding: 6,
    marginBottom: 6,
    borderRadius: 6
  },
  previousValueText: {
    fontSize: 13,
    color: '#555'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff'
  }
})
