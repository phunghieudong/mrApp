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
      .then(() => Toast.show({ text: "Thay ?????i m???t kh???u th??nh c??ng" }))
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
        <HeadingAuth text="T???o m???i m???t kh???u" />
        <Form>
          <InputBlock
            hide
            owner="newPassword"
            placeholder="M???T KH???U M???I"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.newPassword}
            errorMess={{
              required: "M???t kh???u kh??ng ???????c b??? tr???ng",
              pattern: "M???t kh???u ???????c ch???a k?? t??? ?????c bi???t",
              maxLength: "M???t kh???u kh??ng ???????c qu?? 128 k?? t???",
              minLength: "M???t kh???u ph???i ??t nh???t 8 k?? t???",
            }}
          />
          <InputBlock
            hide
            owner="confirmNewPassword"
            placeholder="NH???P L???I M???T KH???U M???I"
            onValueChange={onValueChange}
            onTrigger={onTrigger}
            errors={errors.confirmNewPassword}
            errorMess={{
              required: "M???t kh???u kh??ng ???????c b??? tr???ng",
              pattern: "M???t kh???u ???????c ch???a k?? t??? ?????c bi???t",
              maxLength: "M???t kh???u kh??ng ???????c qu?? 128 k?? t???",
              minLength: "M???t kh???u ph???i ??t nh???t 8 k?? t???",
              validate: "Kh??ng tr??ng kh???p v???i m???t kh???u tr??n",
            }}
          />
          <TouchableWithoutFeedback
            onPress={loading ? undefined : handleSubmit(_onPress)}
          >
            <View style={styles.btn}>
              <Text style={styles.btntext}>X??C NH???N</Text>
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
