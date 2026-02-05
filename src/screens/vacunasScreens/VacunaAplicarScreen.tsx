import React, { useMemo, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'

import { useGetVacunaByIdQuery } from '../../redux/features/vacunaSlice'
import {
  useGetAllPigsArrayQuery,
  useVacunarPigMutation
} from '../../redux/features/pigSlice'

import Container from '../../ui/Container'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import { customStyles } from '../../styles/customStyles'

type Props = { route: { params: { id: string } } }

type SelectedPig = {
  fecha: string
  status?: 'success' | 'error'
}

const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/

const VacunaAplicarScreen = ({ route }: Props) => {
  const { id: vacunaId } = route.params

  const { data: vacuna, isLoading: lVacuna, isError: eVacuna } =
    useGetVacunaByIdQuery(vacunaId)

  const { data: pigs, isLoading: lPigs, isError: ePigs } =
    useGetAllPigsArrayQuery({ limit: 1000 })

  const [vacunarPig, { isLoading: lVacunar }] =
    useVacunarPigMutation()

  const [useGlobalDate, setUseGlobalDate] = useState(true)
  const [globalDate, setGlobalDate] = useState('')

  const [selected, setSelected] =
    useState<Record<string, SelectedPig>>({})

  if (eVacuna || ePigs) return <ErrorScreen />
  if (lVacuna || lPigs) return <LoadingScreen />

  const allSelected = useMemo(
    () =>
      pigs?.length > 0 &&
      Object.keys(selected).length === pigs?.length,
    [selected, pigs]
  )

  const validarFecha = (value: string) => {
    if (!FECHA_REGEX.test(value)) return false
    const d = new Date(value.replace(' ', 'T'))
    return !isNaN(d.getTime())
  }

  const togglePig = (pigId: string) => {
    setSelected(prev => {
      const copy = { ...prev }
      if (copy[pigId]) delete copy[pigId]
      else copy[pigId] = { fecha: globalDate }
      return copy
    })
  }

  const toggleAll = () => {
    if (allSelected) {
      setSelected({})
    } else {
      const all: Record<string, SelectedPig> = {}
      pigs?.forEach(p => {
        all[p._id] = { fecha: globalDate }
      })
      setSelected(all)
    }
  }

  const aplicarVacunas = async () => {
    if (useGlobalDate && !validarFecha(globalDate)) {
      Alert.alert(
        'Fecha inválida',
        'Usá el formato YYYY-MM-DD HH:mm'
      )
      return
    }

    try {
      await Promise.all(
        Object.entries(selected).map(async ([pigId, v]) => {
          const fechaStr = useGlobalDate
            ? globalDate
            : v.fecha

          if (!validarFecha(fechaStr)) {
            throw new Error('Fecha inválida')
          }

          const fechaISO = new Date(
            fechaStr.replace(' ', 'T')
          ).toISOString()

          await vacunarPig({
            pigId,
            vacunaId,
            fechaVacunacion: fechaISO
          }).unwrap()

          setSelected(prev => ({
            ...prev,
            [pigId]: { ...prev[pigId], status: 'success' }
          }))
        })
      )

      Alert.alert('Listo', 'Vacunación completada')
    } catch (e) {
      Alert.alert(
        'Error',
        'Algunas vacunas no pudieron aplicarse'
      )
    }
  }

  return (
    <Container>
      <Text style={customStyles.titleText}>
        Vacunar múltiples cerdas
      </Text>

      <Text style={styles.subtitle}>
        Vacuna: {vacuna?.nombre}
      </Text>

      {/* Fecha global */}
      <Text style={styles.label}>
        Fecha y hora global
      </Text>
      <TextInput
        placeholder="2026-02-05 14:30"
        value={globalDate}
        onChangeText={setGlobalDate}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => setUseGlobalDate(!useGlobalDate)}
        style={styles.toggle}
      >
        <Text>
          {useGlobalDate
            ? 'Usando fecha global'
            : 'Usar fecha individual'}
        </Text>
      </TouchableOpacity>

      {/* Select all */}
      <TouchableOpacity
        style={styles.selectAll}
        onPress={toggleAll}
      >
        <Text style={styles.selectAllText}>
          {allSelected
            ? '❌ Deseleccionar todas'
            : '✅ Seleccionar todas'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={pigs}
        keyExtractor={p => p._id}
        renderItem={({ item }) => {
          const s = selected[item._id]

          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => togglePig(item._id)}
              >
                <Text style={styles.pigName}>
                  {item.nroCaravana ||
                    `Cerda ${item.nroCaravana}`}
                </Text>

                <Text>
                  {s?.status === 'success' && '🟢'}
                  {!s && '⬜️'}
                  {s && !s.status && '✅'}
                </Text>
              </TouchableOpacity>

              {s && !useGlobalDate && (
                <TextInput
                  placeholder="YYYY-MM-DD HH:mm"
                  value={s.fecha}
                  onChangeText={txt =>
                    setSelected(prev => ({
                      ...prev,
                      [item._id]: {
                        ...prev[item._id],
                        fecha: txt
                      }
                    }))
                  }
                  style={styles.input}
                />
              )}
            </View>
          )
        }}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (!Object.keys(selected).length ||
            lVacunar) && { opacity: 0.5 }
        ]}
        disabled={
          !Object.keys(selected).length || lVacunar
        }
        onPress={aplicarVacunas}
      >
        <Text style={styles.buttonText}>
          Aplicar vacuna (
          {Object.keys(selected).length})
        </Text>
      </TouchableOpacity>
    </Container>
  )
}

export default VacunaAplicarScreen

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginVertical: 6
  },
  toggle: {
    marginVertical: 10
  },
  selectAll: {
    marginVertical: 10
  },
  selectAllText: {
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  },
  pigName: {
    fontSize: 16
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
