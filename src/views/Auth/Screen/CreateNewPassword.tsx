import {
  HeaderAuth,
  HeadingAuth,
  ModalLoading,
  InputBlock,
  Loading,
} from "@/components";
import { settings } from "@/config";
import { CreateNewPasswordData } from "@/types/Auth";
import { CreateNewPasswordProps } from "@/navigation/types/Home";
import { Container, Content, Form, Text, Toast, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Path, useForm } from "react-hook-form";
import {
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppDispatch } from "@/store/hook";
import { changeRoute } from "@/store/reducers/RouteSlice";
import { createNewPassword } from "@/api/Auth";
import { getPassword, logout } from "@/store/reducers/UserSlice";
import { Modalize } from "react-native-modalize";

const { blueColor, padding } = settings.styles;

const CreateNewPasswordScreen = (props: CreateNewPasswordProps) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const navigate = () => {
    dispatch(changeRoute({ route: "root", initialRoute: "Dashboard" }));
    navigation.navigate("Dashboard");
  };

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<CreateNewPasswordData>();

  useEffect(() => {
    register("newPassword", {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: new RegExp("[a-zA-Z0-9_.+-@]+$"),
    });
    register("confirmNewPassword", {
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: new RegExp("[a-zA-Z0-9_.+-@]+$"),
      validate: (val) => val === watch("newPassword"),
    });
  }, [register]);

  const onValueChange = (k: Path<CreateNewPasswordData>, v: string) => {
    setValue(k, v);
  };

  const onTrigger = (k: Path<CreateNewPasswordData>) => {
    trigger(k);
  };

  const [loading, setLoading] = useState(false);
  const _onPress = (data: CreateNewPasswordData) => {
    setLoading(true);
    const { confirmNewPassword, newPassword } = data;
    createNewPassword(newPassword, confirmNewPassword)
      .then(() => Toast.show({ text: "Thay đổi mật khẩu thành công" }))
      .then(() => dispatch(getPassword(confirmNewPassword)))
      .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
      .finally(() => {
        setLoading(false);
      });
  };

  // log out
  const signOut = () => {
    dispatch(logout());
  };

  return (
    <Container style={styles.container}>
      <HeaderAuth back={navigate} signOut={signOut} />
      <Content contentContainerStyle={styles.body}>
        <HeadingAuth text="Tạo mới mật khẩu" />
        <Form>
          <InputBlock
            hide
            owner="newPassword"
            placeholder="MẬT KHẨU MỚI"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.newPassword}
            errorMess={{
              required: "Mật khẩu không được bỏ trống",
              pattern: "Mật khẩu được chứa kí tự đặc biệt",
              maxLength: "Mật khẩu không được quá 128 kí tự",
              minLength: "Mật khẩu phải ít nhất 8 kí tự",
            }}
          />
          <InputBlock
            hide
            owner="confirmNewPassword"
            placeholder="NHẬP LẠI MẬT KHẨU MỚI"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.confirmNewPassword}
            errorMess={{
              required: "Mật khẩu không được bỏ trống",
              pattern: "Mật khẩu được chứa kí tự đặc biệt",
              maxLength: "Mật khẩu không được quá 128 kí tự",
              minLength: "Mật khẩu phải ít nhất 8 kí tự",
              validate: "Không trùng khớp với mật khẩu trên",
            }}
          />
          <TouchableWithoutFeedback
            onPress={loading ? undefined : handleSubmit(_onPress)}
          >
            <View style={styles.btn}>
              <Text style={styles.btntext}>XÁC NHẬN</Text>
            </View>
          </TouchableWithoutFeedback>
        </Form>
      </Content>
      <ModalLoading visible={loading} />
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
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 55,
    paddingTop: 15,
    paddingBottom: 17,
    backgroundColor: blueColor,
    alignSelf: "center",
    borderRadius: 100,
    elevation: 4,
  },
  btntext: {
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
    color: "#fff",
  },
  btnspinner: {
    height: "auto",
    marginRight: 15,
  },
});

export default CreateNewPasswordScreen;
