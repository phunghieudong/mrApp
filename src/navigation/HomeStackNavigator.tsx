import { settings } from "@/config";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";
import { HomeParamList } from "./types";
import { useAppSelector } from "@/store/hook";
import {
  CalendarInfoScreen,
  CalendarScreen,
  CheckScheduleScreen,
  ChooseARoomScreen,
  CreateNewPasswordScreen,
  DashboardScreen,
  DoctorPickerScreen,
  ExaminationCalendarScreen,
  HospitalPickerScreen,
  NormalScheduleScreen,
  PaymentScreen,
  SpecialScheduleScreen,
  TimePickerScreen,
} from "@/views";

const { animationIOS, android } = settings;
const config: any = animationIOS;
const Stack = createNativeStackNavigator<HomeParamList>();

const HomeStackNavigator = () => {
  const currentRoute = useAppSelector((state) => state.route.root);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        stackAnimation: "slide_from_right",
        headerTranslucent: false,
      }}
      initialRouteName={currentRoute}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
      />
      <Stack.Screen name="SpecialSchedule" component={SpecialScheduleScreen} />
      <Stack.Screen name="NormalSchedule" component={NormalScheduleScreen} />
      <Stack.Screen name="CheckSchedule" component={CheckScheduleScreen} />
      <Stack.Screen name="CalendarInfo" component={CalendarInfoScreen} />
      <Stack.Screen name="HospitalPicker" component={HospitalPickerScreen} />
      <Stack.Screen name="DoctorPicker" component={DoctorPickerScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="ChooseARoom" component={ChooseARoomScreen} />
      <Stack.Screen name="TimePicker" component={TimePickerScreen} />
      <Stack.Screen
        name="ExaminationCalendar"
        component={ExaminationCalendarScreen}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
