import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabsNavigation from "./homeTab/HomeTabs";
import VacunasTabsNavigation from "./vacunasTabs/VacunasTabs";
import PigsTabsNavigation from "./pigsTabs/PigsTabs";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (  
    <Tab.Navigator initialRouteName="HomeTabs">
      
      <Tab.Screen name="HomeTabs" component={HomeTabsNavigation} options={{tabBarIcon:({ color }) => <FontAwesome size={28} name="home" color={color} />}}/>
      <Tab.Screen name="PigsTabs" component={PigsTabsNavigation} options={{tabBarIcon:({color}) => <MaterialCommunityIcons name="pig-variant-outline" size={24} color={color} />}} />
      <Tab.Screen name="VacunasTabs" component={VacunasTabsNavigation} options={{tabBarIcon:({color}) => <MaterialIcons name="vaccines" size={24} color={color} />}} />
    </Tab.Navigator>
  );
}
