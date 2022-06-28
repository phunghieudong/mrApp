import React from "react";
import { Header, Icon, Text, Toast, View } from "native-base";
import { settings } from "@/config";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Logo from "../Logo";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";

const { height: dH } = Dimensions.get("window");
const { mainColor, goldColor, padding } = settings.styles;

type IProps = {
  title: string;
  previous?: () => void;
  hideRoute?: true;
  logo?: true;
  notifications?: false;
  filter?: () => void;
};

const CustomHeader = ({
  title,
  previous,
  hideRoute,
  logo,
  notifications,
  filter,
}: IProps) => {
  // navigation
  const navigation = useNavigation();

  // toast
  const showToast = () => {
    Toast.show({
      text: "Tính năng còn đang phát triển",
    });
  };

  return (
    <Header style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={mainColor} />
      <View style={styles.left}>
        <View style={styles.menu}>
          {previous && (
            <TouchableWithoutFeedback onPress={previous}>
              <Icon type="Ionicons" name="chevron-back" style={styles.back} />
            </TouchableWithoutFeedback>
          )}
          {!previous && (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile", { screen: "Menu" })}
            >
              <Icon type="Feather" name="menu" style={styles.bar} />
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
      <View
        style={[
          styles.mid,
          notifications === false && { right: 16 },
          filter && { right: 0 },
        ]}
      >
        {!hideRoute && <Text style={styles.dashboard}>{title}</Text>}
        {logo && (
          <Svg width="199.5" height="64.408" viewBox="0 0 199.5 64.408">
            <Defs>
              <LinearGradient
                id="linear-gradient"
                x1="0.018"
                y1="0.927"
                x2="0.983"
                y2="0.928"
                gradientUnits="objectBoundingBox"
              >
                <Stop offset="0" stopColor="#219ebc" />
                <Stop offset="0.389" stopColor="#45a3b1" />
                <Stop offset="0.394" stopColor="#efbc2e" />
                <Stop offset="0.714" stopColor="#efbc2e" />
                <Stop offset="0.716" stopColor="#fb8500" />
                <Stop offset="1" stopColor="#fb8500" />
              </LinearGradient>
            </Defs>
            <G
              id="Group_847"
              data-name="Group 847"
              transform="translate(-80.326 -152.382)"
            >
              <Path
                id="Path_2149"
                data-name="Path 2149"
                d="M513.656,872.017h17.1v16.121c0,4.342,3.151,5.855,6.044.46l5.974-15.394c1.81-4.674,1.945-7.066-2.085-9.97-2.308-1.658-5.664-3.922-10.49-7.392-3.239-2-3.754-3.731.738-3.678h12.112c5.148,0,6.525-.437,8.148-5.425l4.047-12.24c1.16-3.573-.082-5.907-3.661-5.907H534.953c-2.612,0-4.2,2.439-4.2,4.837v14.684l-1.583,1.6H513.656c-2.56,0-4.657.481-4.657,3.024V867.4a4.66,4.66,0,0,0,4.657,4.621Z"
                transform="translate(-427.647 -676.211)"
                fill="#f7f7f7"
                fill-rule="evenodd"
              />
              <Path
                id="Path_2140"
                data-name="Path 2140"
                d="M513.656,872.017h17.1v16.121c0,4.342,3.151,5.855,6.044.46l5.974-15.394c1.81-4.674,1.945-7.066-2.085-9.97-2.308-1.658-5.664-3.922-10.49-7.392-3.239-2-3.754-3.731.738-3.678h12.112c5.148,0,6.525-.437,8.148-5.425l4.047-12.24c1.16-3.573-.082-5.907-3.661-5.907H534.953c-2.612,0-4.2,2.439-4.2,4.837v14.684h-17.1A4.658,4.658,0,0,0,509,852.741V867.4a4.66,4.66,0,0,0,4.657,4.621Z"
                transform="translate(-428.674 -675.267)"
                fill="#219ebc"
                fill-rule="evenodd"
              />
              <Path
                id="Path_27"
                data-name="Path 27"
                d="M513.216,867.913H528.7v14.6c0,3.932,2.853,5.3,5.473.417l5.41-13.939c1.639-4.232,1.761-6.4-1.888-9.028-2.09-1.5-5.129-3.552-9.5-6.693-2.933-1.808-3.4-3.378.668-3.33h10.968c4.662,0,5.908-.4,7.377-4.912l3.665-11.083c1.05-3.236-.074-5.349-3.315-5.349H532.5c-2.365,0-3.8,2.208-3.8,4.38v13.3H513.216a4.217,4.217,0,0,0-4.216,4.19v13.27a4.22,4.22,0,0,0,4.216,4.184Z"
                transform="translate(-426.151 -670.212)"
                fill="#142977"
                stroke="rgba(0,0,0,0)"
                stroke-miterlimit="10"
                stroke-width="1"
                fill-rule="evenodd"
              />
              <Path
                id="Path_2138"
                data-name="Path 2138"
                d="M2.6-1.245H9.483V-18.221L15.838-1.245H21.39L27.705-18.18V-1.245h6.879V-29.484H26.5L18.654-9.934,10.73-29.484H2.6ZM46.41-11.664c0-3.862,1.891-4.988,5.149-4.988H53.45v-7.281a8.368,8.368,0,0,0-7.04,3.982v-3.741H39.532V-1.245H46.41Zm17.619,7.04a3.8,3.8,0,0,0-4.063-3.781,3.813,3.813,0,0,0-4.1,3.781,3.8,3.8,0,0,0,4.1,3.7A3.787,3.787,0,0,0,64.029-4.624ZM87.36-1.245h7.281L84.424-29.484H76.459L66.242-1.245h7.2l1.689-4.988H85.671ZM83.9-11.543H76.942L80.4-21.881Zm20.716-8.97v-3.178H97.739V9.455h6.879V-4.383a8.074,8.074,0,0,0,6.919,3.459c5.511,0,9.9-4.505,9.9-11.585s-4.385-11.5-9.9-11.5A7.913,7.913,0,0,0,104.618-20.514Zm9.815,8.005c0,3.58-2.333,5.591-4.948,5.591-2.574,0-4.908-1.971-4.908-5.551s2.333-5.551,4.908-5.551C112.1-18.02,114.433-16.089,114.433-12.509Zm17.5-4.344v-7.08h3.741c2.735,0,3.9,1.368,3.9,3.54s-1.167,3.54-3.9,3.54Zm14.642-3.54c0-5.189-3.459-9.091-10.378-9.091H125.052V-1.245h6.879V-11.382H136.2C143.4-11.382,146.573-15.727,146.573-20.393Z"
                transform="translate(132.753 197.442)"
                stroke="rgba(0,0,0,0)"
                stroke-miterlimit="10"
                stroke-width="1"
                fill="url(#linear-gradient)"
              />
            </G>
          </Svg>
        )}
      </View>
      <View style={styles.right}>
        {notifications !== false && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            activeOpacity={0.9}
          >
            <View style={styles.noti}>
              <Icon
                name="bell"
                type={"Fontisto" as any}
                style={styles.notiicon}
              />
              <View style={styles.badge} />
            </View>
          </TouchableOpacity>
        )}
        {filter && (
          <TouchableOpacity onPress={filter} activeOpacity={0.9}>
            <View style={styles.noti}>
              <Icon type="AntDesign" name="filter" style={styles.notiicon} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: mainColor,
    paddingLeft: padding,
    paddingRight: padding,
    height: dH * 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 0,
  },
  headerinner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  menu: {},
  menuicon: {
    fontSize: 30,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 100,
    color: mainColor,
    backgroundColor: "#fff",
  },
  back: {
    color: goldColor,
    fontSize: 24,
    paddingHorizontal: 6,
    paddingVertical: 4,
    left: -10,
  },
  bar: {
    color: "#fff",
    fontSize: 28,
    left: -6,
    padding: 4,
  },
  mid: {
    right: 4,
  },
  dashboard: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 1,
    fontFamily: "SFProDisplay-Heavy",
    color: goldColor,
    textTransform: "uppercase",
  },
  right: {},
  noti: {},
  notiicon: {
    color: "#fff",
  },
  badge: {
    width: 15,
    height: 15,
    backgroundColor: "#FD6E15",
    borderRadius: 100,
    position: "absolute",
    right: -3,
    top: -3,
  },
  children: {},
});

export default CustomHeader;
