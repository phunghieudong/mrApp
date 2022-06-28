import { HeaderRoot } from "@/components";
import { Container } from "native-base";
import React, { FC, useState } from "react";
import { View, Text } from "native-base";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { NoteList, Diagnosis, Information } from "../../Block/MedicalStory";
import { MedicalStoryProps } from "@/navigation/types/Profile";
import { _format } from "@/utils";
import { TabView } from "react-native-tab-view";
import { settings } from "@/config";

const { width: dW } = Dimensions.get("window");
const { blueColor } = settings.styles;

const MedicalStoryScreen: FC<MedicalStoryProps> = ({
  navigation,
  route: { params },
}) => {
  // tab views
  const [menu, setMenu] = useState(0);

  return (
    <Container>
      <HeaderRoot title="TIỂU SỬ" previous={() => navigation.goBack()} />
      <TabView
        lazy
        renderTabBar={(props) => (
          <FlatList
            style={styles.menucontainer}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={props.navigationState.routes}
            keyExtractor={(item) => item.key}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback onPress={() => setMenu(index)}>
                <View style={styles.menu}>
                  <View style={styles.menuline} />
                  <Text
                    style={[
                      styles.menutext,
                      menu === index && { color: blueColor },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        )}
        navigationState={{
          index: menu,
          routes: [
            { key: "first", title: "THÔNG TIN BỆNH ÁN" },
            { key: "second", title: "TIỀN SỬ BỆNH ÁN" },
          ],
        }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "first":
              return <Information />;
            case "second":
              return <Diagnosis />;
            default:
              return null;
          }
        }}
        onIndexChange={setMenu}
        initialLayout={{ width: dW }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  menucontainer: {
    backgroundColor: "#F0F0F0",
    flexGrow: 0,
    flexShrink: 0,
  },
  menu: {
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
    flex: 1,
  },
});

export default MedicalStoryScreen;
