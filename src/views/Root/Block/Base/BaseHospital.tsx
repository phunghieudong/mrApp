import { settings } from "@/config";
import { Icon } from "native-base";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const {
  padding,
  borderColor,
  blueColor,
  mainColorText,
  mainColorLight,
  orangeColor,
  orangeColorLight,
} = settings.styles;

type IProps = {
  hospital: string;
  address: string;
  status?: "checked" | "unchecked";
  vaccineTypeName?: string | null;
  first: boolean;
  totalCurrentInjections?: number | null;
  totalRemainInject?: number | null;
  numberOfDoses?: number | null;
};

const BaseHospital = ({
  hospital,
  address,
  status,
  first,
  vaccineTypeName,
  totalCurrentInjections,
  totalRemainInject,
}: IProps) => {
  return (
    <View style={[styles.block, first && { borderTopWidth: 0 }]}>
      <Text style={styles.hospital}>{hospital}</Text>
      <Text style={styles.address}>{address}</Text>
      {typeof totalCurrentInjections === "number" && (
        <Text style={styles.address}>
          Tổng liều hiện tại đã chích: {totalCurrentInjections}
        </Text>
      )}
      {typeof totalRemainInject === "number" && (
        <Text style={styles.address}>
          Tổng liều còn lại: {totalRemainInject}
        </Text>
      )}
      {status && (
        <View
          style={[
            styles.status,
            status === "checked" && { backgroundColor: mainColorLight },
          ]}
        >
          <Icon
            type="Feather"
            name={status === "checked" ? "check-circle" : "x-circle"}
            style={[
              styles.statusicon,
              status === "checked" && { color: blueColor },
            ]}
          />
          <Text
            style={[
              styles.statustext,
              status === "checked" && { color: blueColor },
            ]}
          >
            {status === "checked" ? "Đã" : "Chưa"} chích vaccine{" "}
            {vaccineTypeName}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    borderTopWidth: 1,
    borderColor,
    marginHorizontal: padding,
    marginTop: 10,
  },
  hospital: {
    color: blueColor,
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Bold",
    textTransform: "uppercase",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  address: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1.5,
    color: mainColorText,
    opacity: 0.5,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginLeft: padding,
    backgroundColor: orangeColorLight,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 9,
    borderRadius: 100,
  },
  statusicon: {
    color: orangeColor,
    fontSize: 18,
    marginRight: 8,
  },
  statustext: {
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    color: orangeColor,
  },
});

export default BaseHospital;
