import { HeaderRoot, Loading } from "@/components";
import { settings } from "@/config";
import { ProfileProps } from "@/navigation/types/Profile";
import { useAppDispatch } from "@/store/hook";
import { changeRoute } from "@/store/reducers/RouteSlice";
import { logout } from "@/store/reducers/UserSlice";
import _format from "@/utils/Base";
import { Container, Content, Text, Toast, View } from "native-base";
import React, { FC } from "react";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
  Rect,
} from "react-native-svg";
import { MenuItem } from "../../Block/Menu";

const { padding, mainColorText } = settings.styles;

const MenuScreen: FC<ProfileProps> = ({ navigation }) => {
  // redux
  const dispatch = useAppDispatch();

  // toast
  const showToast = () => {
    Toast.show({
      text: "Chức năng còn đang phát triển",
    });
  };

  // menu
  const menuLeft = [
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_933"
                data-name="Rectangle 933"
                width="20"
                height="20"
                transform="translate(37 132)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_341"
            data-name="Mask Group 341"
            transform="translate(-37 -132)"
            clipPath="url(#clipPath)"
          >
            <G
              id="user_12_"
              data-name="user (12)"
              transform="translate(37 132)"
            >
              <G id="Group_928" data-name="Group 928">
                <Path
                  id="Path_2246"
                  data-name="Path 2246"
                  d="M19.949,17.138a.781.781,0,0,0-1.53.318.816.816,0,0,1-.165.684.794.794,0,0,1-.625.3H2.371a.794.794,0,0,1-.625-.3.816.816,0,0,1-.165-.684,8.632,8.632,0,0,1,8.212-6.835q.1,0,.207,0t.208,0a8.594,8.594,0,0,1,6.941,3.815.781.781,0,1,0,1.3-.87,10.162,10.162,0,0,0-5.266-4,5.312,5.312,0,1,0-6.359,0A10.161,10.161,0,0,0,.051,17.138,2.373,2.373,0,0,0,2.371,20H17.629a2.374,2.374,0,0,0,2.32-2.862ZM6.25,5.313a3.75,3.75,0,1,1,3.94,3.745l-.19,0-.189,0A3.755,3.755,0,0,1,6.25,5.313Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Hồ sơ\ncá nhân",
      navigate: () => navigation.navigate("PatientProfile"),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1064"
                data-name="Rectangle 1064"
                width="20"
                height="20"
                transform="translate(37 206)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_346"
            data-name="Mask Group 346"
            transform="translate(-37 -206)"
            clipPath="url(#clipPath)"
          >
            <G
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(36.333 205.333)"
            >
              <Path
                id="Path_2254"
                data-name="Path 2254"
                d="M17.153.667H4.18A2.187,2.187,0,0,0,2,2.847v15.64a2.187,2.187,0,0,0,2.18,2.18H9.653a2.873,2.873,0,0,0,2.173-1l6.667-7.76a3.4,3.4,0,0,0,.84-2.267V2.847a2.187,2.187,0,0,0-2.18-2.18Zm-5.82,17.507v-5.46a1.38,1.38,0,0,1,1.373-1.38h4.507Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Hướng dẫn\nsử dụng",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1065"
                data-name="Rectangle 1065"
                width="20"
                height="20"
                transform="translate(136 142)"
                fill="#fff"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_314"
            data-name="Mask Group 314"
            transform="translate(-136 -142)"
            clipPath="url(#clipPath)"
          >
            <G
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(136 144.415)"
            >
              <Path
                id="Path_2167"
                data-name="Path 2167"
                d="M10.4,8.968H5.066a.667.667,0,1,0,0,1.333H10.4a.667.667,0,1,0,0-1.333Z"
                transform="translate(-1.067 -3.645)"
                fill="#fff"
              />
              <Path
                id="Path_2168"
                data-name="Path 2168"
                d="M10.4,13.031H5.066a.667.667,0,1,0,0,1.333H10.4a.667.667,0,1,0,0-1.333Z"
                transform="translate(-1.067 -4.014)"
                fill="#fff"
              />
              <Path
                id="Path_2169"
                data-name="Path 2169"
                d="M21.312,3.676a2.053,2.053,0,0,0-2.827,0L13.9,8.283a1.14,1.14,0,0,0-.34.813v1.187a1.16,1.16,0,0,0,1.16,1.16H15.9a1.187,1.187,0,0,0,.82-.34l4.566-4.573a2,2,0,0,0,0-2.827Z"
                transform="translate(-1.899 -3.112)"
                fill="#fff"
              />
              <Path
                id="Path_2170"
                data-name="Path 2170"
                d="M20.066,8.88a.667.667,0,0,0-.667.667v6.7a.747.747,0,0,1-.753.753H2.82a.747.747,0,0,1-.753-.753V5.753A.747.747,0,0,1,2.82,5H14.006a.667.667,0,0,0,0-1.333H2.82A2.087,2.087,0,0,0,.733,5.753V16.246A2.087,2.087,0,0,0,2.82,18.333H18.646a2.087,2.087,0,0,0,2.087-2.087V9.58a.667.667,0,0,0-.667-.7Z"
                transform="translate(-0.733 -3.163)"
                fill="#fff"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Hồ sơ\nbệnh án",
      navigate: () => navigation.navigate("ServiceAccount"),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1066"
                data-name="Rectangle 1066"
                width="20"
                height="20"
                transform="translate(37 354)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_347"
            data-name="Mask Group 347"
            transform="translate(-37 -354)"
            clipPath="url(#clipPath)"
          >
            <G id="setting-lines" transform="translate(37 354)">
              <Path
                id="Path_2255"
                data-name="Path 2255"
                d="M4.274,3.48H.588a.588.588,0,0,1,0-1.176H4.274a.588.588,0,0,1,0,1.176Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2256"
                data-name="Path 2256"
                d="M6.38,5.586A2.694,2.694,0,1,1,9.074,2.892,2.7,2.7,0,0,1,6.38,5.586Zm0-4.212A1.518,1.518,0,1,0,7.9,2.892,1.52,1.52,0,0,0,6.38,1.374Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2257"
                data-name="Path 2257"
                d="M19.412,3.48H10.62a.588.588,0,0,1,0-1.176h8.792a.588.588,0,0,1,0,1.176Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2258"
                data-name="Path 2258"
                d="M14.278,12.694A2.694,2.694,0,1,1,16.972,10,2.7,2.7,0,0,1,14.278,12.694Zm0-4.212A1.518,1.518,0,1,0,15.8,10,1.519,1.519,0,0,0,14.278,8.482Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2259"
                data-name="Path 2259"
                d="M10.038,10.588H.588a.588.588,0,0,1,0-1.176h9.45a.588.588,0,0,1,0,1.176Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2260"
                data-name="Path 2260"
                d="M19.412,10.588H16.384a.588.588,0,1,1,0-1.176h3.028a.588.588,0,0,1,0,1.176Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2261"
                data-name="Path 2261"
                d="M5.722,19.8a2.694,2.694,0,1,1,2.694-2.695A2.7,2.7,0,0,1,5.722,19.8Zm0-4.212A1.518,1.518,0,1,0,7.24,17.108,1.519,1.519,0,0,0,5.722,15.59Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2262"
                data-name="Path 2262"
                d="M19.412,17.7H9.962a.588.588,0,0,1,0-1.176h9.45a.588.588,0,0,1,0,1.176Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2263"
                data-name="Path 2263"
                d="M3.616,17.7H.588a.588.588,0,0,1,0-1.177H3.616a.588.588,0,0,1,0,1.177Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Cài đặt",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1067"
                data-name="Rectangle 1067"
                width="20"
                height="20"
                transform="translate(37 412)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_342"
            data-name="Mask Group 342"
            transform="translate(-37 -412)"
            clipPath="url(#clipPath)"
          >
            <Path
              id="video-camera-2"
              d="M19.743,5.122a.586.586,0,0,0-.546-.059L13.724,7.252V5.607a1.843,1.843,0,0,0-1.841-1.841H1.841A1.843,1.843,0,0,0,0,5.607v8.786a1.843,1.843,0,0,0,1.841,1.841H11.883a1.843,1.843,0,0,0,1.841-1.841V12.748L19.2,14.937a.586.586,0,0,0,.8-.544V5.607a.586.586,0,0,0-.257-.485Zm-7.19,9.272a.67.67,0,0,1-.669.669H1.841a.67.67,0,0,1-.669-.669V5.607a.67.67,0,0,1,.669-.669H11.883a.67.67,0,0,1,.669.669Zm6.276-.865-5.1-2.042V8.514l5.1-2.042Z"
              transform="translate(37 412)"
              fill="#219ebc"
            />
          </G>
        </Svg>
      ),
      text: "Tư vấn khám\ntrực tiếp",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1065"
                data-name="Rectangle 1065"
                width="20"
                height="20"
                transform="translate(136 142)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_314"
            data-name="Mask Group 314"
            transform="translate(-136 -142)"
            clipPath="url(#clipPath)"
          >
            <G
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(136 144.415)"
            >
              <Path
                id="Path_2167"
                data-name="Path 2167"
                d="M10.4,8.968H5.066a.667.667,0,1,0,0,1.333H10.4a.667.667,0,1,0,0-1.333Z"
                transform="translate(-1.067 -3.645)"
                fill="#219ebc"
              />
              <Path
                id="Path_2168"
                data-name="Path 2168"
                d="M10.4,13.031H5.066a.667.667,0,1,0,0,1.333H10.4a.667.667,0,1,0,0-1.333Z"
                transform="translate(-1.067 -4.014)"
                fill="#219ebc"
              />
              <Path
                id="Path_2169"
                data-name="Path 2169"
                d="M21.312,3.676a2.053,2.053,0,0,0-2.827,0L13.9,8.283a1.14,1.14,0,0,0-.34.813v1.187a1.16,1.16,0,0,0,1.16,1.16H15.9a1.187,1.187,0,0,0,.82-.34l4.566-4.573a2,2,0,0,0,0-2.827Z"
                transform="translate(-1.899 -3.112)"
                fill="#219ebc"
              />
              <Path
                id="Path_2170"
                data-name="Path 2170"
                d="M20.066,8.88a.667.667,0,0,0-.667.667v6.7a.747.747,0,0,1-.753.753H2.82a.747.747,0,0,1-.753-.753V5.753A.747.747,0,0,1,2.82,5H14.006a.667.667,0,0,0,0-1.333H2.82A2.087,2.087,0,0,0,.733,5.753V16.246A2.087,2.087,0,0,0,2.82,18.333H18.646a2.087,2.087,0,0,0,2.087-2.087V9.58a.667.667,0,0,0-.667-.7Z"
                transform="translate(-0.733 -3.163)"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Câu hỏi\nthường gặp",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1069"
                data-name="Rectangle 1069"
                width="20"
                height="20"
                transform="translate(37 560)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_343"
            data-name="Mask Group 343"
            transform="translate(-37 -560)"
            clipPath="url(#clipPath)"
          >
            <G id="lock_1_" data-name="lock (1)" transform="translate(37 560)">
              <G id="Group_929" data-name="Group 929">
                <Path
                  id="Path_2247"
                  data-name="Path 2247"
                  d="M17.083,7.5h-1.25V5.833a5.833,5.833,0,1,0-11.667,0V7.5H2.917a.416.416,0,0,0-.417.417V18.333A1.668,1.668,0,0,0,4.167,20H15.833A1.668,1.668,0,0,0,17.5,18.333V7.917A.416.416,0,0,0,17.083,7.5Zm-5.836,8.7a.417.417,0,0,1-.414.463H9.167a.417.417,0,0,1-.414-.463l.263-2.364a1.648,1.648,0,0,1-.682-1.34,1.667,1.667,0,0,1,3.333,0,1.648,1.648,0,0,1-.682,1.34Zm2.086-8.7H6.667V5.833a3.333,3.333,0,1,1,6.667,0Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Chính sách",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1070"
                data-name="Rectangle 1070"
                width="20"
                height="20"
                transform="translate(37 618)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_344"
            data-name="Mask Group 344"
            transform="translate(-37 -618)"
            clipPath="url(#clipPath)"
          >
            <G
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(35.571 616.571)"
            >
              <Path
                id="Path_2248"
                data-name="Path 2248"
                d="M20,2.857H8.571a1.429,1.429,0,0,0,0,2.857H20a1.429,1.429,0,1,0,0-2.857Z"
                fill="#219ebc"
              />
              <Circle
                id="Ellipse_146"
                data-name="Ellipse 146"
                cx="1.429"
                cy="1.429"
                r="1.429"
                transform="translate(1.429 2.857)"
                fill="#219ebc"
              />
              <Path
                id="Path_2249"
                data-name="Path 2249"
                d="M20,10H8.571a1.429,1.429,0,0,0,0,2.857H20A1.429,1.429,0,1,0,20,10Z"
                fill="#219ebc"
              />
              <Circle
                id="Ellipse_147"
                data-name="Ellipse 147"
                cx="1.429"
                cy="1.429"
                r="1.429"
                transform="translate(1.429 10)"
                fill="#219ebc"
              />
              <Path
                id="Path_2250"
                data-name="Path 2250"
                d="M20,17.143H8.571a1.429,1.429,0,0,0,0,2.857H20a1.429,1.429,0,1,0,0-2.857Z"
                fill="#219ebc"
              />
              <Circle
                id="Ellipse_148"
                data-name="Ellipse 148"
                cx="1.429"
                cy="1.429"
                r="1.429"
                transform="translate(1.429 17.143)"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Quy trình\nkhám bệnh",
      navigate: () => Toast.show({ text: "Tính năng còn đang phát triển" }),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_1071"
                data-name="Rectangle 1071"
                width="20"
                height="20"
                transform="translate(37 692)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_345"
            data-name="Mask Group 345"
            transform="translate(-37 -692)"
            clipPath="url(#clipPath)"
          >
            <G
              id="Layer_2"
              data-name="Layer 2"
              transform="translate(36.333 691.333)"
            >
              <Path
                id="Path_2251"
                data-name="Path 2251"
                d="M14.873,20.667H9.787a1.853,1.853,0,0,1-1.24-.473L2.613,14.86A1.86,1.86,0,0,1,2,13.507V2.46A1.793,1.793,0,0,1,3.793.667h11.08A1.793,1.793,0,0,1,16.667,2.46V18.873a1.793,1.793,0,0,1-1.793,1.793ZM3.793,2a.46.46,0,0,0-.46.46V13.507a.527.527,0,0,0,.173.393L9.44,19.233a.52.52,0,0,0,.347.133h5.087a.46.46,0,0,0,.46-.46V2.46a.46.46,0,0,0-.46-.46Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2252"
                data-name="Path 2252"
                d="M10,19.627H8.667V14.833a.127.127,0,0,0-.127-.127H2.667V13.373H8.54A1.46,1.46,0,0,1,10,14.833Z"
                fill="#219ebc"
              />
              <Rect
                id="Rectangle_1152"
                data-name="Rectangle 1152"
                width="6.667"
                height="1.333"
                rx="0.667"
                transform="translate(5.78 6.873)"
                fill="#219ebc"
              />
              <Rect
                id="Rectangle_1153"
                data-name="Rectangle 1153"
                width="2.667"
                height="1.333"
                rx="0.667"
                transform="translate(5.78 4)"
                fill="#219ebc"
              />
              <Path
                id="Path_2253"
                data-name="Path 2253"
                d="M17.667,17.767a1.694,1.694,0,0,1-.333-.033l-1.433-.24.22-1.333,1.46.247a.353.353,0,0,0,.307-.06.333.333,0,0,0,.127-.26V5.233a.34.34,0,0,0-.407-.327l-1.507.2-.173-1.333,1.46-.193a1.62,1.62,0,0,1,1.333.347,1.66,1.66,0,0,1,.613,1.307V16.1a1.673,1.673,0,0,1-1.667,1.667Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Tin tức",
      navigate: () => navigation.navigate("News"),
    },
    {
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clipPath">
              <Rect
                id="Rectangle_815"
                data-name="Rectangle 815"
                width="20"
                height="20"
                transform="translate(30 1211)"
                fill="#e85d04"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_235"
            data-name="Mask Group 235"
            transform="translate(-30 -1211)"
            clipPath="url(#clipPath)"
          >
            <G id="layer1" transform="translate(28 110.484)">
              <Path
                id="path52"
                d="M11.989,1100.516a1,1,0,0,0-.99,1.016v8.038a1,1,0,1,0,2,0v-8.038a1,1,0,0,0-1.012-1.016Zm5.835,2.015c-.033,0-.065,0-.1,0a1.006,1.006,0,0,0-.555,1.773,8,8,0,1,1-10.372.029,1.008,1.008,0,0,0,.111-1.417,1,1,0,0,0-1.41-.112,10.075,10.075,0,0,0,6.5,17.708,10.074,10.074,0,0,0,6.46-17.738,1,1,0,0,0-.641-.247Z"
                fill="#e85d04"
              />
            </G>
          </G>
        </Svg>
      ),
      text: "Đăng xuất",
      navigate: async () => {
        await dispatch(changeRoute({ route: "auth", initialRoute: "SignIn" }));
        await dispatch(logout());
      },
    },
  ];

  const menuRight = [
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1074"
                data-name="Rectangle 1074"
                width="36"
                height="36"
                transform="translate(123 334)"
                fill="#142977"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_388"
            data-name="Mask Group 388"
            transform="translate(-123 -334)"
            clipPath="url(#clip-path)"
          >
            <G id="hospital-5" transform="translate(123 334)">
              <G id="Group_1032" data-name="Group 1032">
                <G id="Group_1031" data-name="Group 1031">
                  <G id="Group_1030" data-name="Group 1030">
                    <G id="Group_1029" data-name="Group 1029">
                      <G id="Group_1028" data-name="Group 1028">
                        <G id="Group_1027" data-name="Group 1027">
                          <Path
                            id="Path_2349"
                            data-name="Path 2349"
                            d="M14.139,18.885h7.722V31.1H14.139Z"
                            fill="#b2f0fb"
                          />
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
              <G id="Group_1033" data-name="Group 1033">
                <Path
                  id="Path_2350"
                  data-name="Path 2350"
                  d="M13.835,12.679h1.918V14.6a.7.7,0,0,0,.7.7h3.088a.7.7,0,0,0,.7-.7V12.679h1.918a.7.7,0,0,0,.7-.7V8.888a.7.7,0,0,0-.7-.7H20.247V6.267a.7.7,0,0,0-.7-.7H16.456a.7.7,0,0,0-.7.7V8.185H13.835a.7.7,0,0,0-.7.7v3.088a.7.7,0,0,0,.7.7Zm.7-3.088h1.918a.7.7,0,0,0,.7-.7V6.97h1.681V8.888a.7.7,0,0,0,.7.7h1.918v1.682H19.544a.7.7,0,0,0-.7.7v1.918H17.159V11.975a.7.7,0,0,0-.7-.7H14.538Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2351"
                  data-name="Path 2351"
                  d="M35.3,30.394h-.612V14.351a.7.7,0,0,0-.7-.7H26.875V2.681h.038a.7.7,0,0,0,0-1.406H9.087a.7.7,0,0,0,0,1.406h.038V13.648H2.018a.7.7,0,0,0-.7.7V30.394H.7a.7.7,0,0,0-.7.7v2.925a.7.7,0,0,0,.7.7H35.3a.7.7,0,0,0,.7-.7V31.1a.7.7,0,0,0-.7-.7Zm-2.018-15.34V19.08h-2.6a.7.7,0,0,0,0,1.406h2.6V24.9h-2.6a.7.7,0,0,0,0,1.406h2.6v4.092h-6.4V15.054ZM25.468,2.681V30.394H10.532V2.681ZM2.721,26.3h2.6a.7.7,0,0,0,0-1.406h-2.6v-4.41h2.6a.7.7,0,0,0,0-1.406h-2.6V15.054h6.4v15.34h-6.4Zm31.873,7.017H1.406V31.8H34.594Z"
                  fill="#142977"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Mã hồ sơ\nbệnh viện",
      navigate: () => navigation.navigate("HospitalCode"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1082"
                data-name="Rectangle 1082"
                width="36"
                height="36"
                transform="translate(217 334)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_389"
            data-name="Mask Group 389"
            transform="translate(-217 -334)"
            clipPath="url(#clip-path)"
          >
            <G id="clipboard-2" transform="translate(217 334)">
              <G id="Group_1034" data-name="Group 1034">
                <Path
                  id="Path_2352"
                  data-name="Path 2352"
                  d="M29.079,5.333A2.212,2.212,0,0,0,26.87,3.123H20.576a.7.7,0,1,0,0,1.406H26.87a.8.8,0,0,1,.8.8V27.279H24.184a.7.7,0,0,0-.7.7V31.47H9.131a.8.8,0,0,1-.8-.8V5.333a.8.8,0,0,1,.8-.8h6.432a.7.7,0,1,0,0-1.406H9.131A2.212,2.212,0,0,0,6.921,5.333V30.667a2.212,2.212,0,0,0,2.209,2.209H26.869a2.212,2.212,0,0,0,2.209-2.209ZM24.887,28.685h1.791l-1.791,1.791ZM26.87,31.47h-.988l1.791-1.791v.988A.8.8,0,0,1,26.87,31.47Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2353"
                  data-name="Path 2353"
                  d="M15.622,9.5l-1.871,3.345h-1.8a.7.7,0,0,0,0,1.406h2.208a.7.7,0,0,0,.614-.36l1.2-2.141,1.17,4.826a.7.7,0,0,0,1.265.229l1.966-2.9.426.834a.7.7,0,0,0,.618.383l2.617.03a.7.7,0,0,0,.016-1.406l-2.192-.025L21.087,12.2a.7.7,0,0,0-1.208-.075L18.137,14.7,16.919,9.675a.7.7,0,0,0-1.3-.178Z"
                  fill="#142977"
                />
              </G>
              <G id="Group_1054" data-name="Group 1054">
                <G id="Group_1040" data-name="Group 1040">
                  <G id="Group_1039" data-name="Group 1039">
                    <G id="Group_1038" data-name="Group 1038">
                      <G id="Group_1037" data-name="Group 1037">
                        <G id="Group_1036" data-name="Group 1036">
                          <G id="Group_1035" data-name="Group 1035">
                            <Path
                              id="Path_2354"
                              data-name="Path 2354"
                              d="M12.048.7V1.841a4.37,4.37,0,0,0,4.37,4.37h3.163a4.37,4.37,0,0,0,4.37-4.37V.7Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
                <G id="Group_1046" data-name="Group 1046">
                  <G id="Group_1045" data-name="Group 1045">
                    <G id="Group_1044" data-name="Group 1044">
                      <G id="Group_1043" data-name="Group 1043">
                        <G id="Group_1042" data-name="Group 1042">
                          <G id="Group_1041" data-name="Group 1041">
                            <Path
                              id="Path_2355"
                              data-name="Path 2355"
                              d="M28.619,36H7.381A3.589,3.589,0,0,1,3.8,32.415V3.585A3.589,3.589,0,0,1,7.381,0H28.619A3.589,3.589,0,0,1,32.2,3.585v28.83A3.589,3.589,0,0,1,28.619,36ZM7.381,1.406A2.181,2.181,0,0,0,5.2,3.585v28.83a2.181,2.181,0,0,0,2.179,2.179H28.619A2.181,2.181,0,0,0,30.8,32.415V3.585a2.181,2.181,0,0,0-2.179-2.179Z"
                              fill="#142977"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
                <G id="Group_1053" data-name="Group 1053">
                  <G id="Group_1052" data-name="Group 1052">
                    <G id="Group_1051" data-name="Group 1051">
                      <G id="Group_1050" data-name="Group 1050">
                        <G id="Group_1049" data-name="Group 1049">
                          <G id="Group_1048" data-name="Group 1048">
                            <G id="Group_1047" data-name="Group 1047">
                              <Path
                                id="Path_2356"
                                data-name="Path 2356"
                                d="M19.942,19.237a2,2,0,0,0-1.884,1.029.069.069,0,0,1-.121,0,2,2,0,0,0-1.881-1.029,2.4,2.4,0,0,0-2.483,2.541,3.441,3.441,0,0,0,.513,1.869c.768,1.295,3.3,2.362,3.817,2.693a.175.175,0,0,0,.188,0c.52-.329,3.05-1.388,3.824-2.693a3.44,3.44,0,0,0,.512-1.869A2.4,2.4,0,0,0,19.942,19.237Z"
                                fill="#b2f0fb"
                              />
                            </G>
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Hình ảnh",
      navigate: () => navigation.navigate("Folder"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1083"
                data-name="Rectangle 1083"
                width="36"
                height="36"
                transform="translate(311 334)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_390"
            data-name="Mask Group 390"
            transform="translate(-311 -334)"
            clipPath="url(#clip-path)"
          >
            <G id="blood-tube" transform="translate(311 334)">
              <G id="Group_1061" data-name="Group 1061">
                <G id="Group_1060" data-name="Group 1060">
                  <G id="Group_1059" data-name="Group 1059">
                    <G id="Group_1058" data-name="Group 1058">
                      <G id="Group_1057" data-name="Group 1057">
                        <G id="Group_1056" data-name="Group 1056">
                          <G id="Group_1055" data-name="Group 1055">
                            <Path
                              id="Path_2357"
                              data-name="Path 2357"
                              d="M6.482,15.9V30.775a4.518,4.518,0,1,0,9.035,0V15.9Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
              <G id="Group_1062" data-name="Group 1062">
                <Path
                  id="Path_2358"
                  data-name="Path 2358"
                  d="M17.01,2.938H15.743V.7a.7.7,0,0,0-.7-.7H6.559a.7.7,0,0,0-.7.7V2.938H4.989a.7.7,0,0,0-.7.7V6.93a.7.7,0,0,0,.7.7h.79V30.779a5.221,5.221,0,0,0,10.441,0V7.633h.79a.7.7,0,0,0,.7-.7V3.641a.7.7,0,0,0-.7-.7ZM7.262,1.406h7.075V2.938H7.262Zm7.552,29.373a3.814,3.814,0,1,1-7.629,0V7.633h7.629ZM16.307,6.227H5.692V4.344H16.307Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2359"
                  data-name="Path 2359"
                  d="M29.695,11.988H20.525a2.021,2.021,0,0,0-2.019,2.019v7.132a2.022,2.022,0,0,0,1.445,1.935l.194.809a.7.7,0,0,0,1.075.421l1.714-1.147h6.762a2.021,2.021,0,0,0,2.019-2.019V14.006a2.021,2.021,0,0,0-2.019-2.019Zm.613,9.15a.613.613,0,0,1-.613.612H22.72a.7.7,0,0,0-.391.119l-1.052.7-.068-.283a.7.7,0,0,0-.684-.539.613.613,0,0,1-.613-.612V14.006a.613.613,0,0,1,.613-.612h9.169a.613.613,0,0,1,.613.612Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2360"
                  data-name="Path 2360"
                  d="M27.676,15.71a.7.7,0,0,0-.988.114l-1.834,2.314L23.839,17.2a.7.7,0,0,0-.955,1.033l1.573,1.454a.7.7,0,0,0,.477.187l.054,0a.7.7,0,0,0,.5-.264l2.3-2.908a.7.7,0,0,0-.114-.988Z"
                  fill="#020288"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Kết quả\nxét nghiệm",
      navigate: () => navigation.navigate("TestResult"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1089"
                data-name="Rectangle 1089"
                width="36"
                height="36"
                transform="translate(123 444)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_391"
            data-name="Mask Group 391"
            transform="translate(-123 -444)"
            clipPath="url(#clip-path)"
          >
            <G id="injection" transform="translate(123 444)">
              <G id="Group_1069" data-name="Group 1069">
                <G id="Group_1068" data-name="Group 1068">
                  <G id="Group_1067" data-name="Group 1067">
                    <G id="Group_1066" data-name="Group 1066">
                      <G id="Group_1065" data-name="Group 1065">
                        <G id="Group_1064" data-name="Group 1064">
                          <G id="Group_1063" data-name="Group 1063">
                            <Path
                              id="Path_2361"
                              data-name="Path 2361"
                              d="M10.45,18.271,7.436,21.288a2.578,2.578,0,0,0,0,3.643l3.641,3.645a2.571,2.571,0,0,0,3.639,0L25.009,18.271Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
              <G id="Group_1070" data-name="Group 1070">
                <Path
                  id="Path_2362"
                  data-name="Path 2362"
                  d="M35.774,10.722,25.27.206a.7.7,0,0,0-.995,0L23.143,1.34a2.072,2.072,0,0,0,0,2.925l2.548,2.551L24.016,8.493,20.5,4.978a.7.7,0,0,0-.995,0L18.18,6.309a1.793,1.793,0,0,0,0,2.531l.348.348-11.59,11.6a3.285,3.285,0,0,0-.066,4.569L5.69,26.545a.7.7,0,0,0,0,.994l.894.9L.226,34.8a.7.7,0,1,0,.995.994l6.357-6.365.893.894a.7.7,0,0,0,.995,0l1.182-1.183a3.274,3.274,0,0,0,4.565-.067L26.8,17.471l.347.347a1.788,1.788,0,0,0,2.53,0l1.33-1.331a.7.7,0,0,0,0-.994L27.5,11.977,29.171,10.3l2.547,2.55a2.066,2.066,0,0,0,2.924,0l1.133-1.134a.7.7,0,0,0,0-.994ZM8.968,28.832,7.181,27.042l.684-.685,1.787,1.789Zm5.25-.752a1.868,1.868,0,0,1-2.644,0L7.933,24.435a1.877,1.877,0,0,1,0-2.649l11.588-11.6,6.286,6.293ZM28.684,16.825a.382.382,0,0,1-.541,0L19.175,7.846a.385.385,0,0,1,0-.543l.832-.833,9.51,9.521ZM26.5,10.982,25.01,9.488l1.675-1.677,1.492,1.494Zm7.145.874a.66.66,0,0,1-.934,0L24.138,3.272a.664.664,0,0,1,0-.937l.635-.636,9.51,9.521Z"
                  fill="#142977"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Lịch tiêm chủng",
      navigate: () => navigation.navigate("Vaccination"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1086"
                data-name="Rectangle 1086"
                width="36"
                height="36"
                transform="translate(217 444)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_392"
            data-name="Mask Group 392"
            transform="translate(-217 -444)"
            clipPath="url(#clip-path)"
          >
            <G id="clipboard-3" transform="translate(217 444)">
              <G id="Group_1083" data-name="Group 1083">
                <Path
                  id="Path_2363"
                  data-name="Path 2363"
                  d="M15.753,9.679V11.6H13.835a.7.7,0,0,0-.7.7v3.088a.7.7,0,0,0,.7.7h1.918v1.918a.7.7,0,0,0,.7.7h3.088a.7.7,0,0,0,.7-.7V16.091h1.918a.7.7,0,0,0,.7-.7V12.3a.7.7,0,0,0-.7-.7H20.247V9.679a.7.7,0,0,0-.7-.7H16.456a.7.7,0,0,0-.7.7ZM17.159,12.3V10.382h1.682V12.3a.7.7,0,0,0,.7.7h1.918v1.682H19.544a.7.7,0,0,0-.7.7v1.918H17.159V15.388a.7.7,0,0,0-.7-.7H14.538V13h1.918a.7.7,0,0,0,.7-.7Z"
                  fill="#020288"
                />
                <Path
                  id="Path_2364"
                  data-name="Path 2364"
                  d="M26.869,3.123H20.576a.7.7,0,1,0,0,1.406h6.294a.8.8,0,0,1,.8.8V27.279H24.184a.7.7,0,0,0-.7.7V31.47H9.131a.8.8,0,0,1-.8-.8V5.333a.8.8,0,0,1,.8-.8h6.432a.7.7,0,0,0,0-1.406H9.131A2.212,2.212,0,0,0,6.921,5.333V30.667a2.212,2.212,0,0,0,2.209,2.209H26.869a2.212,2.212,0,0,0,2.209-2.209V5.333A2.212,2.212,0,0,0,26.869,3.123ZM24.887,28.685h1.791l-1.791,1.791Zm2.785,1.982a.8.8,0,0,1-.8.8h-.988l1.791-1.791Z"
                  fill="#142977"
                />
                <G id="Group_1076" data-name="Group 1076">
                  <G id="Group_1075" data-name="Group 1075">
                    <G id="Group_1074" data-name="Group 1074">
                      <G id="Group_1073" data-name="Group 1073">
                        <G id="Group_1072" data-name="Group 1072">
                          <G id="Group_1071" data-name="Group 1071">
                            <Path
                              id="Path_2365"
                              data-name="Path 2365"
                              d="M12.048.7V1.841a4.37,4.37,0,0,0,4.37,4.37h3.163a4.37,4.37,0,0,0,4.37-4.37V.7Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
                <G id="Group_1082" data-name="Group 1082">
                  <G id="Group_1081" data-name="Group 1081">
                    <G id="Group_1080" data-name="Group 1080">
                      <G id="Group_1079" data-name="Group 1079">
                        <G id="Group_1078" data-name="Group 1078">
                          <G id="Group_1077" data-name="Group 1077">
                            <Path
                              id="Path_2366"
                              data-name="Path 2366"
                              d="M12.048,21.26h11.9v3.566h-11.9Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
              <G id="Group_1089" data-name="Group 1089">
                <G id="Group_1088" data-name="Group 1088">
                  <G id="Group_1087" data-name="Group 1087">
                    <G id="Group_1086" data-name="Group 1086">
                      <G id="Group_1085" data-name="Group 1085">
                        <G id="Group_1084" data-name="Group 1084">
                          <Path
                            id="Path_2367"
                            data-name="Path 2367"
                            d="M28.619,36H7.381A3.589,3.589,0,0,1,3.8,32.415V3.585A3.589,3.589,0,0,1,7.381,0H28.619A3.589,3.589,0,0,1,32.2,3.585v28.83A3.589,3.589,0,0,1,28.619,36ZM7.381,1.406A2.181,2.181,0,0,0,5.2,3.585v28.83a2.181,2.181,0,0,0,2.179,2.179H28.619A2.181,2.181,0,0,0,30.8,32.415V3.585a2.181,2.181,0,0,0-2.179-2.179Z"
                            fill="#142977"
                          />
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Toa thuốc",
      navigate: () => navigation.navigate("Prescription"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1087"
                data-name="Rectangle 1087"
                width="36"
                height="36"
                transform="translate(311 444)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_394"
            data-name="Mask Group 394"
            transform="translate(-311 -444)"
            clipPath="url(#clip-path)"
          >
            <G id="allergy" transform="translate(309.558 442.556)">
              <G id="Group_1103" data-name="Group 1103">
                <Circle
                  id="Ellipse_161"
                  data-name="Ellipse 161"
                  cx="6.047"
                  cy="6.047"
                  r="6.047"
                  transform="translate(19.443 20.787)"
                  fill="#b2f0fb"
                />
                <Circle
                  id="Ellipse_162"
                  data-name="Ellipse 162"
                  cx="1.375"
                  cy="1.375"
                  r="1.375"
                  transform="translate(24.115 25.459)"
                  fill="#ededf9"
                />
              </G>
              <G id="Group_1105" data-name="Group 1105">
                <Path
                  id="Path_2372"
                  data-name="Path 2372"
                  d="M25.984,12.019a.532.532,0,0,0-.532.532v1.158a.532.532,0,1,0,1.063,0V12.551a.532.532,0,0,0-.532-.532Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2373"
                  data-name="Path 2373"
                  d="M11.781,27.531a.532.532,0,1,0,1.063,0v-3.26a4.157,4.157,0,0,0-.693-2.3L8.145,15.909a1.595,1.595,0,1,1,2.661-1.759l1.063,1.607a.532.532,0,0,0,.975-.293V7.707A1.227,1.227,0,0,1,13.9,6.462a1.177,1.177,0,0,1,1.3,1.166v7.24a.532.532,0,1,0,1.063,0V3.682a1.177,1.177,0,0,1,1.3-1.169,1.227,1.227,0,0,1,1.059,1.246V14.868a.532.532,0,1,0,1.063,0V6.62a1.181,1.181,0,0,1,.386-.872,1.166,1.166,0,0,1,.91-.3,1.227,1.227,0,0,1,1.059,1.246v8.175a.532.532,0,0,0,1.063,0V9.059a1.177,1.177,0,0,1,1.3-1.172,1.227,1.227,0,0,1,1.059,1.246v1.634a.532.532,0,1,0,1.063,0V9.132a2.3,2.3,0,0,0-2.022-2.3,2.255,2.255,0,0,0-1.4.324v-.46a2.3,2.3,0,0,0-2.022-2.3,2.254,2.254,0,0,0-1.4.324V3.758a2.3,2.3,0,0,0-2.022-2.3A2.24,2.24,0,0,0,15.2,3.679V5.728A2.259,2.259,0,0,0,13.8,5.4a2.3,2.3,0,0,0-2.016,2.3V13.7l-.089-.134A2.659,2.659,0,1,0,7.257,16.5l4.009,6.058a3.1,3.1,0,0,1,.516,1.717Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2374"
                  data-name="Path 2374"
                  d="M14.136,35.032a.532.532,0,0,0,.532-.532v-1.62a.532.532,0,0,0-1.063,0V34.5a.532.532,0,0,0,.532.532Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2375"
                  data-name="Path 2375"
                  d="M30.03,22.073a.532.532,0,0,0-.734.77,5.5,5.5,0,1,1-2.1-1.254.532.532,0,1,0,.329-1.011,6.549,6.549,0,0,0-1.471-.3c.03-.011.061-.021.091-.033a9.009,9.009,0,0,0,.277-1.265,9.207,9.207,0,0,0,.092-1.3v-2.3a.532.532,0,1,0-1.063,0v2.3a8.135,8.135,0,0,1-.083,1.153,7.943,7.943,0,0,1-.346,1.44,6.577,6.577,0,0,0-.95,12.984V36.38H12.845V30a.532.532,0,0,0-1.063,0v6.912a.532.532,0,0,0,.532.532H24.605a.532.532,0,0,0,.532-.532V33.4c.117.006.235.01.354.01a6.579,6.579,0,0,0,4.54-11.34Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2376"
                  data-name="Path 2376"
                  d="M17.656,25.165a1.443,1.443,0,1,0-1.443,1.443A1.443,1.443,0,0,0,17.656,25.165Zm-1.823,0a.38.38,0,1,1,.38.38.38.38,0,0,1-.38-.38Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2377"
                  data-name="Path 2377"
                  d="M19.68,19.217a1.443,1.443,0,1,0-1.443,1.443,1.443,1.443,0,0,0,1.443-1.443Zm-1.443.38a.38.38,0,1,1,.38-.38A.38.38,0,0,1,18.237,19.6Z"
                  fill="#142977"
                />
                <Path
                  id="Path_2378"
                  data-name="Path 2378"
                  d="M18.833,35.235a1.443,1.443,0,1,0-1.443-1.443A1.443,1.443,0,0,0,18.833,35.235Zm0-1.823a.38.38,0,1,1-.38.38.38.38,0,0,1,.38-.38Z"
                  fill="#142977"
                />
                <G id="Group_1104" data-name="Group 1104">
                  <Circle
                    id="Ellipse_163"
                    data-name="Ellipse 163"
                    cx="0.835"
                    cy="0.835"
                    r="0.835"
                    transform="translate(22.035 18.078)"
                    fill="#142977"
                  />
                  <Circle
                    id="Ellipse_164"
                    data-name="Ellipse 164"
                    cx="0.835"
                    cy="0.835"
                    r="0.835"
                    transform="translate(13.026 17.774)"
                    fill="#142977"
                  />
                  <Circle
                    id="Ellipse_165"
                    data-name="Ellipse 165"
                    cx="0.835"
                    cy="0.835"
                    r="0.835"
                    transform="translate(14.466 29.355)"
                    fill="#142977"
                  />
                </G>
                <Path
                  id="Path_2379"
                  data-name="Path 2379"
                  d="M27.175,24.363a.532.532,0,0,0,.011.752c.03.028.054.061.082.091l-.451.261A1.91,1.91,0,0,0,26.024,25v-.521c.036.008.073.012.108.022a.532.532,0,0,0,.291-1.023,3.48,3.48,0,0,0-1.863,0,.532.532,0,0,0,.291,1.023c.035-.01.073-.014.109-.023V25a1.9,1.9,0,0,0-.8.463l-.45-.26c.027-.03.051-.061.08-.09a.532.532,0,1,0-.74-.763,3.463,3.463,0,0,0-.931,1.614.532.532,0,0,0,.386.645.538.538,0,0,0,.131.016.532.532,0,0,0,.515-.4c.008-.033.022-.064.032-.1l.452.261a1.839,1.839,0,0,0,.005.909l-.452.26c-.012-.039-.029-.077-.039-.117a.532.532,0,1,0-1.031.26,3.459,3.459,0,0,0,.931,1.614.532.532,0,1,0,.74-.763c-.024-.023-.043-.05-.066-.074l.454-.262a1.906,1.906,0,0,0,.779.448v.52c-.036-.008-.074-.012-.109-.022a.532.532,0,1,0-.291,1.023,3.463,3.463,0,0,0,1.863,0,.532.532,0,1,0-.291-1.023c-.035.01-.073.014-.108.022v-.522a1.9,1.9,0,0,0,.776-.447l.454.262c-.023.025-.043.052-.067.076a.532.532,0,1,0,.741.763,3.463,3.463,0,0,0,.931-1.613.532.532,0,0,0-1.031-.26c-.01.039-.026.077-.038.115l-.451-.26a1.839,1.839,0,0,0,0-.908l.452-.262c.009.03.023.063.03.094a.532.532,0,0,0,1.031-.26,3.461,3.461,0,0,0-.931-1.613A.532.532,0,0,0,27.175,24.363Zm-1.684,3.314a.844.844,0,1,1,.844-.844A.844.844,0,0,1,25.491,27.676Z"
                  fill="#142977"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Dị ứng",
      navigate: () => navigation.navigate("Allergy", {}),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1089"
                data-name="Rectangle 1089"
                width="36"
                height="36"
                transform="translate(123 444)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_395"
            data-name="Mask Group 395"
            transform="translate(-123 -444)"
            clipPath="url(#clip-path)"
          >
            <Rect
              id="Rectangle_1248"
              data-name="Rectangle 1248"
              width="12"
              height="12"
              rx="6"
              transform="translate(147 444)"
              fill="#b2f0fb"
            />
            <G id="pregnant" transform="translate(123 444)">
              <G id="Group_1107" data-name="Group 1107">
                <G id="Group_1106" data-name="Group 1106">
                  <Path
                    id="Path_2380"
                    data-name="Path 2380"
                    d="M25.278,2.283a10.514,10.514,0,0,0-5.59,1.608c-.322.174-2.763,1.585-2.384,4.157a4.94,4.94,0,0,0,1.116,2.259,4.5,4.5,0,0,1,1.149,3.563l-.028-.016a2.108,2.108,0,0,0-2.768.8,2.639,2.639,0,0,0-1.866-.742,4.362,4.362,0,0,1,.007-.844,5.359,5.359,0,0,0-.023-1.286,3.956,3.956,0,0,0-1.835-2.8A5.408,5.408,0,0,0,8.7,8.364,4.985,4.985,0,0,0,6.509,16.6a1.511,1.511,0,0,1,.433,1.1,9.274,9.274,0,0,0,5.077,8.673,9.509,9.509,0,0,0,4.387,1.089,9.09,9.09,0,0,0,2.654-.4,9.492,9.492,0,0,0,1.4-.551,5.722,5.722,0,0,0,3.2-5.083,2.1,2.1,0,0,0,1.025-.067A2.134,2.134,0,0,0,26.036,18.7L25.5,16.962a3.517,3.517,0,0,0-4.633-2.232,5.912,5.912,0,0,0-1.314-5.26A3.76,3.76,0,0,1,18.7,7.843c-.249-1.692,1.591-2.678,1.667-2.718.018-.009.036-.019.053-.03a9.11,9.11,0,0,1,4.862-1.406,9.458,9.458,0,0,1,9.315,9.573c0,5.792-4.548,10.66-8.363,13.723A47.482,47.482,0,0,1,18,32.233a47.642,47.642,0,0,1-7.81-4.915.7.7,0,0,0-.866,1.108,47.349,47.349,0,0,0,8.381,5.226.7.7,0,0,0,.589,0A47.345,47.345,0,0,0,27.088,28.1a29.639,29.639,0,0,0,6.089-6.393A15.048,15.048,0,0,0,36,13.262,10.865,10.865,0,0,0,25.278,2.283ZM13.98,16.354a2.883,2.883,0,0,0,.85-1.032,1.219,1.219,0,0,1,1.228.721l-.293.575-2.034-.04C13.815,16.5,13.9,16.426,13.98,16.354Zm6.179.931.234-.46a2.109,2.109,0,0,1,3.76.556l.539,1.732a.723.723,0,0,1-.445.911.7.7,0,0,1-.863-.394l-.411-1.32a.7.7,0,0,0-1.343.418l.422,1.355a4.3,4.3,0,0,1-2.213,5.167,7.989,7.989,0,0,1-11.1-4.679,7.955,7.955,0,0,1-.392-2.815,2.923,2.923,0,0,0-.824-2.131,3.539,3.539,0,0,1-.855-1.485A3.585,3.585,0,0,1,9.1,9.713a3.969,3.969,0,0,1,3.192.447A2.56,2.56,0,0,1,13.5,11.968a3.985,3.985,0,0,1,.015.985A5.715,5.715,0,0,0,13.55,14.4c.057.395-.02.476-.5.9-.131.115-.28.246-.434.4l-.005.005-.009.008a1.321,1.321,0,0,0,.891,2.27l2.413.048a1.133,1.133,0,0,0,1.03-.617l1.017-2a.7.7,0,1,1,1.253.639l-.036.07a3.529,3.529,0,0,0-.3.583l-.685,1.343a2.561,2.561,0,0,1-1.515,1.271,2.5,2.5,0,0,1-.8.114l-3.041-.061a.7.7,0,1,0-.028,1.406l3.041.061a3.915,3.915,0,0,0,1.242-.177,3.991,3.991,0,0,0,1.819-1.189l.5,1.591a.7.7,0,1,0,1.343-.418l-.626-2.011A2.113,2.113,0,0,1,20.16,17.285Z"
                    fill="#142977"
                  />
                </G>
              </G>
              <G id="Group_1109" data-name="Group 1109">
                <G id="Group_1108" data-name="Group 1108">
                  <Path
                    id="Path_2381"
                    data-name="Path 2381"
                    d="M8.228,25.678l-.02-.018a.7.7,0,1,0-.94,1.046l.02.018a.7.7,0,0,0,.94-1.046Z"
                    fill="#142977"
                  />
                </G>
              </G>
              <G id="Group_1111" data-name="Group 1111">
                <G id="Group_1110" data-name="Group 1110">
                  <Path
                    id="Path_2382"
                    data-name="Path 2382"
                    d="M16.333,3.905a10.511,10.511,0,0,0-5.612-1.623A10.865,10.865,0,0,0,0,13.262c0,3.823,1.719,7.631,5.111,11.319a.7.7,0,0,0,1.035-.952C3,20.209,1.406,16.721,1.406,13.262a9.458,9.458,0,0,1,9.315-9.573A9.108,9.108,0,0,1,15.584,5.1a.7.7,0,1,0,.75-1.19Z"
                    fill="#142977"
                  />
                </G>
              </G>
              <G id="Group_1113" data-name="Group 1113">
                <G id="Group_1112" data-name="Group 1112">
                  <Path
                    id="Path_2383"
                    data-name="Path 2383"
                    d="M25.278,5.625a.7.7,0,1,0,0,1.406h0a.7.7,0,0,0,0-1.406Z"
                    fill="#142977"
                  />
                </G>
              </G>
              <G id="Group_1115" data-name="Group 1115">
                <G id="Group_1114" data-name="Group 1114">
                  <Path
                    id="Path_2384"
                    data-name="Path 2384"
                    d="M31.385,8.87A7.472,7.472,0,0,0,27.9,6.111a.7.7,0,1,0-.5,1.313,6.256,6.256,0,0,1,3.938,5.839.7.7,0,0,0,1.406,0A7.711,7.711,0,0,0,31.385,8.87Z"
                    fill="#142977"
                  />
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Thai kì",
      navigate: () => navigation.navigate("Pregnancy"),
    },
    {
      svg: (
        <Svg width="36" height="36" viewBox="0 0 36 36">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1086"
                data-name="Rectangle 1086"
                width="36"
                height="36"
                transform="translate(217 444)"
                fill="#142977"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_393"
            data-name="Mask Group 393"
            transform="translate(-217 -444)"
            clipPath="url(#clip-path)"
          >
            <G id="medical-book" transform="translate(217 444)">
              <G id="Group_1096" data-name="Group 1096">
                <G id="Group_1095" data-name="Group 1095">
                  <G id="Group_1094" data-name="Group 1094">
                    <G id="Group_1093" data-name="Group 1093">
                      <G id="Group_1092" data-name="Group 1092">
                        <G id="Group_1091" data-name="Group 1091">
                          <G id="Group_1090" data-name="Group 1090">
                            <Path
                              id="Path_2368"
                              data-name="Path 2368"
                              d="M13.079,10.359H27.005V26.587H13.079Z"
                              fill="#b2f0fb"
                            />
                          </G>
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
              </G>
              <G id="Group_1102" data-name="Group 1102">
                <G id="Group_1101" data-name="Group 1101">
                  <G id="Group_1100" data-name="Group 1100">
                    <G id="Group_1099" data-name="Group 1099">
                      <G id="Group_1098" data-name="Group 1098">
                        <G id="Group_1097" data-name="Group 1097">
                          <Path
                            id="Path_2369"
                            data-name="Path 2369"
                            d="M21.363,22.739H18.721a.7.7,0,0,1-.7-.7V20.5H16.479a.7.7,0,0,1-.7-.7V17.152a.7.7,0,0,1,.7-.7h1.539V14.909a.7.7,0,0,1,.7-.7h2.642a.7.7,0,0,1,.7.7v1.539h1.539a.7.7,0,0,1,.7.7v2.642a.7.7,0,0,1-.7.7H22.066v1.539a.7.7,0,0,1-.7.7Zm-1.939-1.406H20.66V19.794a.7.7,0,0,1,.7-.7H22.9V17.855H21.363a.7.7,0,0,1-.7-.7V15.613H19.424v1.539a.7.7,0,0,1-.7.7H17.182v1.236h1.539a.7.7,0,0,1,.7.7Z"
                            fill="#142977"
                          />
                        </G>
                      </G>
                    </G>
                  </G>
                </G>
                <Path
                  id="Path_2370"
                  data-name="Path 2370"
                  d="M31.283,3.171h-.155V1.406h.155a.7.7,0,1,0,0-1.406H6.307A2.289,2.289,0,0,0,4.019,2.226a.71.71,0,0,0,0,.083v31.1A2.59,2.59,0,0,0,6.6,36H31.283a.7.7,0,0,0,.7-.7V3.874a.7.7,0,0,0-.7-.7Zm-25.6-1.5a.876.876,0,0,1,.627-.262H29.721V3.171H6.307A.885.885,0,0,1,5.424,2.3a.876.876,0,0,1,.255-.63Zm24.9,32.926H6.6A1.182,1.182,0,0,1,5.42,33.413V4.4a2.265,2.265,0,0,0,.887.18H8.1V29.1a.7.7,0,0,0,1.406,0V4.577H30.58Z"
                  fill="#142977"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
      text: "Lịch sử\nkhám bệnh",
      navigate: () => navigation.navigate("MedicalHistoryDetail"),
    },
  ];

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="Menu"
        hideRoute
        logo
        previous={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <View style={styles.left}>
          <FlatList
            data={menuLeft}
            keyExtractor={(item) => item.text}
            renderItem={({ item, index }) => {
              let last = false;
              let active = false;
              if (index === 2) active = true;
              if (index >= 10) last = true;
              return <MenuItem item={item} last={last} active={active} />;
            }}
          />
        </View>
        <Content contentContainerStyle={styles.right}>
          <View style={styles.profile}>
            <Text style={styles.name}>Nguyễn Văn A</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("MedicalStory", {})}
            >
              <View style={{ alignSelf: "flex-start" }}>
                <View style={styles.icon}>
                  <Svg width="36" height="36" viewBox="0 0 36 36">
                    <Defs>
                      <ClipPath id="clip-path">
                        <Rect
                          id="Rectangle_786"
                          data-name="Rectangle 786"
                          width="36"
                          height="36"
                          transform="translate(123 170)"
                          fill="#142977"
                          stroke="#707070"
                          strokeWidth="1"
                        />
                      </ClipPath>
                    </Defs>
                    <G
                      id="Mask_Group_387"
                      data-name="Mask Group 387"
                      transform="translate(-123 -170)"
                      clipPath="url(#clip-path)"
                    >
                      <G id="stethoscope-2" transform="translate(123 170)">
                        <G id="Group_1013" data-name="Group 1013">
                          <G id="Group_1006" data-name="Group 1006">
                            <G id="Group_1005" data-name="Group 1005">
                              <G id="Group_1004" data-name="Group 1004">
                                <G id="Group_1003" data-name="Group 1003">
                                  <G id="Group_1002" data-name="Group 1002">
                                    <Path
                                      id="Path_2346"
                                      data-name="Path 2346"
                                      d="M15.369,36a3.713,3.713,0,0,1-3.709-3.708V25.109a.7.7,0,0,1,1.406,0v7.183a2.3,2.3,0,0,0,4.605,0V24.123a2.562,2.562,0,0,1,5.123,0v4.195a3.067,3.067,0,0,0,6.134,0V16.347a.7.7,0,1,1,1.406,0V28.318a4.473,4.473,0,0,1-8.946,0V24.123a1.155,1.155,0,0,0-2.311,0v8.169A3.713,3.713,0,0,1,15.369,36Z"
                                      fill="#142977"
                                    />
                                  </G>
                                </G>
                              </G>
                            </G>
                          </G>
                          <G id="Group_1012" data-name="Group 1012">
                            <G id="Group_1011" data-name="Group 1011">
                              <G id="Group_1010" data-name="Group 1010">
                                <G id="Group_1009" data-name="Group 1009">
                                  <G id="Group_1008" data-name="Group 1008">
                                    <G id="Group_1007" data-name="Group 1007">
                                      <Ellipse
                                        id="Ellipse_159"
                                        data-name="Ellipse 159"
                                        cx="2.129"
                                        cy="2.128"
                                        rx="2.129"
                                        ry="2.128"
                                        transform="translate(10.234 21.56)"
                                        fill="#b2f0fb"
                                      />
                                    </G>
                                  </G>
                                </G>
                              </G>
                            </G>
                          </G>
                        </G>
                        <G id="Group_1026" data-name="Group 1026">
                          <Path
                            id="Path_2347"
                            data-name="Path 2347"
                            d="M22.341,7.293H21.63V1.739a.7.7,0,0,0-.7-.7H17.007V.7A.7.7,0,0,0,15.6.7V2.774a.7.7,0,0,0,1.406,0V2.442h3.216V7.293h-.711a.7.7,0,0,0-.7.7v3.342a6.446,6.446,0,0,1-12.892,0V8a.7.7,0,0,0-.7-.7H4.5V2.442H7.719v.332a.7.7,0,0,0,1.406,0V.7A.7.7,0,0,0,7.719.7v.333H3.8a.7.7,0,0,0-.7.7V7.293H2.385a.7.7,0,0,0-.7.7v3.342a10.682,10.682,0,0,0,21.363,0V8a.7.7,0,0,0-.7-.7Zm-.7,4.045a9.275,9.275,0,0,1-18.551,0V8.7H4.511v2.639a7.852,7.852,0,0,0,15.7,0V8.7h1.423Z"
                            fill="#142977"
                          />
                          <G id="Group_1019" data-name="Group 1019">
                            <G id="Group_1018" data-name="Group 1018">
                              <G id="Group_1017" data-name="Group 1017">
                                <G id="Group_1016" data-name="Group 1016">
                                  <G id="Group_1015" data-name="Group 1015">
                                    <G id="Group_1014" data-name="Group 1014">
                                      <Ellipse
                                        id="Ellipse_160"
                                        data-name="Ellipse 160"
                                        cx="4.687"
                                        cy="4.685"
                                        rx="4.687"
                                        ry="4.685"
                                        transform="translate(24.945 7.306)"
                                        fill="#b2f0fb"
                                      />
                                    </G>
                                  </G>
                                </G>
                              </G>
                            </G>
                          </G>
                          <G id="Group_1025" data-name="Group 1025">
                            <G id="Group_1024" data-name="Group 1024">
                              <G id="Group_1023" data-name="Group 1023">
                                <G id="Group_1022" data-name="Group 1022">
                                  <G id="Group_1021" data-name="Group 1021">
                                    <G id="Group_1020" data-name="Group 1020">
                                      <Path
                                        id="Path_2348"
                                        data-name="Path 2348"
                                        d="M29.632,14.241a2.25,2.25,0,1,1,2.25-2.25A2.252,2.252,0,0,1,29.632,14.241Zm0-3.093a.843.843,0,1,0,.844.843A.845.845,0,0,0,29.632,11.148Z"
                                        fill="#142977"
                                      />
                                    </G>
                                  </G>
                                </G>
                              </G>
                            </G>
                          </G>
                        </G>
                      </G>
                    </G>
                  </Svg>
                </View>
                <Text style={styles.story}>Tiểu sử bệnh án</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.menu}>
            <Text style={styles.date}>
              {_format.getShortVNDate(new Date())} - Ngày hiện tại
            </Text>
            <View style={styles.list}>
              {menuRight.map((item) => (
                <TouchableWithoutFeedback
                  key={item.text}
                  onPress={item.navigate}
                >
                  <View style={styles.item}>
                    {item.svg}
                    <Text style={styles.itemtext}>{item.text}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        </Content>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    flexDirection: "row",
  },
  left: {
    backgroundColor: "#EAEAEA",
  },
  right: {},
  profile: {
    paddingHorizontal: padding,
    paddingTop: 10,
  },
  name: {
    fontSize: 16,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Semibold",
    marginBottom: 12,
  },
  icon: {
    alignSelf: "center",
  },
  story: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  menu: {
    marginTop: 20,
  },
  date: {
    fontSize: 14,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 18,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: padding,
    paddingBottom: 8,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: "33.33333%",
    alignItems: "center",
    marginTop: 26,
  },
  itemtext: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 6,
  },
});

export default MenuScreen;
