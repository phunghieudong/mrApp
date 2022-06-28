import { HeaderRoot } from "@/components";
import { settings } from "@/config";
import { Container, Content, Text, Toast, View } from "native-base";
import React, { FC, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
  Platform,
  Linking,
} from "react-native";
import { CalendarInfoProps } from "@/navigation/types/Home";
import { useAppSelector } from "@/store/hook";
import { _format } from "@/utils";
import { UserData } from "@/types/User";

const { width: dW, height: dH } = Dimensions.get("window");

const {
  padding,
  blueColor,
  mainColor,
  mainColorLight,
  mainColorText,
  borderColor,
} = settings.styles;

const CalendarInfoScreen: FC<CalendarInfoProps> = ({
  navigation,
  route: {
    params: {
      examinationDate,
      examinationScheduleDetailName,
      hospitalAddress,
      hospitalName,
      hospitalPhoneNumber,
      hospitalWebsite,
      isBHYT,
      roomExaminationName,
      serviceTypeName,
      status,
      doctorName,
      specialistTypeName,
      serviceTypeId,
      vaccineTypeName,
    },
  },
}) => {
  const user = useAppSelector((state) => state.user.current) as UserData;

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

  // xử lý nút quay lại trên máy
  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Dashboard");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Container>
      <HeaderRoot
        title="THÔNG TIN LỊCH HẸN"
        previous={() => navigation.navigate("Dashboard")}
      />
      <Content contentContainerStyle={styles.body}>
        <View style={styles.hospital}>
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
          <View style={styles.index}>
            <Text style={styles.indexlabel}>
              {_format.getVNDate(examinationDate)}
            </Text>
            <Text style={styles.indexvalue}>
              {examinationScheduleDetailName}
            </Text>
          </View>
          <View style={styles.infobox}>
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
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.link}>
              <Text
                onPress={() => navigation.navigate("Dashboard")}
                style={styles.linktext}
              >
                TRỞ VỀ TRANG CHỦ
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  map: {
    width: dW,
    height: dH * 0.2,
  },
  hospital: {
    borderColor,
    backgroundColor: mainColorLight,
    padding,
  },
  hospitalname: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Bold",
    color: "#219EBC",
  },
  hospitalspecial: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Bold",
    color: "#37A6F7",
  },
  hospitallabel: {
    letterSpacing: 0.5,
    marginTop: 10,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000006a",
  },
  hospitalvalue: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000008a",
  },
  info: {
    padding: padding,
  },
  index: {
    padding: 20,
    backgroundColor: mainColor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    borderRadius: 2,
  },
  indexlabel: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Semibold",
    color: "#fff",
    marginBottom: 8,
  },
  indexvalue: {
    fontSize: 30,
    lineHeight: 34,
    fontFamily: "SFProDisplay-Bold",
    color: "#fff",
  },
  common: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor,
    paddingVertical: 18,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  value: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Bold",
    color: mainColorText,
  },
  imgs: {
    marginVertical: 20,
  },
  imgtext: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 16,
    lineHeight: 20,
    color: mainColorText,
    marginBottom: 12,
  },
  imgsflex: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  img: {
    margin: 4,
    width: "31.1%",
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor,
  },
  imgmain: {
    width: "100%",
    height: "100%",
  },
  link: {
    marginVertical: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: mainColor,
  },
  linktext: {
    color: mainColor,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "SFProDisplay-Bold",
  },
  infobox: {
    padding: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#219EBC",
    borderStyle: "dashed",
    justifyContent: "center",
    marginTop: 10,
  },
  infotext: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Semibold",
    color: "#219EBC",
    marginTop: 5,
  },
});

export default CalendarInfoScreen;
