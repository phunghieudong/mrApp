import { settings } from "@/config";
import { Spinner, View } from "native-base";
import React from "react";

const { blueColor } = settings.styles;

const Index = () => {
  return (
    <View
      style={{
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 100,
        padding: 6,
        elevation: 4,
        marginVertical: 12,
      }}
    >
      <Spinner size={24} style={{ height: 24 }} color={blueColor} />
    </View>
  );
};

export default Index;
