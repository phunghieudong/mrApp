import { schedule } from "@/api/ExaminationForm";
import { HeaderRoot, Loading, ModalLoading } from "@/components";
import { settings } from "@/config";
import { CheckScheduleProps } from "@/navigation/types/Home";
import { Container, Content, Icon, Text, Toast, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useAppSelector } from "@/store/hook";
import { _format } from "@/utils";
import { UserData } from "@/types/User";
import { Modalize } from "react-native-modalize";

const {
  padding,
  mainColor,
  mainColorText,
  mainColorLight,
  borderColor,
  blueColor,
  orangeColor,
  placeholderColor,
} = settings.styles;

const CheckScheduleScreen: FC<CheckScheduleProps> = ({
  navigation,
  route: { params },
}) => {
  const {
    examinationDate,
    examinationScheduleDetailId,
    examinationScheduleDetailName,
    hospitalAddress,
    hospitalId,
    hospitalName,
    hospitalPhoneNumber,
    hospitalWebsite,
    isBHYT,
    recordId,
    roomExaminationId,
    roomExaminationName,
    status,
    typeId,
    doctorName,
    serviceTypeId,
    serviceTypeName,
    specialistTypeName,
    vaccineTypeName,
    form,
    examinationFormId,
    vaccineTypeId,
    doctorId,
    specialistTypeId,
  } = params;

  // lấy user hiện tại
  const user = useAppSelector((state) => state.user.current) as UserData;

  // chuyển hướng trang
  const [loading, setLoading] = useState(false);

  const navPayment = async () => {
    const newParams = {
      doctorId: doctorId || null,
      examinationDate: examinationDate,
      hospitalId: hospitalId,
      isBHYT: isBHYT,
      recordId: recordId,
      serviceTypeId: serviceTypeId,
      typeId: typeId,
      examinationScheduleDetailId: examinationScheduleDetailId,
      roomExaminationId: roomExaminationId,
      specialistTypeId: specialistTypeId || null,
      vaccineTypeId: vaccineTypeId || null,
      reExaminationDate: null,
      status: 0,
      paymentMethodId: 3,
      examinationIndex: "",
      note: "",
      feeExamination: 0,
      bankInfoId: null,
      comment: "",
    };

    if (typeof form === "number") {
      navigation.navigate("Payment", {
        ...params,
        examinationFormId: examinationFormId as number,
        form: 0,
      });
    } else {
      setLoading(true);
      schedule(newParams)
        .then((res) => {
          const examinationFormId: number = res.Data.Id;
          navigation.navigate("Payment", {
            ...params,
            examinationFormId,
            form: 0,
          });
        })
        .catch((err) => Toast.show({ text: err.response.data.ResultMessage }))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // đồng ý với chính sách ...
  const [agreement, setAgreement] = useState(false);

  // mở điện thoại / website
  const handleLinking = async (type: "website" | "phone") => {
    let url = hospitalWebsite;
    if (type === "phone") {
      if (Platform.OS === "ios") url = `telprompt:${hospitalPhoneNumber}`;
      else url = `tel:${hospitalPhoneNumber}`;
    }

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Toast.show({ text: "Lỗi không thể thưc hiện thao tác này" });
    }
  };

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="KIỂM TRA THÔNG TIN"
        previous={() => navigation.goBack()}
      />
      <Content contentContainerStyle={styles.body} style={{}}>
        <View style={[styles.hospital, { padding }]}>
          <Text style={styles.hospitalname}>{hospitalName}</Text>
          {specialistTypeName && (
            <Text style={styles.hospitalspecial}>{specialistTypeName}</Text>
          )}
          <Text style={styles.hospitallabel}>ĐỊA CHỈ</Text>
          <Text style={styles.hospitalvalue}>{hospitalAddress}</Text>
          <Text style={styles.hospitallabel}>WEBSITE</Text>
          <Text
            style={[
              styles.hospitalvalue,
              { color: blueColor, textDecorationLine: "underline" },
            ]}
            onPress={() => handleLinking("website")}
          >
            {hospitalWebsite}
          </Text>
          <Text style={styles.hospitallabel}>SỐ ĐIỆN THOẠI</Text>
          <Text
            style={[
              styles.hospitalvalue,
              { color: blueColor, textDecorationLine: "underline" },
            ]}
            onPress={() => handleLinking("phone")}
          >
            {hospitalPhoneNumber}
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.datebox}>
            <Text style={styles.date}>
              {_format.getVNDate(examinationDate)}
            </Text>
            <Text style={styles.time}>{examinationScheduleDetailName}</Text>
          </View>
          <View style={styles.infobox}>
            <Text style={[styles.infotext, { marginTop: 0 }]}>
              Họ tên: {user?.UserFullName}
            </Text>

            <Text style={styles.infotext}>
              Ngày sinh: {_format.getVNDate(user?.BirthDate)}
            </Text>

            {doctorName && (
              <Text style={styles.infotext}>Bác sĩ: {doctorName}</Text>
            )}
            <Text style={styles.infotext}>
              Phòng khám: {roomExaminationName}
            </Text>
            <Text style={styles.infotext}>Loại: {serviceTypeName}</Text>
            {serviceTypeId === 6 && (
              <Text style={styles.infotext}>Vaccine: {vaccineTypeName}</Text>
            )}
            {status === 1 && (
              <Text style={styles.infotext}>
                Bảo hiểm y tế: {isBHYT < 2 ? "Có" : "Không"}
              </Text>
            )}
          </View>
          <View style={styles.agreement}>
            <TouchableWithoutFeedback onPress={() => setAgreement(!agreement)}>
              <Icon
                type="Feather"
                name={agreement ? "check-circle" : "circle"}
                style={[
                  styles.agreementchkbox,
                  agreement && { color: orangeColor },
                ]}
              />
            </TouchableWithoutFeedback>
            <Text style={styles.agreementtext}>
              Tôi đồng ý với{" "}
              <Text style={styles.agreementlink}>chính sách</Text> và{" "}
              <Text style={styles.agreementlink}>quy trình khám bệnh</Text> của{" "}
              {hospitalName}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={agreement && !loading ? navPayment : undefined}
          >
            <View
              style={[styles.btn, agreement && { backgroundColor: blueColor }]}
            >
              <Text style={styles.btntext}>THANH TOÁN</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
  },
  hospital: {
    paddingVertical: 20,
    borderColor,
    backgroundColor: "#E8F5F8",
  },
  hospitalname: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Bold",
    color: blueColor,
  },
  hospitalspecial: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Bold",
    color: "#37A6F7",
  },
  hospitallabel: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000006a",
    letterSpacing: 0.5,
  },
  hospitalvalue: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000009a",
  },
  info: {
    padding: padding,
  },
  datebox: {
    padding: 20,
    backgroundColor: mainColor,
    borderWidth: 1,
    borderColor: "#707070",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
  infobox: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#219EBC",
    borderRadius: 2,
    marginTop: 10,
  },
  infotext: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Semibold",
    color: "#219EBC",
    marginTop: 5,
  },
  date: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "SFProDisplay-Semibold",
    color: "#fff",
  },
  time: {
    fontSize: 30,
    lineHeight: 34,
    fontFamily: "SFProDisplay-Bold",
    color: "#fff",
    marginTop: 5,
  },
  index: {
    padding: 20,
    backgroundColor: mainColorLight,
    borderWidth: 1,
    borderColor: mainColor,
    borderStyle: "dashed",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  indexlabel: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColor,
  },
  indexvalue: {
    fontSize: 30,
    lineHeight: 34,
    fontFamily: "SFProDisplay-Bold",
    color: mainColor,
  },
  agreement: {
    flexDirection: "row",
    marginTop: 10,
  },
  agreementchkbox: {
    marginRight: 4,
    padding: 4,
    fontSize: 22,
    color: "#8794BE",
  },
  agreementtext: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  agreementlink: {
    color: blueColor,
    fontFamily: "SFProDisplay-Medium",
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

export default CheckScheduleScreen;
