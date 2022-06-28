import { CardStyleInterpolators } from "@react-navigation/stack";
import { Platform } from "react-native";
import { Easing } from "react-native-reanimated";

const openAnimation = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 5,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeAnimation = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

export const settings = {
  hostURL: "https://mrapp.monamedia.net",
  android: Platform.OS === "android" ? 1 : 0,
  styles: {
    mainColor: "#142977",
    mainColorLight: "#E8F5F8",
    mainColorText: "#000",
    dangerColor: "#DC233C",
    dangerColorLight: "rgba(220, 35, 60, 0.1)",
    blueColor: "#219EBC",
    blueColorLight: "rgba(33, 158, 188, 0.1)",
    orangeColor: "#FB8500",
    orangeColorLight: "rgba(251, 133, 0, 0.1)",
    labelColor: "#808080",
    borderColor: "#CACEE1",
    placeholderColor: "#adb5bd",
    noteColor: "rgba(20, 41, 119, .5)",
    goldColor: "#FFB703",
    successColor: "#2ecc71",
    selectColor: "#8A90B6",
    sectionColor: "#F0F0F0",
    padding: 20,
  },
  animationIOS: {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
      open: openAnimation,
      close: closeAnimation,
    },
  },
  defaultData: {
    genders: [
      {
        Name: "Nữ",
        Id: 0,
      },
      {
        Name: "Nam",
        Id: 1,
      },
    ],
    medicalStory: ["THÔNG TIN CHUNG", "TIỀN SỬ", "CHUẨN ĐOÁN CHUNG"],
    diagnosis: [
      { shortName: "TOA THUỐC", name: "TOA THUỐC" },
      { shortName: "KẾT QUẢ XN", name: "KẾT QUẢ XÉT NGHIỆM" },
      { shortName: "HS BỆNH ÁN", name: "HỒ SƠ BỆNH ÁN" },
    ],
    bloods: [
      {
        Name: "0",
      },
      {
        Name: "A",
      },
      {
        Name: "B",
      },
      {
        Name: "AB",
      },
    ],
  },
};
