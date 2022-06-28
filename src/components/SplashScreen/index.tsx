import { settings } from "@/config";
import { Container } from "native-base";
import React from "react";
import { StatusBar } from "react-native";
import Logo from "../Logo";

const { mainColor } = settings.styles;

const Index = () => {
  return (
    <Container
      style={{
        backgroundColor: mainColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={mainColor} />
      <Logo width={212.174} height={67.254} />
    </Container>
  );
};

export default Index;
