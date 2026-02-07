import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import ModalDateTimePicker from 'react-native-modal-datetime-picker'
import { useGetVacunaByIdQuery } from '../../redux/features/vacunaSlice'
import { useGetAllPigsArrayQuery, useVacunarPigMutation } from '../../redux/features/pigSlice'
import ButtonCustom from '../../ui/ButtonCustom'
import { customStyles } from '../../styles/customStyles'
import { StackActions, useNavigation } from '@react-navigation/native'
import { ScreenStack } from 'react-native-screens'
import Container from '../../ui/Container'

type Props = {
  route: {
    params: {
      id: string
    }
  }
}

const VacunaAplicarScreen = ({ route }: Props) => {
  const navigation = useNavigation()
  const { id } = route.params

  // Obtener la vacuna y las cerdas
  const { data: vacuna, isError: vError, isLoading: vLoading } = useGetVacunaByIdQuery(id)
  const { data: pigs, isError: pError, isLoading: pLoading } = useGetAllPigsArrayQuery({ limit: 1000 })
  const [vacunarCerda, { isError, isLoading, isSuccess }] = useVacunarPigMutation()

  // Estados de manejo
  const [showFechaGlobal, setShowFechaGlobal] = useState(false)
  const [globalFecha, setGlobalFecha] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedFecha, setSelectedFecha] = useState<Record<string, string>>({})
  const [selectedPigs, setSelectedPigs] = useState<Set<string>>(new Set())

  // Función para aplicar la vacuna
  const aplicarVacuna = (cerdaId: string, fecha: string) => {
    vacunarCerda({ pigId: cerdaId, vacunaId: id, fechaVacunacion: new Date(fecha).toISOString() })
      .then(() => Alert.alert('Vacuna aplicada', `Vacuna aplicada a cerda ${cerdaId} en ${fecha}`))
      .catch(() => Alert.alert('Error', 'Hubo un problema al aplicar la vacuna'))
  }

  // Función para manejar la fecha global
  const handleFechaGlobalChange = (fecha: Date) => {
    setGlobalFecha(fecha)
    setShowDatePicker(false)  // Cerrar el DateTimePicker
    setSelectedFecha({})  // Limpiar las fechas personalizadas cuando se aplica fecha global
  }

  // Cambiar la fecha para una cerda específica
  const handleFechaCerdaChange = (pigId: string, newFecha: string) => {
    setSelectedFecha(prev => ({
      ...prev,
      [pigId]: newFecha
    }))
  }

  // Función para alternar selección de cerdos
  const toggleCerdaSelection = (pigId: string) => {
    setSelectedPigs(prev => {
      const newSelectedPigs = new Set(prev)
      if (newSelectedPigs.has(pigId)) {
        newSelectedPigs.delete(pigId)
      } else {
        newSelectedPigs.add(pigId)
      }
      return newSelectedPigs
    })
  }

  return (
  <Container>
      <ButtonCustom btnStyle={customStyles.menuButton} btnTitleStyle={customStyles.btnText} title="Ir a Vacunas" onPress={() => navigation.dispatch(StackActions.popToTop())} />
      <Text style={customStyles.titleText}>Aplicación de la vacuna: {vacuna?.nombre}</Text>

      {/* Botón para activar la fecha global */}
      <TouchableOpacity onPress={() => setShowFechaGlobal(!showFechaGlobal)}>
        <Text style={styles.toggleText}>
          {showFechaGlobal ? 'Usar fecha individual para cada cerda' : 'Usar fecha global'}
        </Text>
      </TouchableOpacity>

      {/* Mostrar la fecha global */}
      {showFechaGlobal && (
        <>
          <Text style={styles.label}>Fecha Global</Text>
          <Text>{globalFecha.toLocaleString()}</Text>
          <ButtonCustom btnStyle={[customStyles.menuButton, {padding: 10}]} btnTitleStyle={styles.btnGlobalDateText} title="Seleccionar Fecha Global" onPress={() => setShowDatePicker(true)} />
        </>
      )}

      {/* DateTimePicker para seleccionar la fecha global */}
      <ModalDateTimePicker
        isVisible={showDatePicker}
        mode="datetime"
        date={globalFecha}
        onConfirm={handleFechaGlobalChange}
        onCancel={() => setShowDatePicker(false)}
      />

      <FlatList
        data={pigs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cerdaItem}>
            {/* Mostrar el input de fecha individual si no usamos fecha global */}
            {!showFechaGlobal && (
              <>
                <TextInput
                  placeholder="Fecha de aplicación"
                  value={selectedFecha[item._id]}
                  onChangeText={(text) => handleFechaCerdaChange(item._id, text)}
                  style={styles.input}
                />
              </>
            )}

            {/* Datos de la cerda */}
            <Text style={customStyles.btnText}>{item.nroCaravana}</Text>
            <Text>Estadio: {item.estadio}</Text>
            <Text>Ubicación: {item.ubicacion}</Text>
            <Text>Descripción: {item.descripcion}</Text>

            {/* Checkbox o botón para seleccionar/deseleccionar la cerda */}
            <TouchableOpacity onPress={() => toggleCerdaSelection(item._id)}>
              <Text style={styles.selectText}>
                {selectedPigs.has(item._id) ? '✔️ Seleccionada' : '🔲 Seleccionar'}
              </Text>
            </TouchableOpacity>

            {/* Mostrar botón para aplicar vacuna solo si la cerda está seleccionada */}
            {selectedPigs.has(item._id) && (
              <ButtonCustom
                title="Aplicar vacuna"
                onPress={() => aplicarVacuna(item._id, showFechaGlobal ? globalFecha.toISOString() : selectedFecha[item._id] || new Date().toISOString())}
              />
            )}
          </View>
        )}
      />
    </Container>
  )
}

export default VacunaAplicarScreen

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  cerdaItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10
  },
  toggleText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    width: '100%'
  },
  selectText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginVertical: 5
  },
  btnGlobalDate: {
   
  },
  btnGlobalDateText: {
    fontSize: 18
  }
})
