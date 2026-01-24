import { createNativeStackNavigator } from "@react-navigation/native-stack"
import PigRegister from "../../screens/pigsScreens/PigRegister"
import IndexPigsScreen from "../../screens/pigsScreens/IndexPigsScreen"

const PigsStack = createNativeStackNavigator()

const PigsTabsNavigation = () => {
    return (
        <PigsStack.Navigator initialRouteName="IndexPigs">
            <PigsStack.Screen name="IndexPigs" component={IndexPigsScreen}/>
            <PigsStack.Screen name="PigsRegister" component={PigRegister}/>
        </PigsStack.Navigator>
    )
}

export default PigsTabsNavigation