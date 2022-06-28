import React from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";

const { orangeColor, orangeColorLight, mainColorText } = settings.styles;

type Props = {
  text: string;
  btn?: { onPress: () => void; btnText: string };
};

const BaseHeading = (props: Props) => {
  const { text, btn } = props;

  return (
    <View style={styles.block}>
      <Text style={styles.text}>{text}</Text>
      {btn && (
        <TouchableWithoutFeedback onPress={btn.onPress}>
          <View style={styles.btn}>
            <Icon
              type="MaterialCommunityIcons"
              name="pencil"
              style={styles.btnicon}
            />
            <Text style={styles.btntext}>{btn.btnText}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: orangeColorLight,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 100,
  },
  btnicon: {
    color: orangeColor,
    fontSize: 14,
    marginRight: 4,
  },
  btntext: {
    color: orangeColor,
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
  },
});

export default BaseHeading;
