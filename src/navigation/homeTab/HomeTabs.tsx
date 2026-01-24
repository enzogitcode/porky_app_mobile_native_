import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';

const HomeStack = createNativeStackNavigator();

function HomeTabsNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
    </HomeStack.Navigator>
  );
}

export default HomeTabsNavigation