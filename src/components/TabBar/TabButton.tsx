import { settings } from "@/config";
import { Button, Icon, Text, Toast, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const { mainColor } = settings.styles;

const TabButton = (props) => {
  const { options, navigation, route, isFocused } = props;

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Button
      onPress={
        route.name === "Home" || route.name === "Notification"
          ? onPress
          : () => Toast.show({ text: "Tính năng còn đang phát triển" })
      }
      style={styles.button}
    >
      <Icon
        type={options.type}
        name={options.icon}
        style={[styles.icon, isFocused && { color: mainColor }]}
      />
      <Text style={[styles.text, isFocused && { color: mainColor }]}>
        {options.label}
      </Text>
      {isFocused && <View style={styles.active} />}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    height: "100%",
  },
  icon: {
    fontSize: 20,
    color: "#898FB6",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: "SFProDisplay-Bold",
    color: "#898FB6",
  },
  active: {
    position: "absolute",
    top: 0,
    left: "22%",
    right: "22%",
    height: 3,
    backgroundColor: mainColor,
  },
});

export default TabButton;
