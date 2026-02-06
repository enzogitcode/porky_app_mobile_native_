import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useGetVacunaByIdQuery } from '../../redux/features/vacunaSlice'
import { useGetAllPigsArrayQuery, useVacunarPigMutation } from '../../redux/features/pigSlice'
import ButtonCustom from '../../ui/ButtonCustom'
import { customStyles } from '../../styles/customStyles'

type Props = {
  route: {
    params: {
      id: string
    }
  }
}

const VacunaAplicarScreen = ({ route }: Props) => {

  const { id } = route.params

  //TODO: pantalla para aplicar vacuna a un cerdo, se accede desde el detalle de la vacuna, se muestra un formulario con los datos necesarios para aplicar la vacuna (fecha, dosis, etc) y un boton para guardar la aplicacion de la vacuna
  const { data: vacuna, isError: vError, isLoading: vLoading } = useGetVacunaByIdQuery(id)

  //obtener todas las cerdas
  const { data: pigs, isError: pError, isLoading: pLoading } = useGetAllPigsArrayQuery({ limit: 1000 })

  //función para aplicar la vacuna a un cerdo, se accede desde el detalle de la vacuna, se muestra un formulario con los datos necesarios para aplicar la vacuna (fecha, dosis, etc) y un boton para guardar la aplicacion de la vacuna

  const [vacunarCerda, { isError, isLoading, isSuccess }] = useVacunarPigMutation()

  const [showFechaGlobal, setShowFechaGlobal] = useState(false)

  return (
    <View>
      <Text style={customStyles.titleText}>Aplicación de la vacuna: {vacuna?.nombre}</Text>


      <FlatList
        data={pigs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cerdaItem}>
            {!showFechaGlobal && (
              <View>
                <TextInput placeholder='Fecha de aplicación' />
                <ButtonCustom title='Aplicar vacuna' onPress={() => vacunarCerda({ pigId: item._id, vacunaId: id, fechaVacunacion: new Date().toISOString() })} />
              </View>
            )}
            <Text style={customStyles.btnText}>{item.nroCaravana}</Text>
            <Text>Estadio: {item.estadio}</Text>
            <Text>Ubicación: {item.ubicacion}</Text>
            <Text>Descripción: {item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default VacunaAplicarScreen

const styles = StyleSheet.create({
  cerdaItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})