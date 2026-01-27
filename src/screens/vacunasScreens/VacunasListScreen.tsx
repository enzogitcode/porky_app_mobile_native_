import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../ui/Container'
import Card from '../../ui/Card'
import { useGetAllVacunasQuery } from '../../redux/features/vacunaSlice'

const VacunasListScreen = () => {

  const {data, isLoading, isError} = useGetAllVacunasQuery()

  
  if (isError) return <View><Text>Hubo un error...</Text></View>
  if (isLoading) return <View><Text>Cargando página</Text></View>
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