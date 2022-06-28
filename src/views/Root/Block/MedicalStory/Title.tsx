import { settings } from "@/config";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { Icon } from "native-base";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";

const { blueColor, padding } = settings.styles;

type IProps = {
  title: string;
  handleShow: (id: number, status: number) => void;
  item: DiagnosticData;
  status?: number;
};

const Title = ({ title, handleShow, item, status }: IProps) => {
  const rotate = useRef(new Animated.Value(0)).current;

  const handleState = () => {
    if (status === 0 || !status) {
      handleShow(item.Id, 1);
    } else {
      handleShow(item.Id, 0);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleState}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: blueColor,
          paddingHorizontal: padding,
          paddingTop: 13,
          paddingBottom: 15,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 14,
            lineHeight: 30,
            color: "#fff",
            fontFamily: "SFProDisplay-Bold",
          }}
        >
          {title}
        </Text>
        <Icon
          type="Ionicons"
          name={!status || status === 0 ? "chevron-down" : "chevron-up"}
          style={{ fontSize: 18, color: "#fff" }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Title;
