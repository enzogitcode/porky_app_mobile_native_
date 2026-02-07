import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useGetPigByIdQuery, useVacunarPigMutation } from '../../redux/features/pigSlice'
import { useGetAllVacunasQuery } from '../../redux/features/vacunaSlice'
import ModalDateTimePicker from 'react-native-modal-datetime-picker'
import ButtonCustom from '../../ui/ButtonCustom'
import { customStyles } from '../../styles/customStyles'

type Props = {
  route: {
    params: {
      id: string
    }
  }
}

const PigAplicarVacunasScreen = ({ route }: Props) => {
  const { id } = route.params

  // Obtener datos del cerdo
  const { data: pig, isError: pigError, isLoading: pigLoading } = useGetPigByIdQuery(id)

  // Obtener vacunas (agregando el ? para manejar undefined)
  const { data: vacunas, isError: vacunasError, isLoading: vacunasLoading } = useGetAllVacunasQuery()

  // Función para aplicar las vacunas
  const [vacunarCerda, { isLoading: vacunarLoading, isError: vacunarError, isSuccess }] = useVacunarPigMutation()

  // Estados de manejo
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedFecha, setSelectedFecha] = useState<Date | null>(null)
  const [selectedVacunas, setSelectedVacunas] = useState<Set<string>>(new Set())

  // Manejo de la fecha seleccionada
  const handleFechaConfirm = (fecha: Date) => {
    setSelectedFecha(fecha)
    setShowDatePicker(false)
  }

  // Función para alternar la selección de vacunas
  const toggleVacunaSelection = (vacunaId: string) => {
    setSelectedVacunas((prevSelected) => {
      const newSelected = new Set(prevSelected)
      if (newSelected.has(vacunaId)) {
        newSelected.delete(vacunaId)
      } else {
        newSelected.add(vacunaId)
      }
      return newSelected
    })
  }

  // Función para aplicar las vacunas seleccionadas
  const aplicarVacunas = async () => {
    if (!selectedFecha) {
      Alert.alert('Error', 'Por favor selecciona una fecha primero.')
      return
    }

    if (selectedVacunas.size === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos una vacuna.')
      return
    }

    try {
      await Promise.all(
        Array.from(selectedVacunas).map((vacunaId) =>
          vacunarCerda({ pigId: id, vacunaId: vacunaId, fechaVacunacion: selectedFecha.toISOString() })
        )
      )
      Alert.alert('Éxito', 'Vacunas aplicadas correctamente')
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al aplicar las vacunas')
    }
  }

  // Función para seleccionar/deseleccionar todas las vacunas
  const toggleSelectAllVacunas = () => {
    if (selectedVacunas.size === vacunas?.length) {
      setSelectedVacunas(new Set()) // Deselecciona todas
    } else {
      setSelectedVacunas(new Set(vacunas?.map(vacuna => vacuna._id))) // Selecciona todas
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Aplicar vacunas a la cerda {pig?.nroCaravana}
      </Text>

      {/* Seleccionar fecha */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {selectedFecha ? `Fecha seleccionada: ${selectedFecha.toLocaleString()}` : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>

      {/* Mostrar el Modal DateTimePicker */}
      <ModalDateTimePicker
        isVisible={showDatePicker}
        mode="datetime"
        date={selectedFecha || new Date()}
        onConfirm={handleFechaConfirm}
        onCancel={() => setShowDatePicker(false)}
      />

      {/* Botón para seleccionar/deseleccionar todas las vacunas */}
      <TouchableOpacity onPress={toggleSelectAllVacunas} style={styles.selectAllButton}>
        <Text style={styles.selectAllButtonText}>
          {selectedVacunas.size === vacunas?.length ? '❌ Deseleccionar todas' : '✅ Seleccionar todas'}
        </Text>
      </TouchableOpacity>

      {/* Mostrar las vacunas con un checkbox para seleccionarlas */}
      <FlatList
        keyExtractor={(item) => item._id}
        data={vacunas}
        renderItem={({ item }) => (
          <View style={styles.vacunaItem}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Dosis: {item.dosis}</Text>
            <Text>Laboratorio: {item.laboratorio}</Text>

            {/* Checkbox o botón para seleccionar/deseleccionar la vacuna */}
            <TouchableOpacity onPress={() => toggleVacunaSelection(item._id)} style={styles.selectButton}>
              <Text style={styles.selectButtonText}>
                {selectedVacunas.has(item._id) ? '✔️ Seleccionada' : '🔲 Seleccionar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botón para aplicar las vacunas seleccionadas */}
      <ButtonCustom
      btnStyle={customStyles.menuButton}
      btnTitleStyle={customStyles.btnText}
        title="Aplicar vacunas seleccionadas"
        onPress={aplicarVacunas}
        disabled={vacunarLoading || !selectedFecha || selectedVacunas.size === 0}
      />
    </View>
  )
}

export default PigAplicarVacunasScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  vacunaItem: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  selectButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 6,
  },
  selectButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  selectAllButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#FF9800',
    borderRadius: 6,
    alignItems: 'center',
  },
  selectAllButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  }
})
