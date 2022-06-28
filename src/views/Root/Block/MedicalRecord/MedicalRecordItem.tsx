import { settings } from "@/config";
import { Text, View } from "native-base";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const { mainColorText, borderColor } = settings.styles;

const formatDate = (date: Date) => {
  const current = new Date(date);
  let day: any = current.getDate();
  let month: any = current.getMonth() + 1;
  let year: any = current.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return day + "tháng " + month + ", " + year;
};

type Props = {
  nav: () => void;
  last: true | false;
  name: string;
  address: string;
  date: Date;
};

const MedicalRecordItem = (props: Props) => {
  const { nav, last, name, address, date } = props;

  return (
    <TouchableOpacity
      onPress={nav}
      activeOpacity={1}
      style={[styles.box, last && { borderBottomWidth: 0 }]}
    >
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.img}
          source={require("@/assets/images/hospital.png")}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor,
    flexDirection: "row",
  },
  left: {
    marginRight: 14,
    flex: 1,
  },
  name: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "SFProDisplay-Bold",
    color: mainColorText,
  },
  address: {
    fontSize: 14,
    lineHeight: 18,
    color: "#0000007a",
    fontFamily: "SFProDisplay-Regular",
  },
  date: {
    fontSize: 14,
    lineHeight: 18,
    color: "#0000007a",
    fontFamily: "SFProDisplay-Regular",
  },
  right: {},
  img: {
    width: 68,
    height: 68,
    borderRadius: 6,
  },
});

export default MedicalRecordItem;
