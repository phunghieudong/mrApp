import { settings } from "@/config";
import { useNavigation } from "@react-navigation/core";
import { Header, Icon, Left, Right, Text, View } from "native-base";
import React from "react";
import { StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";

const { mainColor, goldColor, padding } = settings.styles;
const { height: dH } = Dimensions.get("window");

type Props = {
  back?: () => void;
  signOut?: () => void;
};

const CustomHeaderAuth = (props: Props) => {
  const { back, signOut } = props;

  const navigation = useNavigation();

  return (
    <Header androidStatusBarColor={mainColor} style={styles.header}>
      <TouchableWithoutFeedback
        onPress={back ? back : () => navigation.goBack()}
      >
        <Left style={styles.left}>
          <View style={styles.back}>
            <Icon
              style={styles.backicon}
              type="Ionicons"
              name="chevron-back-sharp"
            />
          </View>
          <Text style={styles.backtext}>TRỞ LẠI</Text>
        </Left>
      </TouchableWithoutFeedback>
      <Right style={styles.right}>
        <Text
          style={styles.signin}
          onPress={signOut ? signOut : () => navigation.navigate("SignIn")}
        >
          ĐĂNG NHẬP
        </Text>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: dH * 0.1,
    backgroundColor: mainColor,
    paddingLeft: padding,
    paddingRight: padding,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    left: -6,
  },
  back: {
    marginRight: 8,
  },
  backicon: {
    fontSize: 20,
    color: goldColor,
  },
  backtext: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Regular",
    color: goldColor,
  },
  right: {},
  signin: {
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
    color: goldColor,
  },
});

export default CustomHeaderAuth;
