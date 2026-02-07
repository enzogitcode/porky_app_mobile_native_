import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGetPigByIdQuery } from '../../redux/features/pigSlice'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PigStackParamList } from '../../navigation/navigationTypes'
import { customStyles } from '../../styles/customStyles'
import ButtonCustom from '../../ui/ButtonCustom'
import { FlatList } from 'react-native'
import ParicionCard from './ParicionCard'
import { useNavigation } from '@react-navigation/native'

type Props = NativeStackScreenProps<PigStackParamList, 'PigDetails'>

const PigDetailsScreen = ({ route }: Props) => {

  const navigation = useNavigation()

  const { id } = route.params
  const { data, isError, isLoading } = useGetPigByIdQuery(id)

  const [showVacunas, setShowVacunas] = useState(false)
  const [showPariciones, setShowPariciones] = useState(false)

  useEffect(() => {
    console.log(data)
  }, [data]);

  if (isError) return <ErrorScreen />
  if (isLoading) return <LoadingScreen />
  if (!isError || !isLoading)
    return (
      <View style={styles.container}>
        <Text style={customStyles.titleText}>
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
            {data?.estadio !== 'fallecido' && <ButtonCustom btnStyle={customStyles.infoButtonAmber} btnTitleStyle={customStyles.goBackButtonText} title="Aplicar Vacunas" onPress={() => navigation.navigate('PigAplicarVacunas', {id:data?._id})} />}
            <ButtonCustom btnStyle={customStyles.infoButtonAmber} btnTitleStyle={customStyles.goBackButtonText} title="Editar cerdo" />
            {data?.pariciones?.length !== 0 ? 
            <ButtonCustom btnStyle={customStyles.goBackButton} title='Ver pariciones' onPress={() => navigation.navigate('ParicionesList', {id:data?._id})}/>
            : <ButtonCustom title='No hay pariciones aún' />}

            <ButtonCustom btnStyle={customStyles.goBackButton} btnTitleStyle={customStyles.goBackButtonText} title={showVacunas ? 'Ocultar vacunas' : 'Mostrar vacunas'} onPress={() => setShowVacunas(!showVacunas)} />
            {data && showVacunas &&
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data?.vacunasAplicadas}
                renderItem={({ item }) =>
                  <View>
                    <Text>
                    </Text>
                  </View>
                  }
              />
            }



          </View>


        </View>

      </View>
    )
}

export default PigDetailsScreen

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginHorizontal:20,
    alignItems:'center'

  },
  btnContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
    gap: 15
  }
})