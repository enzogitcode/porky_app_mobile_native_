import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../ui/Container'
import ButtonCustom from '../ui/ButtonCustom'
import { customStyles } from '../styles/customStyles'

const HomeScreen = () => {
  return (
    <Container>
      <Text style={customStyles.titleText}>Welcome !!</Text>

      <View style={styles.buttonContainer}>
        <ButtonCustom
          title="Buscar un cerdo"
          btnTitleStyle={styles.btnText}
          btnStyle={[ styles.btnStyle, customStyles.menuButton]}
          darkStyle={customStyles.infoButton}
          onPress={() => console.log("apreté el botón")}
        />
        <ButtonCustom
          title="Buscar una vacuna"
          btnTitleStyle={styles.btnText}
          btnStyle={[styles.btnStyle, customStyles.menuButton]}
          darkMode={true}
          onPress={() => console.log("apreté el botón")}
        />
        <ButtonCustom
          title="Ver próximas pariciones"
          btnTitleStyle={customStyles.btnText}
          btnStyle={[styles.btnStyle, customStyles.menuButton]}
          darkMode={true}
          onPress={() => console.log("apreté el botón")}
        />
        
      </View>
    </Container>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    margin: 5,
    gap: 15,
    padding: 10,
    borderBlockColor: '#000',
    borderRadius: '10%',
    borderWidth:4
  },
  btnText: {
    fontSize: 20,
  },
  btnStyle: {
    borderBlockColor:'#000',
    padding: 4,
    borderWidth: 2,
    borderRadius:10,
    margin: 20,
  }
});