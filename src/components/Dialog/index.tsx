import { settings } from "@/config";
import { Text, View } from "native-base";
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Modalize } from "react-native-modalize";
import { ModalCenter } from "..";

const { mainColorLight, mainColorText, mainColor, dangerColor } =
  settings.styles;

type TextType = {
  heading: string;
  body: string;
};

type ButtonProps = {
  onPress?: () => void;
  text: string;
};

type ButtonType = {
  ok: ButtonProps;
  cancel?: ButtonProps;
};

type IProps = {
  text: TextType;
  button: ButtonType;
};

const Index = ({ button, text }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingtext}>{text.heading}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodytext}>{text.body}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={button.ok.onPress}>
          <View style={styles.btn}>
            <Text style={styles.btntext}>{button.ok.text}</Text>
          </View>
        </TouchableWithoutFeedback>

        {button.cancel && (
          <TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={button.cancel.onPress}>
              <View style={[styles.btn, { backgroundColor: dangerColor }]}>
                <Text style={styles.btntext}>{button.cancel.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const padding = 20;
const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff",
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: mainColorLight,
    paddingHorizontal: padding,
    paddingVertical: 12,
  },
  headingtext: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "SFProDisplay-Bold",
    color: mainColorText,
  },
  body: {
    padding,
    paddingBottom: 0,
  },
  bodytext: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  footer: {
    padding,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    alignSelf: "flex-end",
    backgroundColor: mainColor,
    borderRadius: 4,
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  btntext: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
    textTransform: "uppercase",
  },
});

export default Index;
