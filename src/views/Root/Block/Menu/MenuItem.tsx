import { settings } from "@/config";
import { Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const { mainColorText, dangerColor, blueColor } = settings.styles;

type Props = {
  item: any;
  last: boolean;
  active: boolean;
};

const MenuItem = (props: Props) => {
  const { item, last, active } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={item.navigate}
      style={[
        styles.menubox,
        last && { marginBottom: 0 },
        active && { backgroundColor: blueColor },
      ]}
    >
      <View style={styles.menuicon}>{item.svg}</View>
      <Text
        style={[
          styles.menutext,
          active && {
            color: "#fff",
            fontFamily: "SFProDisplay-Semibold",
            opacity: 1,
          },
        ]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menubox: {
    alignItems: "center",
    padding: 10,
  },
  menuicon: {},
  menutext: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    opacity: 0.6,
  },
});

export default MenuItem;
