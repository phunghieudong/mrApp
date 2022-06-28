import { settings } from "@/config";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const { padding, sectionColor } = settings.styles;

type Props = {
  text: string;
};

const BaseHeadingDate = (props: Props) => {
  const { text } = props;

  return <Text style={styles.date}>{text}</Text>;
};

const styles = StyleSheet.create({
  date: {
    height: 47.3,
    paddingHorizontal: padding,
    paddingTop: 13,
    paddingBottom: 15,
    backgroundColor: sectionColor,
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#525252",
  },
});

export default BaseHeadingDate;
