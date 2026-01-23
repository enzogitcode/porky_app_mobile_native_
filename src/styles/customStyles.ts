import { StyleSheet } from "react-native";
import {colors} from "../contants/colors";


export const customStyles = StyleSheet.create({
    menuButton: {
        backgroundColor:colors.rosa,
        outlineColor: colors.cyan,
        outlineWidth:4
    },

    infoButton: {
        backgroundColor: '#0d2bd2ff'
    },
    otroStyle: {
        boxShadow: '40%'
    }
})
