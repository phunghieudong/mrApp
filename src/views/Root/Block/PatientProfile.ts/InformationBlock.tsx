import React, { ReactElement, useState } from "react";
import { View, Text, ListItem } from "native-base";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import { _format } from "@/utils";

const { mainColorText } = settings.styles;

type ItemProps = {
  label: string;
  value: string;
  svg: ReactElement;
  hide?: boolean;
};

type IProps = {
  item: ItemProps;
  openModal?: () => void;
  closeModal?: () => void;
};

const InformationBlock = ({
  item: { label, svg, value, hide },
  closeModal,
  openModal,
}: IProps) => {
  // const handleSecret = () => {
  //   if (closeModal && openModal) {
  //     openModal();
  //     setSecret(!secret);
  //     closeModal();
  //   }
  // };

  return (
    <View style={styles.block}>
      <View style={styles.left}>{svg}</View>
      <View style={styles.right}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>
          {hide ? _format.hidePassword(value) : value}
        </Text>
        {typeof hide === "boolean" && (
          <TouchableWithoutFeedback onPress={openModal}>
            <View style={styles.hideorshow}>
              <Text style={styles.hideorshowtext}>{hide ? "Hiện" : "Ẩn"}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    marginRight: 20,
  },
  right: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    color: mainColorText,
    opacity: 0.5,
    fontFamily: "SFProDisplay-Regular",
    letterSpacing: 1.5,
  },
  value: {
    fontSize: 18,
    lineHeight: 22,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
  },
  hideorshow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 60,
    backgroundColor: "#E6E6E6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  hideorshowtext: {
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 2,
    letterSpacing: 1.25,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
  },
});

export default InformationBlock;
