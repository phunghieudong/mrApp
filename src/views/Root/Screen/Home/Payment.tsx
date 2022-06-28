import {
  Dialog,
  HeaderRoot,
  LazyLoading,
  Loading,
  ModalCenter,
  ModalLoading,
} from "@/components";
import { settings } from "@/config";
import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Toast,
  View,
  DatePicker,
} from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  InteractionManager,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  PaymentLiveIcon,
  PaymentMomoIcon,
  PaymentOnlineIcon,
} from "../../Block/Payment";
// import DateTimePicker from "@react-native-community/datetimepicker";
import { PaymentProps } from "@/navigation/types/Home";
import { getFee, updatePayment } from "@/api/ExaminationForm";
import { FeeData } from "@/types/ExaminationForm";
import { Modalize } from "react-native-modalize";

const {
  mainColor,
  mainColorText,
  borderColor,
  orangeColor,
  mainColorLight,
  padding,
  placeholderColor,
  blueColor,
} = settings.styles;

const PaymentScreen: FC<PaymentProps> = ({ navigation, route: { params } }) => {
  const {
    examinationDate,
    examinationFormId,
    hospitalId,
    serviceTypeId,
    status,
    specialistTypeId,
    vaccineTypeId,
    form,
  } = params;

  // lấy giá tiền và phí dịch vụ
  const [ready, setReady] = useState(false);
  const [fee, setFee] = useState<FeeData>();

  useEffect(() => {
    (async () => {
      // lấy giá, phí dịch vụ
      try {
        const newParams = {
          examinationFormId,
          hospitalId,
          serviceTypeId,
          specialistTypeId,
          vaccineTypeId,
        };
        const res = await getFee(newParams);
        setFee({ ...res.Data });
        setReady(true);
      } catch (error) {
        throw new Error("FETCH FEE IS FAILED");
      }
    })();
  }, []);

  // check box
  const [paymentMethodId, setPaymentMethodId] = useState(1);

  const toggleCheckbox = (category: "live" | "momo" | "online") => {
    if (category === "live") {
      setPaymentMethodId(1);
    } else if (category === "momo") {
      setPaymentMethodId(3);
    } else {
      setPaymentMethodId(2);
    }
  };

  // date time picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChangeDate = async (event, selectedD?: Date) => {
    setShow(Platform.OS === "ios");
    const currentDate = selectedD || date;
    setDate(currentDate);
  };

  // submit
  const [loading, setLoading] = useState(false);
  const _onPress = async () => {
    try {
      const newParams = {
        examinationFormId,
        paymentMethodId,
        status,
        comment: "",
        bankInfoId: null,
        totalPrice: fee?.TotalPayment,
        reExaminationDate: status === 1 ? null : examinationDate,
      };
      setLoading(true);
      await updatePayment(newParams);
      setLoading(false);
      navigation.navigate("CalendarInfo", {
        ...params,
      });
    } catch (error) {
      Toast.show({ text: "Thanh toán không thành công" });
    }
  };

  // xử lý trước khi rời khỏi trang
  const dialog = useRef<Modalize>(null);

  const handleExit = () => {
    dialog.current?.close();
    if (form !== 0) {
      navigation.goBack();
    } else {
      navigation.navigate("CheckSchedule", { ...params, form });
    }
  };

  const backAction = () => {
    dialog.current?.open();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="THANH TOÁN"
        previous={backAction}
        notifications={false}
      />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <Content contentContainerStyle={styles.body}>
            <View style={[styles.display, { padding }]}>
              <View style={[styles.service, styles.spacebetween]}>
                <Text style={styles.labelservice}>GIÁ DỊCH VỤ</Text>
                <Text style={styles.priceservice}>
                  {fee?.ExaminationPriceDisplay}
                </Text>
              </View>
              <View style={[styles.service, styles.spacebetween]}>
                <Text style={styles.labelservice}>PHÍ DỊCH VỤ</Text>
                <Text style={styles.priceservice}>
                  + {fee?.ExaminationFeeDisplay}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.service,
                styles.spacebetween,
                { marginTop: 10, paddingHorizontal: padding },
              ]}
            >
              <Text style={styles.labelservice}>TỔNG TIỀN</Text>
              <Text
                style={[
                  styles.priceservice,
                  { fontFamily: "SFProDisplay-Semibold", color: mainColor },
                ]}
              >
                {fee?.TotalPaymentDisplay}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => toggleCheckbox("live")}
              activeOpacity={1}
              style={styles.box}
            >
              <View style={styles.left}>
                <PaymentLiveIcon />
                <Text
                  style={[
                    styles.payment,
                    paymentMethodId === 1 && {
                      fontFamily: "SFProDisplay-Bold",
                    },
                  ]}
                >
                  Thanh toán trực tiếp
                </Text>
              </View>
              <View style={styles.right}>
                <Icon
                  type="Feather"
                  name={paymentMethodId === 1 ? "check-circle" : "circle"}
                  style={[
                    styles.checkbox,
                    paymentMethodId === 1 && { color: orangeColor },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Toast.show({ text: "Tính năng còn đang phát triển" })
              }
              activeOpacity={1}
              style={styles.box}
            >
              <View style={styles.left}>
                <PaymentMomoIcon />
                <Text
                  style={[
                    styles.payment,
                    paymentMethodId === 3 && {
                      fontFamily: "SFProDisplay-Bold",
                    },
                  ]}
                >
                  Thanh toán Momo
                </Text>
              </View>
              <View style={styles.right}>
                <Icon
                  type="Feather"
                  name={paymentMethodId === 3 ? "check-circle" : "circle"}
                  style={[
                    styles.checkbox,
                    paymentMethodId === 3 && { color: orangeColor },
                  ]}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Toast.show({ text: "Tính năng còn đang phát triển" })
              }
              activeOpacity={1}
              style={styles.box}
            >
              <View style={styles.left}>
                <PaymentOnlineIcon />
                <Text
                  style={[
                    styles.payment,
                    paymentMethodId === 2 && {
                      fontFamily: "SFProDisplay-Bold",
                    },
                  ]}
                >
                  Thanh toán online
                </Text>
              </View>
              <View style={styles.right}>
                <Icon
                  type="Feather"
                  name={paymentMethodId === 2 ? "check-circle" : "circle"}
                  style={[
                    styles.checkbox,
                    paymentMethodId === 2 && { color: orangeColor },
                  ]}
                />
              </View>
            </TouchableOpacity>
            {paymentMethodId === 2 && (
              <Form style={styles.frmcontrol}>
                <Item style={styles.frmgroup} stackedLabel>
                  <Label style={styles.label}>Tên chủ thẻ</Label>
                  <Input style={styles.input} />
                </Item>
                <Item style={styles.frmgroup} stackedLabel>
                  <Label style={styles.label}>Số thẻ</Label>
                  <Input style={styles.input} keyboardType="number-pad" />
                </Item>
                <View style={styles.flex}>
                  <Item style={[styles.frmgroup, { flex: 0.6 }]} stackedLabel>
                    <Label style={styles.label}>Ngày hết hạn</Label>
                    <TouchableOpacity
                      onPress={() => setShow(true)}
                      activeOpacity={1}
                      style={{ alignSelf: "stretch" }}
                    >
                      <View style={[styles.input, styles.spacebetween]}>
                        <Text style={styles.selected}>21/12/2021</Text>
                        <Icon type="EvilIcons" name="calendar" />
                      </View>
                    </TouchableOpacity>
                    {show && (
                      <DatePicker
                        locale="vi-VN"
                        defaultDate={date}
                        onChange={onChangeDate}
                      />
                    )}
                  </Item>
                  <View style={{ width: 30 }} />
                  <Item style={[styles.frmgroup, { flex: 0.4 }]} stackedLabel>
                    <Label style={styles.label}>Ngày hết hạn</Label>
                    <Input style={styles.input} keyboardType="number-pad" />
                  </Item>
                </View>
              </Form>
            )}
            <TouchableWithoutFeedback onPress={loading ? undefined : _onPress}>
              <View
                style={[
                  styles.btn,
                  paymentMethodId === 1 && { backgroundColor: blueColor },
                ]}
              >
                <Text style={styles.btntext}>XÁC NHẬN</Text>
              </View>
            </TouchableWithoutFeedback>
          </Content>
          <ModalCenter ref={dialog}>
            <Dialog
              text={{
                heading: "Thông báo",
                body: "Hiện tại bạn chưa thanh toán, có chắc muốn rời khỏi trang này?",
              }}
              button={{
                ok: { text: "Tiếp tục", onPress: handleExit },
                cancel: {
                  text: "Hủy bỏ",
                  onPress: () => dialog.current?.close(),
                },
              }}
            />
          </ModalCenter>
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
  },
  spacebetween: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  display: {
    backgroundColor: mainColorLight,
    marginTop: 20,
    borderRadius: 8,
  },
  service: {
    paddingVertical: 8,
  },
  total: {
    borderTopWidth: 1,
    borderColor,
  },
  labelservice: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColor,
  },
  priceservice: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  box: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  payment: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Regular",
    marginLeft: 8,
    color: mainColorText,
  },
  selected: {
    fontSize: 18,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  right: {},
  checkbox: {
    fontSize: 22,
    color: "#8794BE",
  },
  frmcontrol: {},
  frmgroup: {
    marginTop: 15,
    marginLeft: 0,
    borderColor,
  },
  label: {
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 30,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Bold",
    color: "#0000004a",
  },
  input: {
    height: 40,
    top: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    color: mainColorText,
    fontSize: 18,
    fontFamily: "SFProDisplay-Regular",
  },
  btn: {
    marginTop: 15,
    backgroundColor: placeholderColor,
    alignSelf: "flex-end",
    elevation: 4,
    paddingHorizontal: 20,
    paddingVertical: 19,
    borderRadius: 100,
  },
  btntext: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
  },
});

export default PaymentScreen;
