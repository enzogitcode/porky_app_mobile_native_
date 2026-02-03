import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexVacunasScreen from "../../screens/vacunasScreens/IndexVacunasScreen";
import VacunasListScreen from "../../screens/vacunasScreens/VacunasListScreen";
import VacunasRegister from "../../screens/vacunasScreens/VacunasRegister";
import VacunaUpdaterScreen from "../../screens/vacunasScreens/VacunaUpdaterScreen";

const VacunasStack = createNativeStackNavigator()

const VacunasTabsNavigation = () => {
     return (
    <VacunasStack.Navigator initialRouteName="IndexVacunas">
      <VacunasStack.Screen name="IndexVacunas" component={IndexVacunasScreen}/>
      <VacunasStack.Screen name="VacunasList" component={VacunasListScreen}/>
      <VacunasStack.Screen name="VacunasRegister" component={VacunasRegister}/>
      <VacunasStack.Screen name="VacunaUpdater" component={VacunaUpdaterScreen}/>
    </VacunasStack.Navigator>
  );
}

export default VacunasTabsNavigation