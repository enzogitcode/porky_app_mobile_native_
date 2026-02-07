import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../ui/Container'
import { useGetPigByIdQuery } from '../../redux/features/pigSlice'
import ErrorScreen from '../errorLoadingScreens/ErrorScreen'
import LoadingScreen from '../errorLoadingScreens/LoadingScreen'
import { customStyles } from '../../styles/customStyles'
import ButtonCustom from '../../ui/ButtonCustom'
import { useNavigation } from '@react-navigation/native'

type Props = {
  route: {
    params: {
      id: string
    }
  }
}

const ParicionesListScreen = ({ route }: Props) => {

  const navigation = useNavigation()
  const { id } = route.params

  const { data, isError, isLoading } = useGetPigByIdQuery(id)

  if (isError) return <ErrorScreen />
  if (isLoading) return <LoadingScreen />

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Parición */}
      <Text style={styles.cardTitle}>🌱 Datos de la parición</Text>

      <Text style={styles.label}>
        Cantidad de lechones:{' '}
        <Text style={styles.value}>{item.cantidadLechones}</Text>
      </Text>

      <Text style={styles.label}>
        Descripción:{' '}
        <Text style={styles.value}>{item.descripcion}</Text>
      </Text>

      <Text style={styles.label}>
        Fecha:{' '}
        <Text style={styles.value}>
          {new Date(item.fechaParicion).toLocaleDateString()}
        </Text>
      </Text>

      <Text style={styles.label}>
        Hora:{' '}
        <Text style={styles.value}>
          {new Date(item.fechaParicion).toLocaleTimeString()}
        </Text>
      </Text>

      {/* Servicio */}
      <View style={styles.serviceBox}>
        <Text style={styles.serviceTitle}>🐷 Datos del servicio</Text>

        <Text style={styles.label}>
          Tipo:{' '}
          <Text style={styles.value}>{item?.servicio?.tipo}</Text>
        </Text>

        <Text style={styles.label}>
          Fecha:{' '}
          <Text style={styles.value}>
            {new Date(item?.servicio?.fecha).toLocaleDateString()}
          </Text>
        </Text>

        {item?.servicio?.proveedorDosis && (
          <Text style={styles.label}>
            Proveedor:{' '}
            <Text style={styles.value}>
              {item.servicio.proveedorDosis}
            </Text>
          </Text>
        )}

        {item?.servicio?.macho && (
          <Text style={styles.label}>
            Macho:{' '}
            <Text style={styles.value}>{item.servicio.macho}</Text>
          </Text>
        )}
<ButtonCustom btnStyle={customStyles.goBackButton} btnTitleStyle={customStyles.textDetails} onPress={() => navigation.navigate('UpdateParicion', {id:data?._id})} title='Editar parición'/>
      </View>
    </View>
  )

  return (
    <Container>
      <Text style={customStyles.titleText}>
        Pariciones de la cerda: {data?.nroCaravana}
      </Text>

      <FlatList
        data={data?.pariciones}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </Container>
  )
}

export default ParicionesListScreen

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#F5F7F2', // fondo tipo papel
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#4CAF50', // verde campo
    elevation: 3
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8
  },
  label: {
    fontSize: 14,
    color: '#5D4037', // marrón tierra
    marginBottom: 4
  },
  value: {
    fontWeight: '600',
    color: '#3E2723'
  },
  serviceBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#C8E6C9'
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#388E3C',
    marginBottom: 6
  }
})
