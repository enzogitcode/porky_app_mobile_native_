import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Paricion } from '../../types/pigTypes'

const ParicionCard:React.FC<Paricion> = (props) => {
  return (
    <View>
      <Text>
        {props._id}
      </Text>
      <Text>
        {props.cantidadLechones}
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

const styles = StyleSheet.create({})