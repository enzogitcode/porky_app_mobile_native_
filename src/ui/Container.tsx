import { Platform, SafeAreaViewBase, StatusBar, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface Container {
    children:React.ReactNode
    darkMode?:boolean
    containerStyle?:StyleProp<ViewStyle>
    darkModeContainerStyle?:StyleProp<ViewStyle>
    lightModeContainerStyle?:StyleProp<ViewStyle>
}

const Container:React.FC<Container> = ({children, darkMode, containerStyle, darkModeContainerStyle, lightModeContainerStyle}) => {
  return (
    <View style={[styles.container, containerStyle, darkMode ? darkModeContainerStyle:lightModeContainerStyle]}>
        {children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:Platform.OS === 'android' ? StatusBar.currentHeight:0,
        backgroundColor: '#f3e8e2'
    }
})