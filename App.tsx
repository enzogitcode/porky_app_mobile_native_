import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "./src/ui/Container";
import ButtonCustom from "./src/ui/ButtonCustom";
import {customStyles} from "./src/styles/customStyles";

const App = () => {


  return (
    <Container>
      <Text style={styles.btnText}>Welcome !!</Text>

      <View style={styles.buttonContainer}>
        <ButtonCustom
          title="Buscar un cerdo"
          btnTitleStyle={styles.btnText}
          btnStyle={[ styles.btnStyle]}
          darkStyle={customStyles.infoButton}
          onPress={() => console.log("apreté el botón")}
        />
        <ButtonCustom
          title="Ver todos los cerdos"
          btnTitleStyle={styles.btnText}
          btnStyle={styles.btnStyle}
          darkMode={true}
          onPress={() => console.log("apreté el botón")}
        />
        <ButtonCustom
          title="Agregar un cerdo"
          btnTitleStyle={styles.btnText}
          btnStyle={styles.btnStyle}
          darkMode={true}
          onPress={() => console.log("apreté el botón")}
        />

        
      </View>
    </Container>
  );
};

export default App;

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
    fontSize: 30
  },
  btnStyle: {
    borderBlockColor:'#000',
    padding: 4,
    borderWidth: 2,
    borderRadius:10,
    margin: 20
  }
});
