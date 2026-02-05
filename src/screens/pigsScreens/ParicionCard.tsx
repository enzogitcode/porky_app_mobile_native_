import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import React from 'react'
import { Paricion } from '../../types/pigTypes'
import { customStyles } from '../../styles/customStyles'

const ParicionCard: React.FC<Paricion> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={customStyles.titleText}>
         {props._id}
      </Text>
      <Text style={customStyles.textDetails}>
        Cantidad de lechones: {props.cantidadLechones}
      </Text>
      <Text>
        {props?.fechaParicion?.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </Text>
      <Text>
        {props.descripcion}
      </Text>
      <Text>
        Fecha de actualización {props?.fechaActualizacion?.toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </Text>

    </View>
  )
}

export default ParicionCard

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginHorizontal: 20,
    alignItems: 'center'

  }
})