import React from "react";
import { AuthParamList } from "./types";
import {
  ConfirmOTPScreen,
  ForgotPasswordScreen,
  InformationScreen,
  RegisterScreen,
  SignInScreen,
} from "@/views";
import { settings } from "@/config";
import { useAppSelector } from "@/store/hook";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const { animationIOS, android } = settings;
const config: any = animationIOS;
const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  const currentRoute = useAppSelector((state) => state.route.auth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        stackAnimation: "slide_from_right",
        headerTranslucent: false,
      }}
      initialRouteName={currentRoute}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ConfirmOTP" component={ConfirmOTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
