import {
  checkOTPEmail,
  checkOTPPhone,
  getOTPEmail,
  getOTPPhone,
} from "@/api/Auth";
import { HeaderAuth, ModalLoading } from "@/components";
import { settings } from "@/config";
import { ConfirmOTPProps } from "@/navigation/types/Auth";
import { useAppDispatch } from "@/store/hook";
import { changeRoute } from "@/store/reducers/RouteSlice";
import { fetchUser, login } from "@/store/reducers/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Container, Content, Text, Toast, View } from "native-base";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native";
import { Modalize } from "react-native-modalize";

const { padding, mainColorText, orangeColor, blueColor, placeholderColor } =
  settings.styles;

const ConfirmOTPScreen: FC<ConfirmOTPProps> = ({
  route: {
    params: { phone, email, type },
  },
}) => {
  const dispatch = useAppDispatch();

  const numbers = useRef<string[]>(["", "", "", "", "", ""]);

  // xử lý khi bấm từng input
  const [disabled, setDisabled] = useState(true);
  const pressNumber = (num: string, input: number) => {
    const arr = numbers.current;
    arr[input] = num;
    numbers.current = [...arr];
    if (arr.every((i) => i.length > 0)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    handleRef(num, input);
  };

  // ref từng input
  const refNumber1 = useRef<TextInput>(null);
  const refNumber2 = useRef<TextInput>(null);
  const refNumber3 = useRef<TextInput>(null);
  const refNumber4 = useRef<TextInput>(null);
  const refNumber5 = useRef<TextInput>(null);
  const refNumber6 = useRef<TextInput>(null);

  const handleRef = useCallback((num: string, input: number) => {
    const len = num.length;
    if (input === 0) {
      if (len > 0) refNumber2.current?.focus();
    } else if (input === 1) {
      if (len > 0) refNumber3.current?.focus();
      else refNumber1.current?.focus();
    } else if (input === 2) {
      if (len > 0) refNumber4.current?.focus();
      else refNumber2.current?.focus();
    } else if (input === 3) {
      if (len > 0) refNumber5.current?.focus();
      else refNumber3.current?.focus();
    } else if (input === 4) {
      if (len > 0) refNumber6.current?.focus();
      else refNumber4.current?.focus();
    } else if (input === 5) {
      if (len <= 0) refNumber5.current?.focus();
    }
  }, []);

  const signIn = (token: string) => {
    dispatch(login(token))
      .then(unwrapResult)
      .then(async () => await dispatch(fetchUser()));
  };

  const navigate = (res) => {
    dispatch(changeRoute({ route: "root", initialRoute: "CreateNewPassword" }));
    return res;
  };

  // kiểm tra mã otp
  const [loading, setLoading] = useState(false);

  const submitEmail = () => {
    if (email) {
      checkOTPEmail(email, numbers.current.join(""))
        .then((res) => navigate(res))
        .then((res) => signIn(res.Data.token))
        .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const submitPhone = () => {
    if (phone) {
      checkOTPPhone(phone, numbers.current.join(""))
        .then((res) => navigate(res))
        .then((res) => signIn(res.Data.token))
        .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const _onPress = () => {
    setLoading(true);
    if (type === "phone") {
      submitPhone();
    } else {
      submitEmail();
    }
  };

  // lấy mã OTP thêm 1 lần
  const resetTime = () => {
    setSecond(59);
  };

  const getOTPOnce = () => {
    setLoading(true);
    if (type === "phone" && phone) {
      getOTPPhone(phone)
        .then(resetTime)
        .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
        .finally(() => setLoading(false));
    } else if (type === "email" && email) {
      getOTPEmail(email)
        .then(resetTime)
        .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
        .finally(() => setLoading(false));
    }
  };

  // giảm thời gian
  const [second, setSecond] = useState(59);
  useEffect(() => {
    let minusSecond: any = null;
    minusSecond = setTimeout(() => {
      setSecond((s) => {
        if (s > 0) return s - 1;
        else {
          clearInterval(minusSecond);
          return 0;
        }
      });
    }, 1000);
    return () => clearTimeout(minusSecond);
  }, [getOTPOnce]);

  return (
    <Container style={styles.container}>
      <HeaderAuth />
      <Content contentContainerStyle={styles.body}>
        <Text style={styles.heading}>
          Vui lòng nhập mã OTP được gửi qua {type === "phone" ? "số" : "email"}
        </Text>
        <Text style={styles.numberphone}>
          {type === "phone" ? phone : email}
        </Text>
        <View style={styles.numberotpbox}>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber1}
              onChangeText={(val) => pressNumber(val, 0)}
            />
          </View>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber2}
              onChangeText={(val) => pressNumber(val, 1)}
            />
          </View>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber3}
              onChangeText={(val) => pressNumber(val, 2)}
            />
          </View>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber4}
              onChangeText={(val) => pressNumber(val, 3)}
            />
          </View>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber5}
              onChangeText={(val) => pressNumber(val, 4)}
            />
          </View>
          <View style={styles.underline}>
            <TextInput
              keyboardType="numeric"
              style={styles.number}
              maxLength={1}
              selectionColor="rgba(33, 158, 188, .5)"
              ref={refNumber6}
              onChangeText={(val) => pressNumber(val, 5)}
            />
          </View>
        </View>
        <Text style={styles.dontgetotp}>Bạn không nhận được OTP ?</Text>
        <View style={styles.flex}>
          <Text
            onPress={second < 1 ? getOTPOnce : () => null}
            style={styles.sendmore}
          >
            Gửi lại{second < 1 && " ngay"}
          </Text>
          {second > 0 && (
            <Text style={styles.sendmorenumber}>
              {" "}
              (0:{second < 10 ? `0${second}s` : second})
            </Text>
          )}
        </View>
        <TouchableWithoutFeedback
          onPress={disabled || loading ? undefined : _onPress}
        >
          <View
            style={[
              styles.submit,
              disabled && { backgroundColor: placeholderColor },
            ]}
          >
            <Text style={styles.submittext}>TIẾP THEO</Text>
          </View>
        </TouchableWithoutFeedback>
      </Content>
      <ModalLoading visible={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  body: {
    paddingHorizontal: padding,
    flexGrow: 1,
  },
  heading: {
    marginTop: 35,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    textAlign: "center",
  },
  numberphone: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Semibold",
    color: blueColor,
    textAlign: "center",
  },
  numberotpbox: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  numberotp: {
    marginTop: 20,
    flexGrow: 0,
    flexShrink: 0,
  },
  underline: {
    margin: 4,
    borderBottomWidth: 1,
    borderColor: "#0000002a",
    width: 25,
  },
  number: {
    textAlign: "center",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 40,
    lineHeight: 40,
    color: blueColor,
  },
  submit: {
    backgroundColor: blueColor,
    marginTop: 40,
    alignSelf: "center",
    paddingHorizontal: 56,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
    elevation: 4,
  },
  submittext: {
    fontSize: 16,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 1.25,
    color: "#fff",
  },
  dontgetotp: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    textAlign: "center",
    marginVertical: 30,
  },
  flex: {
    flexDirection: "row",
    alignSelf: "center",
  },
  sendmore: {
    color: mainColorText,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  sendmorenumber: {
    color: orangeColor,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
  },
  disabled: {
    ...(StyleSheet.absoluteFill as {}),
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
});

export default ConfirmOTPScreen;
