import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PigRegister from "../../screens/pigsScreens/PigRegister"
import IndexPigsScreen from "../../screens/pigsScreens/IndexPigsScreen"
import PigsListScreen from "../../screens/pigsScreens/PigsListScreen"
import PigDetailsScreen from "../../screens/pigsScreens/PigDetailsScreen"

const PigsStack = createNativeStackNavigator()

const PigsTabsNavigation = () => {
    return (
        <PigsStack.Navigator initialRouteName="IndexPigs">
            <PigsStack.Screen name="IndexPigs" component={IndexPigsScreen}/>
            <PigsStack.Screen name="PigsList" component={PigsListScreen}/>
            <PigsStack.Screen name="PigRegister" component={PigRegister}/>
            <PigsStack.Screen name="PigDetails" component={PigDetailsScreen}/>
        </PigsStack.Navigator>
    )
}

export default PigsTabsNavigation