import React from "react";
// screens
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTabsNavigation from "./homeTab/HomeTabs";
import VacunasTabsNavigation from "./vacunasTabs/VacunasTabs";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeTabs">
      <Tab.Screen name="HomeTabs" component={HomeTabsNavigation} />

      <Tab.Screen name="VacunasTabs" component={VacunasTabsNavigation} />
    </Tab.Navigator>
  );
}
