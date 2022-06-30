import { settings } from "@/config";
import { SignInProps } from "@/navigation/types/Auth";
import { Content, Form, Icon, Text, Toast, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useForm, Path } from "react-hook-form";
import {
  Image,
  InteractionManager,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppDispatch } from "@/store/hook";
import { fetchUser, getPassword, login } from "@/store/reducers/UserSlice";
import { SignInData } from "@/types/Auth";
import FooterBlock from "../Block/Footer";
import { Logo, ModalLoading, Loading, InputBlock } from "@/components";
import { signIn } from "@/api/Auth";
import { Modalize } from "react-native-modalize";
import { total } from "@/store/reducers/NotificationSlice";

const {
  mainColor,
  padding,
  mainColorLight,
  mainColorText,
  dangerColor,
  orangeColor,
} = settings.styles;

const SignInScreen = (props: SignInProps) => {
  const { navigation } = props;

  // redux
  const dispatch = useAppDispatch();

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignInData>();

  useEffect(() => {
    register("userName", {
      required: true,
      pattern: new RegExp("[a-zA-Z0-9_.+-@]+$"),
    });
    register("password", {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: new RegExp("[a-zA-Z0-9_.+-@]+$"),
    });
  }, [register]);

  const onValueChange = (k: Path<SignInData>, v: string) => {
    setValue(k, v);
  };

  const onTrigger = (k: Path<SignInData>) => {
    trigger(k);
  };

  const [loading, setLoading] = useState(false);
  const _onPress = async (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then(async (res) => {
        await dispatch(login(res.Data.token));
        await Promise.all([
          dispatch(total()),
          dispatch(fetchUser()),
          dispatch(getPassword(data.password)),
        ]);
      })
      .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Content contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.language}>
        <Text style={styles.languagetext}>EN</Text>
        <Text style={styles.languagetext}>VN</Text>
        <View style={styles.languagecircle}>
          <View style={styles.languagecircleinner}>
            <View
              style={[
                styles.languagepseudo,
                {
                  borderTopEndRadius: 100,
                  borderTopStartRadius: 100,
                },
              ]}
            />
            <View
              style={[
                styles.languagepseudo,
                {
                  backgroundColor: "#FB8500",
                  borderBottomEndRadius: 100,
                  borderBottomStartRadius: 100,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.logo}>
        <Logo width={212.174} height={67.254} />
      </View>

      <Form style={styles.frmcontrol}>
        <InputBlock
          owner="userName"
          placeholder="SỐ ĐIỆN THOẠI"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.userName}
          errorMess={{
            required: "Số điện thoại không được bỏ trống",
            pattern: "Số điện thoại được chứa kí tự đặc biệt",
          }}
        />
        <InputBlock
          hide
          owner="password"
          placeholder="MẬT KHẨU"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.password}
          errorMess={{
            required: "Mật khẩu không được bỏ trống",
            minLength: "Mật khẩu phải từ 8 đến 128 kí tự",
            maxLength: "Mật khẩu phải từ 8 đến 128 kí tự",
            pattern: "Mật khẩu không được có kí tự đặt biệt",
          }}
        />
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          style={styles.forgetpassword}
        >
          Quên mật khẩu ?
        </Text>
        <View style={styles.submit}>
          <Text
            onPress={loading ? undefined : handleSubmit(_onPress)}
            style={styles.submittext}
          >
            ĐĂNG NHẬP
          </Text>
        </View>
        <Text style={styles.otherssignin}>HOẶC ĐĂNG NHẬP BẰNG</Text>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.socialsignin}>
            <TouchableWithoutFeedback
              onPress={() =>
                Toast.show({ text: "Tính năng còn đang phát triển" })
              }
            >
              <View style={styles.socialsigninitem}>
                <Image
                  source={require("@/assets/icons/zalo.png")}
                  style={styles.socialsigninbox}
                />
                <Text style={styles.socialsignintext}>Zalo</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                Toast.show({ text: "Tính năng còn đang phát triển" })
              }
            >
              <View style={styles.socialsigninitem}>
                <View style={styles.socialsigninbox}>
                  {/* <Icon
                    type="FontAwesome"
                    name="facebook"
                    style={styles.socialsigninicon}
                  /> */}
                </View>
                <Text style={styles.socialsignintext}>Facebook</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                Toast.show({ text: "Tính năng còn đang phát triển" })
              }
            >
              <View style={styles.socialsigninitem}>
                <View
                  style={[
                    styles.socialsigninbox,
                    { backgroundColor: "#E92928" },
                  ]}
                >
                  <Icon
                    type="FontAwesome"
                    name="google"
                    style={styles.socialsigninicon}
                  />
                </View>
                <Text style={styles.socialsignintext}>Google</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.register}>
            Bạn Chưa Có Tài Khoản?{" "}
            <Text
              style={styles.registerlink}
              onPress={() => navigation.navigate("Register")}
            >
              ĐĂNG KÝ
            </Text>
          </Text>
        </View>
      </Form>
      {/* <FooterBlock />
      <ModalLoading visible={loading} /> */}
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  language: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 63,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    margin: padding,
    paddingTop: 8,
    paddingVertical: 9,
    backgroundColor: mainColorLight,
    borderRadius: 17,
  },
  languagetext: {
    fontSize: 12,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  languagecircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    position: "absolute",
    left: 10,
    top: 6,
    overflow: "hidden",
    backgroundColor: "#279EBA",
  },
  languagecircleinner: {
    transform: [{ rotate: "-45deg" }],
  },
  languagepseudo: {
    height: "50%",
    width: "100%",
    backgroundColor: "#279EBA",
  },
  logo: {
    alignItems: "center",
    paddingHorizontal: padding,
    marginTop: 8,
  },
  frmcontrol: {
    paddingHorizontal: padding,
  },
  frmgroup: {
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0,
    marginTop: 15,
    flexDirection: "column",
    alignItems: "stretch",
  },
  input: {
    width: "100%",
    height: 46,
    paddingLeft: 15,
    paddingRight: 15,
  },
  error: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    color: dangerColor,
    fontFamily: "SFProDisplay-Regular",
  },
  submit: {
    backgroundColor: mainColor,
    marginTop: 26,
    borderRadius: 100,
    alignSelf: "center",
  },
  submittext: {
    paddingHorizontal: 60,
    paddingTop: 15,
    paddingBottom: 17,
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
  },
  loading: {
    ...(StyleSheet.absoluteFill as {}),
    backgroundColor: "#ffffff3a",
  },
  forgetpassword: {
    marginTop: 20,
    alignSelf: "flex-end",
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  otherssignin: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: mainColorText,
    opacity: 0.6,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "GoogleSans-Regular",
  },
  socialsignin: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  socialsigninitem: {
    alignItems: "center",
  },
  socialsigninbox: {
    width: 34,
    height: 34,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B5998",
  },
  socialsigninicon: {
    color: "#fff",
    fontSize: 15,
  },
  socialsignintext: {
    marginTop: 4,
    fontSize: 12,
    color: mainColorText,
  },
  register: {
    marginTop: 30,
    color: "#777",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Semibold",
    letterSpacing: 1.25,
    textAlign: "center",
  },
  registerlink: {
    color: orangeColor,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Semibold",
  },
});

export default SignInScreen;
