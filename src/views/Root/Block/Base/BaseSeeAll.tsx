import React from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import Animated from "react-native-reanimated";

const { blueColor, blueColorLight } = settings.styles;

type Props = {
  text: string;
  onPress: undefined | (() => void);
};

const BaseSeeAll = ({ onPress, text }: Props) => {
  return (
    <View style={styles.seeall}>
      <View style={styles.seeallline} />
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.seealltextbox}>
          <Text style={styles.seealltext}>{text}</Text>
          <Icon
            type="Ionicons"
            name="chevron-down-sharp"
            style={styles.seeallicon}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  seeall: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  seeallline: {
    flex: 1,
    height: 1,
    backgroundColor: blueColorLight,
  },
  seealltextbox: {
    alignSelf: "flex-start",
    backgroundColor: blueColorLight,
    paddingTop: 6,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  seealltext: {
    color: blueColor,
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
  },
  seeallicon: {
    color: blueColor,
    fontSize: 16,
    marginLeft: 4,
  },
});

export default BaseSeeAll;
