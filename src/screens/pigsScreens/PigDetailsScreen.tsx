import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetPigByIdQuery } from '../../redux/features/pigSlice'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PigStackParamList } from '../../navigation/navigationTypes'
import Container from '../../ui/Container'
import { customStyles } from '../../styles/customStyles'
import ButtonCustom from '../../ui/ButtonCustom'
import { FlatList } from 'react-native'

type Props = NativeStackScreenProps<PigStackParamList, 'PigDetails'>

const PigDetailsScreen = ({ route }: Props) => {


  const { id } = route.params
  const { data, isError, isLoading } = useGetPigByIdQuery(id)

  const [showVacunas, setShowVacunas] = useState(false)
  const [showPariciones, setShowPariciones] = useState(false)

  useEffect(() => {
    console.log(data)
  }, [id]);

  if (isError) return <ErrorScreen />
  if (isLoading) return <LoadingScreen />
  if (!isError || !isLoading)
    return (
      <View style={styles.container}>
        <Text>
          Detalles del cerdo: Caravana N° {data?.nroCaravana}
        </Text>
        <View>
          <Text style={customStyles.textDetails}>ID: {data?._id}</Text>
          <Text style={customStyles.textDetails}>Estadio: {data?.estadio}</Text>
          <Text style={customStyles.textDetails}>Ubicación: {data?.ubicacion}</Text>
          <Text style={customStyles.textDetails}>Descripción: {data?.descripcion}</Text>
          {/* <Text style={customStyles.textDetails}>Fecha de actualización: {new Date(data?.updatedAt).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text> */}
          <Text style={customStyles.textDetails}>Lechones Totales: {data?.lechonesTotal}</Text>

          {data?.estadio === 'descarte' && (<Text style={customStyles.textDetails}>
            Enfermedad Actual: {data.enfermedadActual}
          </Text>)}

          <View style={styles.btnContainer}>
            <ButtonCustom btnStyle={customStyles.goBackButton} btnTitleStyle={customStyles.goBackButtonText} title={showPariciones ? 'Ocultar pariciones' : 'Mostrar pariciones'} onPress={() => setShowPariciones(!showPariciones)} />

            <FlatList
            data={data?.pariciones}
            keyExtractor={(paricion) => paricion._id}
            renderItem={({item})=> <View>{item._id}</View>}
            />

            <ButtonCustom btnStyle={customStyles.goBackButton} btnTitleStyle={customStyles.goBackButtonText} title={showVacunas ? 'Ocultar vacunas' : 'Mostrar vacunas'} onPress={() => setShowVacunas(!showVacunas)} />

          </View>


        </View>

      </View>
    )
}

export default PigDetailsScreen

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  btnContainer: {
    marginVertical: 10,
    gap: 15
  }
})