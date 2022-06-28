import { settings } from "@/config";
import { ProfileParamList } from "./types";
import {
  EditPatientProfileScreen,
  IntroduceScreen,
  PatientProfileScreen,
  PrivacyPolicyScreen,
  MenuScreen,
  RegularProblemsScreen,
  ServiceAccountScreen,
  TermOfMedicalScreen,
  TermOfUseScreen,
  MedicalStoryScreen,
  AddMedicalStoryScreen,
  AddSurgeryMedicalStoryScreen,
  HospitalCodeScreen,
  ImageListScreen,
  TestResultScreen,
  VaccinationScreen,
  PrescriptionScreen,
  PregnancyScreen,
  AllergyScreen,
  AddAllergyScreen,
  MedicalHistoryScreen,
  FolderScreen,
  MedicalHistoryDetailScreen,
  NewsScreen,
  NewsDetailScreen,
  DiagnoticTypeScreen,
} from "@/views";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        stackAnimation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="PatientProfile" component={PatientProfileScreen} />
      <Stack.Screen
        name="EditPatientProfile"
        component={EditPatientProfileScreen}
      />
      <Stack.Screen name="ServiceAccount" component={ServiceAccountScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermOfUse" component={TermOfUseScreen} />
      <Stack.Screen name="TermOfMedical" component={TermOfMedicalScreen} />
      <Stack.Screen name="RegularProblems" component={RegularProblemsScreen} />
      <Stack.Screen name="Introduct" component={IntroduceScreen} />
      <Stack.Screen name="MedicalStory" component={MedicalStoryScreen} />
      <Stack.Screen name="AddMedicalStory" component={AddMedicalStoryScreen} />
      <Stack.Screen
        name="AddSurgeryMedicalStory"
        component={AddSurgeryMedicalStoryScreen}
      />
      <Stack.Screen name="HospitalCode" component={HospitalCodeScreen} />
      <Stack.Screen name="Folder" component={FolderScreen} />
      <Stack.Screen name="ImageList" component={ImageListScreen} />
      <Stack.Screen name="TestResult" component={TestResultScreen} />
      <Stack.Screen name="Vaccination" component={VaccinationScreen} />
      <Stack.Screen name="Prescription" component={PrescriptionScreen} />
      <Stack.Screen name="Pregnancy" component={PregnancyScreen} />
      <Stack.Screen name="Allergy" component={AllergyScreen} />
      <Stack.Screen name="AddAllergy" component={AddAllergyScreen} />
      <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
      <Stack.Screen
        name="MedicalHistoryDetail"
        component={MedicalHistoryDetailScreen}
      />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
      <Stack.Screen name="DiagnoticType" component={DiagnoticTypeScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
