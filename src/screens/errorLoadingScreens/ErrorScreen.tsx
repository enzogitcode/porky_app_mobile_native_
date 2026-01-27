import { StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import Container from '../../ui/Container'
import { customStyles } from '../../styles/customStyles'

const ErrorScreen = () => {
  return (
    <Container>
      <Text style={customStyles.btnStyle}>Hubo un error</Text>
      <Image   style={{ width: 200, height: 200 }}
 source={require('../../../assets/imgs/pigLoading.jpg')} />
    </Container>
  )
}

export default ErrorScreen

const styles = StyleSheet.create({})