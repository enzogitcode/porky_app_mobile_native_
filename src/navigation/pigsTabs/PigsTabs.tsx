import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PigRegister from "../../screens/pigsScreens/PigRegisterScreen"
import IndexPigsScreen from "../../screens/pigsScreens/IndexPigsScreen"
import PigsListScreen from "../../screens/pigsScreens/PigsListScreen"
import PigDetailsScreen from "../../screens/pigsScreens/PigDetailsScreen"
import PigAplicarVacunas from "../../screens/pigsScreens/PigAplicarVacunasScreen"
import PigAplicarVacunasScreen from "../../screens/pigsScreens/PigAplicarVacunasScreen"
import ParicionesListScreen from "../../screens/pigsScreens/ParicionesListScreen"

const PigsStack = createNativeStackNavigator()

const PigsTabsNavigation = () => {
    return (
        <PigsStack.Navigator initialRouteName="IndexPigs">
            <PigsStack.Screen name="IndexPigs" component={IndexPigsScreen}/>
            <PigsStack.Screen name="PigsList" component={PigsListScreen}/>
            <PigsStack.Screen name="PigRegister" component={PigRegister}/>
            <PigsStack.Screen name="PigDetails">
                {props => <PigDetailsScreen {...props} />}
            </PigsStack.Screen>
            <PigsStack.Screen name="PigAplicarVacunas" component={PigAplicarVacunasScreen}/>
            <PigsStack.Screen name="ParicionesList" component={ParicionesListScreen}/>
        </PigsStack.Navigator>
    )
}

export default PigsTabsNavigation