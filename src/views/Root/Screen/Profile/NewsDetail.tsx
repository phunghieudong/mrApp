import { HeaderRoot } from "@/components";
import { settings } from "@/config";
import { NewsDetailProps } from "@/navigation/types/profile";
import { Container, Content, Text } from "native-base";
import React, { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Image from "react-native-scalable-image";

const { hostURL } = settings;
const { padding, mainColorText } = settings.styles;
const { width: dW } = Dimensions.get("window");

const NewsDetail: FC<NewsDetailProps> = ({
  navigation,
  route: {
    params: { backgroundImage, content, title, bannerImage },
  },
}) => {
  return (
    <Container>
      <HeaderRoot title="tin tức" previous={() => navigation.goBack()} />
      {bannerImage && (
        <Image width={dW} source={{ uri: hostURL + "/" + bannerImage }} />
      )}
      <Content contentContainerStyle={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {backgroundImage && (
          <Image width={dW} source={{ uri: hostURL + "/" + backgroundImage }} />
        )}
        <Text style={styles.content}>{content}</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(216, 227, 232)",
  },
  body: {
    flexGrow: 1,
  },
  title: {
    marginHorizontal: padding,
    marginVertical: 10,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Medium",
    color: mainColorText,
  },
  img: {
    width: 200,
    minHeight: 90,
  },
  content: {
    marginHorizontal: padding,
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .5)",
  },
});

export default NewsDetail;
