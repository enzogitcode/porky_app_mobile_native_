import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../ui/Container'
import Card from '../../ui/Card'
import { useGetAllVacunasQuery } from '../../redux/features/vacunaSlice'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'

const VacunasListScreen = () => {

  const {data, isLoading, isError} = useGetAllVacunasQuery()

  
  if (isError) return <ErrorScreen />
  if (isLoading) return <LoadingScreen/>
  return (
    <Container>
      <Text>VacunasListScreen</Text>
      {/* <FlatList 
      renderItem={<Card title={data?}></Card>}
      /> */}
      <Card title='hola' >
        <View>
          <Text>
          </Text>
          </View>
      </Card>
    </Container>
  )
}

export default VacunasListScreen

const styles = StyleSheet.create({})