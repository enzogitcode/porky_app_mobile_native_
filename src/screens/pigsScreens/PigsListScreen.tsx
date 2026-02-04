import { StyleSheet, Text, Pressable , FlatList} from 'react-native'
import React from 'react'
import Container from '../../ui/Container'
import { useGetAllPigsArrayQuery } from '../../redux/features/pigSlice'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import { customStyles } from '../../styles/customStyles'
import { StackActions, useNavigation } from '@react-navigation/native'
import PigCard from './PigCard'

const PigsListScreen = () => {
  const navigation = useNavigation()
  const {data, isLoading, isError} = useGetAllPigsArrayQuery({limit:1000})

  if (isError) return <ErrorScreen />
  if (isLoading) return <LoadingScreen />
  if (!isError||!isLoading)
  return (
    <Container>
      <Pressable style={customStyles.goBackButton} onPress={() => navigation.dispatch(StackActions.popToTop())}>
      
              <Text style={customStyles.goBackButtonText}>Ir a cerdos</Text>
              </Pressable>
        <Text style={customStyles.titleText}>Lista de Cerdos registrados</Text>
        <FlatList 
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={({item}) => <PigCard {...item}/>}
        />
    </Container>
  )
}

export default PigsListScreen

const styles = StyleSheet.create({})