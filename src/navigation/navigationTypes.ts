import { NavigatorScreenParams } from "@react-navigation/native";
// src/navigation/types.ts

// 👇 Tab principal
export type RootTabParamList = {
  HomeTabs: undefined;
  PigsTabs: NavigatorScreenParams<PigStackParamList>;
  VacunasTabs: NavigatorScreenParams<VacunasStackParamList>;
  ProfileTabs: undefined;
};


// 👇 Home stack
export type HomeStackParamList = {
  Home: undefined;
};

// 👇 Vacunas stack
export type VacunasStackParamList = {
  IndexVacunas: undefined;
  VacunasList:undefined;
  VacunasRegister:undefined;
  VacunaDetails:{id:string};
  VacunaUpdater:{id:string};
  vacunaAplicar:{id:string};
};
// 👇 Pig stack
export type PigStackParamList = {
  IndexPigs:undefined;
  PigRegister:undefined;
  PigsList:undefined
  PigDetails:{id:string}
};
