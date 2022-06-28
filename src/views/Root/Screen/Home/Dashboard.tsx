import React, { useEffect, useRef, useState } from "react";
import { HeaderRoot } from "@/components";
import { Container, Icon, Text, Toast, View } from "native-base";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import { DashboardProps } from "@/navigation/types/Home";
import { settings } from "@/config";
import {
  ScheduleIcon,
  ExaminationCalendarIcon,
  MedicalRecordIcon,
  VaccinationCalendarIcon,
  AdultVaccinationCalendarIcon,
} from "../../Block/Dashboard";
import { useAppSelector } from "@/store/hook";
import ModalBottom from "@/components/ModalBottom";
import { Modalize } from "react-native-modalize";
import { _format } from "@/utils";
import { UserData } from "@/types/User";
import Swiper from "react-native-swiper";

const { hostURL } = settings;
const { mainColorText, borderColor, padding, mainColor } = settings.styles;

const DashboardScreen = (props: DashboardProps) => {
  const { navigation } = props;

  // user
  const user = useAppSelector((state) => state.user.current) as UserData;
  const userAvatarFiles = user.UserFiles?.filter((i) => i.FileType === 0);
  const [avatar, setAvatar] = useState(
    userAvatarFiles?.length > 0 && userAvatarFiles
      ? userAvatarFiles[userAvatarFiles?.length - 1]?.FileUrl
      : null
  );

  // modal
  const modal = useRef<Modalize>(null);

  // handle navigate special schedule or normal schedule screen
  const nav = (route: "SpecialSchedule" | "NormalSchedule") => {
    modal.current?.close();
    navigation.navigate(route, {});
  };

  return (
    <Container style={styles.container}>
      <HeaderRoot title="Trang chủ" />
      {/* <View style={styles.info}>
        <Image
          defaultSource={require("@/assets/images/no-avatar.jpg")}
          onError={() => setAvatar(null)}
          source={
            !avatar ? require("@/assets/images/no-avatar.jpg") : { uri: avatar }
          }
          style={styles.avatar}
        />
        <Text style={styles.fullname}>{user.UserFullName}</Text>
        <Text style={styles.code}>{"TA - " + user.Id}</Text>
      </View> */}
      <Swiper
        showsButtons={false}
        height={160}
        containerStyle={{ flex: 0 }}
        activeDotColor={mainColor}
        dotColor="rgba(0, 0, 0, .2)"
        paginationStyle={{
          bottom: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#9DD6EB",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Image 1
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#97CAE5",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Image 2
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#92BBD9",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>
            Image 3
          </Text>
        </View>
      </Swiper>
      <View style={styles.body}>
        <View style={styles.menu}>
          <View style={[styles.flex, { alignItems: "stretch" }]}>
            <View style={styles.menubox}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ExaminationCalendar")}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    styles.menuimgbox,
                    {
                      backgroundColor: "#FB8500",
                    },
                  ]}
                >
                  <ExaminationCalendarIcon />
                  <View style={[styles.badge, { backgroundColor: "#FB8500" }]}>
                    <Text style={styles.badgetext}>4</Text>
                  </View>
                </View>
                <Text style={styles.menutext}>LỊCH KHÁM SẮP TỚI</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderColor,
              }}
            />
            <View style={styles.menubox}>
              <TouchableOpacity
                onPress={() => modal.current?.open()}
                activeOpacity={0.9}
              >
                <View
                  style={[styles.menuimgbox, { backgroundColor: "#FFB703" }]}
                >
                  <ScheduleIcon />
                </View>
                <Text style={styles.menutext}>ĐẶT LỊCH KHÁM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              borderTopWidth: 1,
              borderColor,
            }}
          />
          <View style={[styles.flex, { alignItems: "stretch" }]}>
            <View style={styles.menubox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", {
                    screen: "MedicalStory",
                    params: {},
                  })
                }
                activeOpacity={0.9}
              >
                <View
                  style={[styles.menuimgbox, { backgroundColor: "#142977" }]}
                >
                  <MedicalRecordIcon />
                </View>
                <Text style={styles.menutext}>HỒ SƠ BỆNH ÁN</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderColor,
              }}
            />
            <View style={styles.menubox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { screen: "Vaccination" })
                }
                activeOpacity={0.9}
              >
                <View
                  style={[styles.menuimgbox, { backgroundColor: "#219EBC" }]}
                >
                  {(!user.BirthDate ||
                    _format.getAge(new Date(user.BirthDate))) < 12 && (
                    <VaccinationCalendarIcon />
                  )}
                  {user.BirthDate &&
                    _format.getAge(new Date(user.BirthDate)) >= 12 && (
                      <AdultVaccinationCalendarIcon />
                    )}
                </View>
                <Text style={styles.menutext}>LỊCH TIÊM CHỦNG</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ModalBottom heading="Đặt lịch khám" ref={modal}>
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
          <TouchableWithoutFeedback onPress={() => nav("NormalSchedule")}>
            <View style={[styles.box, { marginBottom: 6 }]}>
              <Text style={styles.link}>ĐẶT LỊCH KHÁM THƯỜNG</Text>
              <Icon
                type="Ionicons"
                name="chevron-forward-sharp"
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => nav("SpecialSchedule")}>
            <View style={[styles.box]}>
              <Text style={styles.link}>ĐẶT LỊCH KHÁM DỊCH VỤ</Text>
              <Icon
                type="Ionicons"
                name="chevron-forward-sharp"
                style={styles.icon}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ModalBottom>
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  info: {
    alignSelf: "center",
    marginTop: -45,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    alignSelf: "center",
  },
  fullname: {
    fontSize: 24,
    lineHeight: 40,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Bold",
    color: mainColorText,
    textAlign: "center",
  },
  code: {
    color: mainColorText,
    fontFamily: "SFProDisplay-Medium",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
  },
  body: {
    // paddingTop: 30,
    paddingHorizontal: padding,
    flex: 1,
    alignItems: "center",
  },
  menu: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  menubox: {
    width: "50%",
    padding: 20,
    alignItems: "center",
  },
  menuimgbox: {
    padding: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  menuimg: {
    minWidth: 40,
    minHeight: 40,
  },
  menutext: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    marginTop: 8,
    color: mainColorText,
  },
  badge: {
    width: 26,
    height: 26,
    borderRadius: 100,
    backgroundColor: "#FB8500",
    position: "absolute",
    top: -8,
    right: -6,
  },
  badgetext: {
    textAlign: "center",
    lineHeight: 26,
    fontSize: 14,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Bold",
    color: "#fff",
  },
  box: {
    paddingTop: 15,
    paddingBottom: 17,
    // backgroundColor: blueColor,
    // paddingHorizontal: 12,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "#000",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
  },
  icon: {
    color: "#000",
    fontSize: 24,
    marginRight: -5,
  },
});

export default DashboardScreen;
