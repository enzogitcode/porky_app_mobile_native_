import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";


export const customStyles = StyleSheet.create({
    titleText:{
        fontSize:30,
        textAlign:'center'
    },
    menuButton: {
        backgroundColor: colors.rosa,
        outlineColor: colors.cyan,
        outlineWidth: 4,
    },

    infoButton: {
        backgroundColor: '#0d2bd2ff'
    },
    otroStyle: {
        boxShadow: '40%'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 5,
        gap: 15,
        padding: 10,
        borderBlockColor: '#000',
        borderRadius: '10%',
        borderWidth: 4
    },
    btnText: {
        fontSize: 30,
    },
    btnStyle: {
        borderBlockColor: '#000',
        padding: 4,
        borderWidth: 2,
        borderRadius: 10,
        margin: 20,
    },
    goBackButton: {
        padding: 10,
        borderRadius: 14,
        outlineWidth:2,
        outlineColor: colors.cyan,
        backgroundColor:colors.rosa
    },
    goBackButtonText: {
        textAlign:'center',
        fontSize:16
    },
    textDetails: {
        fontSize:18,
        alignSelf:'center',
        textAlign:'center',
        marginVertical:4
    },
    deleteButton: {
        backgroundColor: colors.rojo,
        padding: 8,
        borderRadius: 14,
        outlineWidth:2,
        outlineColor: colors.cyan,
    },
    updateButton: {
        backgroundColor: colors.azulActualizar,
        padding: 8,
        borderRadius: 14,
        outlineWidth:2,
        outlineColor: colors.cyan,
    },
    infoButtonAmber: {
        backgroundColor: colors.amber,
        padding: 8,
        borderRadius: 14,
        outlineWidth:2,
        outlineColor: colors.cyan,
    }
})
