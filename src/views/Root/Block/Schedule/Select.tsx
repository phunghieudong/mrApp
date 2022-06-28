import { settings } from "@/config";
import { Icon, Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

const { mainColor, mainColorText, dangerColor, borderColor, placeholderColor } =
  settings.styles;

type Props = {
  nav?: () => void;
  selected: string;
  placeholder: string;
  next: true | false;
};

const Select = (props: Props) => {
  const { selected, next, placeholder, nav } = props;

  const iconColor = next && !selected.length ? dangerColor : "#a3a9c3";
  const labelColor =
    next && !selected.length ? dangerColor : "rgba(0, 0, 0, .5)";

  return (
    <TouchableWithoutFeedback onPress={nav}>
      <View style={styles.box}>
        <Text
          style={[
            styles.text,
            { top: selected.length > 0 ? -13 : 15, color: labelColor },
          ]}
        >
          {placeholder}
        </Text>
        {selected.length > 0 && <Text style={styles.selected}>{selected}</Text>}
        <View style={styles.control}>
          <Icon
            type="Ionicons"
            name="caret-up-sharp"
            style={[styles.next, { top: 3, color: iconColor }]}
          />
          <Icon
            type="Ionicons"
            name="caret-down-sharp"
            style={[styles.next, { bottom: 3, color: iconColor }]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor,
    height: 50,
    paddingTop: 3,
    paddingBottom: 7,
    top: 8,
    marginTop: 26,
  },
  next: {
    fontSize: 12,
    color: "#a3a9c3",
  },
  text: {
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .5)",
    position: "absolute",
  },
  selected: {
    fontSize: 18,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  control: {
    position: "absolute",
    right: 0,
    bottom: 12,
  },
});

export default Select;
