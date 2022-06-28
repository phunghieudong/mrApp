import { TabBar } from "@/components";
import { ContactScreen, NotificationScreen, TutorialScreen } from "@/views";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import { RootStackParamList } from "./types";

const Tab = createBottomTabNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Chat" component={TutorialScreen} />
      <Tab.Screen name="Advise" component={TutorialScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

export default RootStackNavigator;
