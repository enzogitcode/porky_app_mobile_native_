import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'

// screens
import HomeScreen from '../screens/HomeScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      
      
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  )
}
