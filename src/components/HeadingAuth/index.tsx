import { settings } from "@/config";
import { Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const { mainColorText } = settings.styles;

type Props = {
  text: string;
  align?: "left" | "right";
};

const HeadingAuth = (props: Props) => {
  const { text, align } = props;

  return (
    <Text style={[styles.heading, align && { textAlign: align }]}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 35,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Light",
    color: mainColorText,
    textAlign: "center",
  },
});

export default HeadingAuth;
