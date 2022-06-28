import React, { FC, useCallback, useState } from "react";
import { View, Text, Container } from "native-base";
import { HeaderRoot } from "@/components";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { settings } from "@/config";
import { PregnancyProps } from "@/navigation/types/Profile";
import { TabView } from "react-native-tab-view";
import { Diary, Schedule } from "../../Block/Pregnancy";

const {
  padding,
  blueColor,
  blueColorLight,
  dangerColor,
  dangerColorLight,
  orangeColor,
  mainColorText,
  borderColor,
} = settings.styles;

const { width: dW } = Dimensions.get("window");

const routes = [
  { key: "first", title: "LỊCH TIÊM CHỦNG" },
  { key: "second", title: "NHẬT KÝ" },
];

const renderScene = (route) => {
  switch (route.key) {
    case "first":
      return <Schedule />;
    case "second":
      return <Diary />;
    default:
      return null;
  }
};

const PregnancyScreen: FC<PregnancyProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const renderItemMenu = useCallback(
    (item: { key: string; title: string }, i: number) => {
      let active = {};
      let firstOrLast = {};
      if (i === 0) firstOrLast = { paddingLeft: padding };
      else if (i === 1) firstOrLast = { paddingRight: padding };
      if (i === index) active = { color: blueColor, opacity: 1 };
      return (
        <TouchableWithoutFeedback onPress={() => setIndex(i)}>
          <View style={styles.menu}>
            <Text style={[styles.menutext, active, firstOrLast]}>
              {item.title}
            </Text>
            <View style={styles.menuline} />
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [index]
  );

  return (
    <Container>
      <HeaderRoot title="THAI KỲ" previous={() => navigation.goBack()} />
      <TabView
        renderTabBar={(props) => (
          <FlatList
            style={styles.menucontainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={props.navigationState.routes}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index: i }) => renderItemMenu(item, i)}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={({ route }) => renderScene(route)}
        onIndexChange={setIndex}
        initialLayout={{ width: dW }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(216, 227, 232)",
  },
  menucontainer: {
    backgroundColor: "#F0F0F0",
    flexGrow: 0,
    flexShrink: 0,
  },
  menu: {
    width: dW * 0.5,
    paddingTop: 15,
    paddingBottom: 17,
  },
  menutext: {
    textAlign: "center",
    fontSize: 12,
    letterSpacing: 1.5,
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Bold",
    paddingLeft: 25,
    paddingRight: 25,
  },
  menuline: {
    position: "absolute",
    left: 0,
    top: 15,
    bottom: 17,
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  body: {
    paddingHorizontal: padding,
  },
  item: {
    marginVertical: 5,
    borderRadius: 4,
    padding: 14,
    backgroundColor: "#fff",
  },
  week: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Semibold",
    color: blueColor,
  },
  detail: {},
  detailtext: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  result: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  note: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
});

export default PregnancyScreen;
