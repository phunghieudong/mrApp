import { HeaderRoot, Loading } from "@/components";
import { settings } from "@/config";
import { Container, Content, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { InteractionManager, StyleSheet } from "react-native";

const { mainColorText, padding } = settings.styles;

const RegularProblemsScreen = () => {
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
      <HeaderRoot
        title="Các vấn đề thường gặp"
        hideAvatar={true}
        previous={true}
      />
      <Content contentContainerStyle={styles.body}>
        <View style={styles.box}>
          <Text style={styles.question}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna
          </Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.question}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna
          </Text>
        </View>
        <View style={[styles.box, { borderBottomWidth: 0 }]}>
          <Text style={styles.question}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy
          </Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna
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
    paddingHorizontal: padding,
  },
  box: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0000003a",
  },
  question: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 0.5,
    color: mainColorText,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: mainColorText,
    marginTop: 15,
    fontFamily: "SFProDisplay-Regular",
  },
});

export default RegularProblemsScreen;
