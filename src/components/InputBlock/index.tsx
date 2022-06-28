import { settings } from "@/config";
import { Input, Text, View } from "native-base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";

const { mainColor, mainColorText, borderColor, dangerColor, labelColor } =
  settings.styles;

type IProps = {
  defaultValue?: string;
  owner: string;
  placeholder: string;
  onValueChange: (key, value) => void;
  onTrigger: (key) => void;
  errors: any;
  errorMess: {
    required: string;
    pattern?: string;
    validate?: string;
    minLength?: string;
    maxLength?: string;
  };
  hide?: true;
  keyboardType?: "numeric";
  userName?: true; // trường hợp set tài khoản là sđt, phía BE chưa fix
};

const InputBlock = (props: IProps) => {
  const {
    defaultValue,
    owner,
    placeholder,
    onValueChange,
    onTrigger,
    errors,
    errorMess,
    hide,
    keyboardType,
  } = props;

  // animated
  const animatedLabelTop = useRef(
    new Animated.Value(defaultValue ? -8 : 20)
  ).current;
  const [border, setBorder] = useState({});

  const toggleAnimated = useCallback((type: "up" | "down") => {
    if (type === "up") {
      Animated.timing(animatedLabelTop, {
        toValue: -8,
        duration: 150,
        easing: EasingNode.ease,
      }).start();
      setBorder({ borderBottomColor: mainColor });
    } else {
      Animated.timing(animatedLabelTop, {
        toValue: 20,
        duration: 150,
        easing: EasingNode.ease,
      }).start();
      setBorder({});
    }
  }, []);

  useEffect(() => {
    if (defaultValue) {
      toggleAnimated("up");
    }
  }, [defaultValue]);

  return (
    <>
      <View style={styles.flex}>
        <View style={[styles.frmgroup, border]}>
          <Animated.Text style={[styles.label, { top: animatedLabelTop }]}>
            {placeholder}
          </Animated.Text>
          <Input
            defaultValue={defaultValue || ""}
            onFocus={() => toggleAnimated("up")}
            secureTextEntry={hide}
            keyboardType={keyboardType || "default"}
            style={styles.input}
            onChangeText={(val) => onValueChange(owner, val)}
            onEndEditing={(e) => {
              if (!e.nativeEvent.text.length) {
                toggleAnimated("down");
              }
              onTrigger(owner);
            }}
          />
        </View>
      </View>
      {errors && (
        <>
          {errors.type === "required" && (
            <Text style={styles.error}>{errorMess.required}</Text>
          )}
          {(errors.type === "minLength" || errors.type === "maxLength") && (
            <Text style={styles.error}>
              {errorMess.minLength || errorMess.maxLength}
            </Text>
          )}
          {errors.type === "pattern" && (
            <Text style={styles.error}>{errorMess.pattern}</Text>
          )}
          {errors.type === "validate" && (
            <Text style={styles.error}>{errorMess.validate}</Text>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  frmgroup: {
    width: "100%",
    height: 50,
    top: 8,
    paddingTop: 3,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor,
    justifyContent: "center",
    marginTop: 26,
  },
  label: {
    position: "absolute",
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
    color: labelColor,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    ...(StyleSheet.absoluteFill as {}),
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  error: {
    marginTop: 13,
    fontSize: 12,
    lineHeight: 17,
    color: dangerColor,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default InputBlock;
