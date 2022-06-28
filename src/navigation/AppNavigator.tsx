import useCheckLogout from "@/libs/rxjs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  fetchLocalUser,
  fetchPassword,
  getPassword,
  logout,
} from "@/store/reducers/UserSlice";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Host } from "react-native-portalize";
import AuthNavigator from "./AuthNavigator";
import RootStackNavigator from "./RootStackNavigator";
import { AppParamList } from "./types";
import * as Splash from "expo-splash-screen";
import { UserData } from "@/types/User";
import { SplashScreen } from "@/components";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const Stack = createNativeStackNavigator<AppParamList>();

const AppNavigator = () => {
  // authentication
  const user = useAppSelector((state) => state.user.current) as UserData;
  const isAuth = !user.Phone;
  const dispatch = useAppDispatch();

  // splash screen
  const [appIsReady, setAppIsReady] = useState(false);

  // check expired token
  const [login, setLogin] = useState(true);

  const { eventManager } = useCheckLogout((data) => {
    setLogin(data.login);
  });

  useEffect(() => {
    if (!login) {
      Alert.alert("Thông báo", "Phiên đăng nhập đã hết hạn", [
        {
          text: "Đồng ý",
          onPress: async () => {
            await dispatch(logout());
            await dispatch(getPassword(""));
          },
        },
      ]);
      eventManager.unsubscribe();
    }
  }, [login]);

  // fetch local user
  useEffect(() => {
    (async () => {
      try {
        await Splash.preventAutoHideAsync();
        await dispatch(fetchLocalUser());
        await dispatch(fetchPassword());
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    })();
  }, [dispatch]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await Splash.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuth ? (
            <Stack.Screen name="Auth" component={RootStackNavigator} />
          ) : (
            <Stack.Screen name="Home" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default AppNavigator;
