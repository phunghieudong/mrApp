import "react-native-gesture-handler";
import AppNavigator from "@/navigation/AppNavigator";
import store from "@/store";
import React, { useState } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Root, View } from "native-base";
import { LogBox } from "react-native";
import Dong from "react-native-vector-icons/FontAwesome";
import { Text } from "react-native-svg";

LogBox.ignoreAllLogs();

const fetchFonts = () => {
  return Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    "GoogleSans-Bold": require("@/assets/fonts/GoogleSans-Bold.ttf"),
    "GoogleSans-Regular": require("@/assets/fonts/GoogleSans-Regular.ttf"),
    "SFProDisplay-Bold": require("@/assets/fonts/SFProDisplay-Bold.ttf"),
    "SFProDisplay-Heavy": require("@/assets/fonts/SFProDisplay-Heavy.ttf"),
    "SFProDisplay-Light": require("@/assets/fonts/SFProDisplay-Light.ttf"),
    "SFProDisplay-Medium": require("@/assets/fonts/SFProDisplay-Medium.ttf"),
    "SFProDisplay-Regular": require("@/assets/fonts/SFProDisplay-Regular.ttf"),
    "SFProDisplay-Semibold": require("@/assets/fonts/SFProDisplay-Semibold.ttf"),
  });
};

const App = (props) => {
  const [ready, setReady] = useState(false);

  if (!ready) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setReady(true)}
        onError={() => console.log("ERROR FETCH FONTS")}
      />
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <AppNavigator {...props} />
      </Root>

      {/* <AppNavigator {...props} /> */}
    </Provider>
  );
};

export default App;
