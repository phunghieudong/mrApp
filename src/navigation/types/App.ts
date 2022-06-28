import { RootStackParamList } from "./RootStack";
import { NavigatorScreenParams } from "@react-navigation/core";
import { AuthParamList } from "./Auth";

export type AppParamList = {
  // nơi khai báo screen và params
  Auth: NavigatorScreenParams<AuthParamList>;
  Home: NavigatorScreenParams<RootStackParamList>;
};
