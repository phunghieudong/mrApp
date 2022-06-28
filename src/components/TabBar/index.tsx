import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Footer, FooterTab } from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import TabButton from "./TabButton";

const { height: dH } = Dimensions.get("window");

const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const TabbarLabelIconSettings = {
    ["Home"]: {
      label: "Trang chủ",
      type: "SimpleLineIcons",
      icon: "home",
    },
    ["Chat"]: {
      label: "Chat",
      type: "Ionicons",
      icon: "chatbubble-ellipses-outline",
    },
    ["Advise"]: {
      label: "Tư vấn",
      type: "Feather",
      icon: "video",
    },
    ["Contact"]: { label: "Liên hệ", type: "Feather", icon: "phone" },
  };

  return (
    <Footer style={styles.footer}>
      <FooterTab style={styles.footertab}>
        {state.routes.map((route, index) => {
          const options = TabbarLabelIconSettings[route.name];
          const isFocused = state.index === index;
          if (route.name !== "Profile" && route.name !== "Notification") {
            return (
              <TabButton
                key={route.key}
                {...{ options, navigation, isFocused, route }}
              />
            );
          }
        })}
      </FooterTab>
    </Footer>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: dH * 0.09,
  },
  footertab: {
    backgroundColor: "#fff",
    elevation: 24,
  },
});

export default TabBar;
