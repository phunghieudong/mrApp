import { settings } from "@/config";
import { Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet } from "react-native";

const { mainColorText, borderColor } = settings.styles;

type Props = {
  last: true | false;
  date: Date;
  name: string;
  address: string;
};

const VaccinationCalendarItem = (props: Props) => {
  const { last, date, name, address } = props;

  return (
    <View
      style={[
        styles.box,
        styles.spacebetween,
        last && { borderBottomWidth: 0 },
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.date}>{"25 tháng 6, năm 2021"}</Text>
        <Text style={styles.common}>{name}</Text>
        <Text style={styles.common}>{address}</Text>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.img}
          source={require("@/assets/images/hospital.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacebetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor,
  },
  left: {
    flex: 1,
    marginRight: 14,
  },
  right: {},
  date: {
    fontSize: 18,
    lineHeight: 22,
    color: mainColorText,
    fontFamily: "SFProDisplay-Bold",
  },
  common: {
    fontSize: 14,
    lineHeight: 18,
    color: "#0000007a",
    fontFamily: "SFProDisplay-Regular",
  },
  img: {
    width: 68,
    height: 68,
    borderRadius: 6,
  },
});

export default VaccinationCalendarItem;
