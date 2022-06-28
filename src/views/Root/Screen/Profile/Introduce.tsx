import { HeaderRoot, Loading } from "@/components";
import { settings } from "@/config";
import { Container, Content, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  InteractionManager,
  StyleSheet,
} from "react-native";

const { height: dH } = Dimensions.get("screen");
const { mainColorText, padding } = settings.styles;

const IntroduceScreen = () => {
  // interaction
  const [ready, setReady] = useState(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return <Loading />;
  }

  return (
    <Container style={styles.container}>
      <HeaderRoot title="Giới thiệu" previous={true} />
      <Content contentContainerStyle={styles.body}>
        <Image
          source={require("@/assets/images/introduce.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.inner}>
          <Text style={styles.title}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd
          </Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd
          </Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: dH * 0.3,
  },
  inner: {
    padding: padding,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: 0.5,
    color: mainColorText,
    fontFamily: "SFProDisplay-Bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    marginBottom: 4,
  },
});

export default IntroduceScreen;
