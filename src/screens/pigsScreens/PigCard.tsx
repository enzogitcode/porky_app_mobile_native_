import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Pig } from '../../types/pigTypes'
import { useNavigation } from '@react-navigation/native'

const PigCard: React.FC<Pig> = (props) => {

  const navigate = useNavigation()


  return (
    <View style={styles.card}>
      <Text style={styles.idText}>ID: {props._id}</Text>
      <Text style={styles.text}>Caravana: {props.nroCaravana}</Text>
      <Text style={styles.text}>Estadio: {props.estadio}</Text>

      {props.enfermedadActual && (
        <Text style={styles.text}>Enfermedad: {props.enfermedadActual}</Text>
      )}
      
      {props.fechaFallecido && (
        <Text style={styles.text}>
          Fecha de Fallecimiento: {props.fechaFallecido.toLocaleString()}
        </Text>
      )}

      <Text style={styles.text}>Lechones Totales: {props.lechonesTotal}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigate.navigate('')}>
        <Text style={styles.buttonText}>Ver más detalles</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PigCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Para Android
  },
  idText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})
