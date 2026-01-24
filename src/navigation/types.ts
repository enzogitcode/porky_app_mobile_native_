// src/navigation/types.ts

// 👇 Tab principal
export type RootTabParamList = {
  HomeTabs: undefined;
  PigsTabs:undefined;
  VacunasTabs: undefined;
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
  VacunaDetails:{id:string};
  VacunasRegister:undefined;
};
