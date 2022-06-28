import { settings } from "@/config";
import { View } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import { TypingAnimation } from "react-native-typing-animation";

const { mainColor } = settings.styles;

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TypingAnimation
        dotColor={mainColor}
        dotMargin={10}
        dotAmplitude={3}
        dotSpeed={0.3}
        dotRadius={6}
        dotX={-6}
      />
    </View>
  );
};

export default Loading;
