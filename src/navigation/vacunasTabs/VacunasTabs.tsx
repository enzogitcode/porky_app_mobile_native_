import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexVacunasScreen from "../../screens/vacunasScreens/IndexVacunasScreen";
import VacunasListScreen from "../../screens/vacunasScreens/VacunasListScreen";

const VacunasStack = createNativeStackNavigator()

const VacunasTabsNavigation = () => {
     return (
    <VacunasStack.Navigator>
      <VacunasStack.Screen name="IndexVacunas" component={IndexVacunasScreen}/>
      <VacunasStack.Screen name="VacunasList" component={VacunasListScreen}/>
      
    </VacunasStack.Navigator>
  );
}

export default VacunasTabsNavigation