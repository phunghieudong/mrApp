import { settings } from "@/config";
import { Spinner, View } from "native-base";
import React, { FC } from "react";
import { Modal } from "react-native";

const { blueColor } = settings.styles;

type IProps = {
  visible: boolean;
};

const Index: FC<IProps> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, .5)",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
        >
          <Spinner color={blueColor} size={50} style={{ height: 80 }} />
        </View>
      </View>
    </Modal>
  );
};

export default Index;
