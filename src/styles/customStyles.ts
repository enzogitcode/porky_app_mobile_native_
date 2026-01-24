import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";


export const customStyles = StyleSheet.create({
    menuButton: {
        backgroundColor: colors.rosa,
        outlineColor: colors.cyan,
        outlineWidth: 4
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
        fontSize: 30
    },
    btnStyle: {
        borderBlockColor: '#000',
        padding: 4,
        borderWidth: 2,
        borderRadius: 10,
        margin: 20,
    }
})
