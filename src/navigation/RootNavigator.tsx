import React from "react";
// screens

import AppNavigator from "./AppNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "../screens/errorLoadingScreens/LoadingScreen";
import ErrorScreen from "../screens/errorLoadingScreens/ErrorScreen";

const Stack = createNativeStackNavigator()

export default function RootNavigation() {
  return (  
    <Stack.Navigator initialRouteName="HomeTabs">
      <AppNavigator/>
      <Stack.Screen name='loadingScreen' component={LoadingScreen} />
      <Stack.Screen name='errorScreen' component={ErrorScreen} />
    </Stack.Navigator>
  );
}
