import React, { useEffect, useRef, useState } from "react";
import { HeaderRoot } from "@/components";
import { Container, Icon, Text, Toast, View } from "native-base";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import Iconnew from "react-native-vector-icons/MaterialCommunityIcons";

import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
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
import { ScrollView } from "react-native-gesture-handler";

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
    <View style={styles.container}>
      <ScrollView>
        <HeaderRoot title="" />
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
              flexDirection: "row",
              justifyContent: "flex-start",
              padding: 24,
              alignItems: "center",
              backgroundColor: "#e8f5f8",
            }}
          >
            <Image
              defaultSource={require("@/assets/images/no-avatar.jpg")}
              onError={() => setAvatar(null)}
              source={
                !avatar
                  ? require("@/assets/images/no-avatar.jpg")
                  : { uri: avatar }
              }
              style={styles.avatar}
            />
            <View
              style={{
                padding: 24,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <View style={{ justifyContent: "flex-end" }}>
                <Text style={styles.fullname}>{user.UserFullName}</Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  backgroundColor: "#FFB703",
                  width: 151,
                  height: 36,
                  borderRadius: 8,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.code}>{"TA - " + user.Id}</Text>
                <Iconnew
                  name="file-multiple-outline"
                  style={{
                    backgroundColor: "#FFB703",
                    color: "white",
                    borderRadius: 5,
                    fontSize: 20,
                    paddingRight: 30,
                  }}
                />
              </View>
            </View>
          </View>
          {/* <View
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
          <View>
            <AntDesign name="stepforward" size={24} color="black" />
          </View>
        </View> */}
          {/* <View
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
        </View> */}
        </Swiper>
        <View style={{ paddingTop: 40, paddingLeft: 24 }}>
          <View>
            <Text style={styles.fullname}>Danh mục</Text>
          </View>
          <View>
            <Text style={{ color: "#023047" }}>Hôm nay bạn muốn xem gì ?</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View
            style={{
              justifyContent: "space-evenly",
              paddingTop: 44,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#FFB703",
                height: 116,
                width: 396,
                borderRadius: 28,
                marginHorizontal: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ExaminationCalendar")}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 22,
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#e5a503",
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ExaminationCalendarIcon />
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Lịch hẹn sắp tới
                    </Text>
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ color: "white", fontSize: 40 }}>04</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#FB8500",
                height: 116,
                width: 396,
                borderRadius: 28,
                marginHorizontal: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => modal.current?.open()}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 22,
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#e27800",
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ScheduleIcon />
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Đặt lịch khám mới
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#37A6F7",
                height: 116,
                width: 396,
                borderRadius: 28,
                marginHorizontal: 16,
              }}
            >
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
                  style={{
                    flexDirection: "row",
                    paddingLeft: 22,
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#3195de",
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MedicalRecordIcon />
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Hồ sơ bệnh án
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                backgroundColor: "#219EBC",
                height: 116,
                width: 396,
                borderRadius: 28,
                marginHorizontal: 16,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { screen: "Vaccination" })
                }
                activeOpacity={0.9}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 22,
                    alignItems: "center",
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#1e8ea9",
                      height: 40,
                      width: 40,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AdultVaccinationCalendarIcon />
                  </View>
                  <View style={{ paddingLeft: 40 }}>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Lịch chính ngừa
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ backgroundColor: "green", borderRadius: 20, padding: 20 }}
          >
            <TouchableOpacity>
              <Text>Dich vu cham soc suc khoe (theo mo ta Mr.Oh)</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{ backgroundColor: "yellow", borderRadius: 20, padding: 20 }}
          >
            <TouchableOpacity>
              <Text>Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalBottom heading="Đặt lịch khám">
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
      </ScrollView>
    </View>
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
    textAlign: "left",
  },
  code: {
    color: "white",
    fontFamily: "SFProDisplay-Medium",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
    paddingRight: 30,
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
