import { HeaderRoot, Loading, ModalCenter } from "@/components";
import { Container, Content, Icon, Input, Text, View } from "native-base";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import {
  Image,
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { PatientProfileProps } from "@/navigation/types/Profile";
import { settings } from "@/config";
import { InformationBlock } from "../../Block/PatientProfile.ts";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { BaseHeading } from "../../Block/Base";
import { useAppSelector } from "@/store/hook";
import { _format } from "@/utils";
import { UserData } from "@/types/User";
import { Modalize } from "react-native-modalize";

const { padding, mainColorText, blueColor, dangerColor, borderColor } =
  settings.styles;

type IInformation = {
  label: string;
  value: string;
  svg: ReactElement;
  hide?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
};

const ProfileScreen: FC<PatientProfileProps> = ({ navigation }) => {
  // lấy user hiện tại
  const user = useAppSelector((state) => state.user.current) as UserData;
  const currentPassword = useAppSelector((state) => state.user.password);
  const userAvatarFiles = user.UserFiles?.filter((i) => i.FileType === 0);
  const [avatar, setAvatar] = useState(
    userAvatarFiles?.length > 0 && userAvatarFiles
      ? userAvatarFiles[userAvatarFiles?.length - 1]?.FileUrl
      : null
  );

  // xem thông tin ẩn
  const modal = useRef<Modalize>(null);
  const [secret, setSecret] = useState(true);
  const password = useRef("");
  const [error, setError] = useState("");

  const handleError = () => {
    const { current } = password;
    console.log("current: ", current);
    console.log("currentPassword: ", currentPassword);
    if (current.length <= 0) {
      setError("Vui lòng không để trống mật khẩu");
      return false;
    } else {
      if (current === currentPassword) {
        setError("");
        return true;
      } else {
        setError("Mật khẩu không khớp");
        return false;
      }
    }
  };

  const _onPress = () => {
    if (handleError() === true) {
      setSecret(false);
      modal.current?.close();
      password.current = "";
      setError("");
    }
  };

  const information: IInformation[] = [
    {
      label: "NGÀY SINH",
      value: _format.getVNDate(user.BirthDate),
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "GIỚI TÍNH",
      value: user.Gender === 1 ? "Nam" : "Nữ",
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_717"
                data-name="Rectangle 717"
                width="20"
                height="20"
                transform="translate(30 611)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_192"
            data-name="Mask Group 192"
            transform="translate(-30 -611)"
            clipPath="url(#clip-path)"
          >
            <G id="sex" transform="translate(30 611)">
              <Path
                id="Path_1273"
                data-name="Path 1273"
                d="M10.586,5.313a5.293,5.293,0,1,0-5.859,5.241V14.1H2.969a.586.586,0,0,0,0,1.172H4.727v1.758a.586.586,0,0,0,1.172,0V15.273H7.656a.586.586,0,0,0,0-1.172H5.9V10.553a5.281,5.281,0,0,0,4.688-5.241Zm-9.414,0a4.121,4.121,0,1,1,4.141,4.1A4.145,4.145,0,0,1,1.172,5.313Z"
                fill="#219ebc"
              />
              <Path
                id="Path_1274"
                data-name="Path 1274"
                d="M15.273,9.446V4.383l1.344,1.343a.586.586,0,1,0,.829-.829L15.1,2.554a.586.586,0,0,0-.829,0L11.929,4.9a.586.586,0,0,0,.829.829L14.1,4.383V9.447A5.294,5.294,0,0,0,14.688,20a5.292,5.292,0,0,0,.586-10.554Zm-.586,9.382a4.121,4.121,0,1,1,4.141-4.141A4.126,4.126,0,0,1,14.688,18.828Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "SỐ ĐIỆN THOẠI",
      value: user.Phone,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_984"
                data-name="Rectangle 984"
                width="20"
                height="20"
                transform="translate(30 486)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_291"
            data-name="Mask Group 291"
            transform="translate(-30 -486)"
            clipPath="url(#clip-path)"
          >
            <G
              id="phone-call_14_"
              data-name="phone-call (14)"
              transform="translate(29.378 485.353)"
            >
              <Path
                id="Path_1999"
                data-name="Path 1999"
                d="M15.6,13.923a2,2,0,0,0-2.827,0l-.965.965a17.388,17.388,0,0,1-3-2.408,17.707,17.707,0,0,1-2.408-3l.965-.965a2,2,0,0,0,0-2.827L5.481,3.812a1.949,1.949,0,0,0-1.4-.585,2,2,0,0,0-1.417.585l-.9.9A4.237,4.237,0,0,0,.665,8.2C.878,10.7,2.514,13.7,5.036,16.224s5.554,4.157,8.049,4.4a5.235,5.235,0,0,0,.559,0,4.038,4.038,0,0,0,2.934-1.091l.9-.9a2,2,0,0,0,.585-1.417,1.949,1.949,0,0,0-.585-1.4Zm.938,3.765-.9.9a3.04,3.04,0,0,1-2.435.665c-2.162-.186-4.916-1.716-7.191-3.991S2.2,10.251,2,8.089a3.013,3.013,0,0,1,.665-2.435l.938-.9a.675.675,0,0,1,.945,0l1.883,1.9a.665.665,0,0,1,0,.938L5.1,8.92a.665.665,0,0,0-.106.8,18.286,18.286,0,0,0,2.88,3.712,18.286,18.286,0,0,0,3.712,2.88.665.665,0,0,0,.8-.106l1.33-1.33a.665.665,0,0,1,.938,0l1.883,1.883a.65.65,0,0,1,0,.925Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2000"
                data-name="Path 2000"
                d="M17.694,3.585A9.925,9.925,0,0,0,10.643.665a.665.665,0,0,0,0,1.33,8.648,8.648,0,0,1,8.648,8.721.665.665,0,1,0,1.33,0,9.918,9.918,0,0,0-2.927-7.131Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2001"
                data-name="Path 2001"
                d="M13.909,7.39a3.991,3.991,0,0,1,1.177,2.867.665.665,0,0,0,1.33,0A5.322,5.322,0,0,0,11.1,4.869a.665.665,0,0,0,0,1.33A3.991,3.991,0,0,1,13.909,7.39Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "EMAIL",
      value: user.Email,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_984"
                data-name="Rectangle 984"
                width="20"
                height="20"
                transform="translate(30 486)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_291"
            data-name="Mask Group 291"
            transform="translate(-30 -486)"
            clipPath="url(#clip-path)"
          >
            <G
              id="phone-call_14_"
              data-name="phone-call (14)"
              transform="translate(29.378 485.353)"
            >
              <Path
                id="Path_1999"
                data-name="Path 1999"
                d="M15.6,13.923a2,2,0,0,0-2.827,0l-.965.965a17.388,17.388,0,0,1-3-2.408,17.707,17.707,0,0,1-2.408-3l.965-.965a2,2,0,0,0,0-2.827L5.481,3.812a1.949,1.949,0,0,0-1.4-.585,2,2,0,0,0-1.417.585l-.9.9A4.237,4.237,0,0,0,.665,8.2C.878,10.7,2.514,13.7,5.036,16.224s5.554,4.157,8.049,4.4a5.235,5.235,0,0,0,.559,0,4.038,4.038,0,0,0,2.934-1.091l.9-.9a2,2,0,0,0,.585-1.417,1.949,1.949,0,0,0-.585-1.4Zm.938,3.765-.9.9a3.04,3.04,0,0,1-2.435.665c-2.162-.186-4.916-1.716-7.191-3.991S2.2,10.251,2,8.089a3.013,3.013,0,0,1,.665-2.435l.938-.9a.675.675,0,0,1,.945,0l1.883,1.9a.665.665,0,0,1,0,.938L5.1,8.92a.665.665,0,0,0-.106.8,18.286,18.286,0,0,0,2.88,3.712,18.286,18.286,0,0,0,3.712,2.88.665.665,0,0,0,.8-.106l1.33-1.33a.665.665,0,0,1,.938,0l1.883,1.883a.65.65,0,0,1,0,.925Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2000"
                data-name="Path 2000"
                d="M17.694,3.585A9.925,9.925,0,0,0,10.643.665a.665.665,0,0,0,0,1.33,8.648,8.648,0,0,1,8.648,8.721.665.665,0,1,0,1.33,0,9.918,9.918,0,0,0-2.927-7.131Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2001"
                data-name="Path 2001"
                d="M13.909,7.39a3.991,3.991,0,0,1,1.177,2.867.665.665,0,0,0,1.33,0A5.322,5.322,0,0,0,11.1,4.869a.665.665,0,0,0,0,1.33A3.991,3.991,0,0,1,13.909,7.39Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "CMND",
      value: user.CertificateNo,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_1065"
                data-name="Rectangle 1065"
                width="20"
                height="20"
                transform="translate(136 142)"
                fill="#219ebc"
                stroke="#707070"
                stroke-width="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_314"
            data-name="Mask Group 314"
            transform="translate(-136 -142)"
            clip-path="url(#clip-path)"
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
      hide: secret,
      openModal: () => modal.current?.open(),
      closeModal: () => modal.current?.close(),
    },
    {
      label: "QUỐC TỊCH",
      value: user.CountryName,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_984"
                data-name="Rectangle 984"
                width="20"
                height="20"
                transform="translate(30 486)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_291"
            data-name="Mask Group 291"
            transform="translate(-30 -486)"
            clipPath="url(#clip-path)"
          >
            <G
              id="phone-call_14_"
              data-name="phone-call (14)"
              transform="translate(29.378 485.353)"
            >
              <Path
                id="Path_1999"
                data-name="Path 1999"
                d="M15.6,13.923a2,2,0,0,0-2.827,0l-.965.965a17.388,17.388,0,0,1-3-2.408,17.707,17.707,0,0,1-2.408-3l.965-.965a2,2,0,0,0,0-2.827L5.481,3.812a1.949,1.949,0,0,0-1.4-.585,2,2,0,0,0-1.417.585l-.9.9A4.237,4.237,0,0,0,.665,8.2C.878,10.7,2.514,13.7,5.036,16.224s5.554,4.157,8.049,4.4a5.235,5.235,0,0,0,.559,0,4.038,4.038,0,0,0,2.934-1.091l.9-.9a2,2,0,0,0,.585-1.417,1.949,1.949,0,0,0-.585-1.4Zm.938,3.765-.9.9a3.04,3.04,0,0,1-2.435.665c-2.162-.186-4.916-1.716-7.191-3.991S2.2,10.251,2,8.089a3.013,3.013,0,0,1,.665-2.435l.938-.9a.675.675,0,0,1,.945,0l1.883,1.9a.665.665,0,0,1,0,.938L5.1,8.92a.665.665,0,0,0-.106.8,18.286,18.286,0,0,0,2.88,3.712,18.286,18.286,0,0,0,3.712,2.88.665.665,0,0,0,.8-.106l1.33-1.33a.665.665,0,0,1,.938,0l1.883,1.883a.65.65,0,0,1,0,.925Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2000"
                data-name="Path 2000"
                d="M17.694,3.585A9.925,9.925,0,0,0,10.643.665a.665.665,0,0,0,0,1.33,8.648,8.648,0,0,1,8.648,8.721.665.665,0,1,0,1.33,0,9.918,9.918,0,0,0-2.927-7.131Z"
                fill="#219ebc"
              />
              <Path
                id="Path_2001"
                data-name="Path 2001"
                d="M13.909,7.39a3.991,3.991,0,0,1,1.177,2.867.665.665,0,0,0,1.33,0A5.322,5.322,0,0,0,11.1,4.869a.665.665,0,0,0,0,1.33A3.991,3.991,0,0,1,13.909,7.39Z"
                fill="#219ebc"
              />
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "ĐỊA CHỈ",
      value: _format.getCurrentAddress(
        user.Address,
        user.WardName,
        user.DistrictName,
        user.CityName
      ),
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "DÂN TỘC",
      value: user.NationName,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "CHIỀU CAO",
      value: "- -",
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "CÂN NẶNG",
      value: "- -",
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "NHÓM MÁU",
      value: "- -",
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
    {
      label: "CÔNG VIỆC",
      value: user.JobName,
      svg: (
        <Svg width="20" height="20" viewBox="0 0 20 20">
          <Defs>
            <ClipPath id="clip-path">
              <Rect
                id="Rectangle_716"
                data-name="Rectangle 716"
                width="20"
                height="20"
                transform="translate(30 571)"
                fill="#219ebc"
                stroke="#707070"
                strokeWidth="1"
              />
            </ClipPath>
          </Defs>
          <G
            id="Mask_Group_191"
            data-name="Mask Group 191"
            transform="translate(-30 -571)"
            clipPath="url(#clip-path)"
          >
            <G
              id="calendar_5_"
              data-name="calendar (5)"
              transform="translate(30 571)"
            >
              <G id="Group_661" data-name="Group 661">
                <Path
                  id="Path_1272"
                  data-name="Path 1272"
                  d="M3.022,20H16.978a2.654,2.654,0,0,0,2.652-2.652V4.133a2.654,2.654,0,0,0-2.652-2.652H15.926V.741a.741.741,0,0,0-1.482,0v.741H5.556V.741a.741.741,0,0,0-1.482,0v.741H3.022A2.654,2.654,0,0,0,.37,4.133V17.348A2.654,2.654,0,0,0,3.022,20ZM1.852,4.133a1.173,1.173,0,0,1,1.17-1.17H4.074V3.7a.741.741,0,0,0,1.481,0V2.963h8.889V3.7a.741.741,0,0,0,1.481,0V2.963h1.052a1.173,1.173,0,0,1,1.17,1.17V6.3H1.852Zm0,3.644h16.3v9.57a1.173,1.173,0,0,1-1.17,1.17H3.022a1.173,1.173,0,0,1-1.17-1.17Z"
                  fill="#219ebc"
                />
              </G>
            </G>
          </G>
        </Svg>
      ),
    },
  ];

  return (
    <Container>
      <HeaderRoot
        title="Hồ sơ người bệnh"
        previous={() => navigation.goBack()}
        hideRoute
      />
      <View style={styles.info}>
        <Image
          defaultSource={require("@/assets/images/no-avatar.jpg")}
          onError={() => setAvatar(null)}
          source={
            !avatar ? require("@/assets/images/no-avatar.jpg") : { uri: avatar }
          }
          style={styles.avatar}
        />
        <Text style={styles.fullname}>{user.UserFullName}</Text>
        <Text style={styles.code}>TA - {user.Id}</Text>
      </View>
      <Content contentContainerStyle={styles.body}>
        <BaseHeading
          text="Giới thiệu"
          btn={{
            btnText: "Chỉnh sửa",
            onPress: () => navigation.navigate("EditPatientProfile"),
          }}
        />
        {information.map((item) => (
          <InformationBlock
            key={item.label}
            item={item}
            closeModal={item.closeModal}
            openModal={secret ? item.openModal : () => setSecret(true)}
          />
        ))}
        <View style={{ height: 10 }} />
      </Content>
      <ModalCenter
        ref={modal}
        style={{ borderRadius: 24 }}
        avoidKeyboard
        onClosed={() => setError("")}
      >
        <View style={styles.modal}>
          <Text style={styles.modalheading}>XÁC THỰC MẬT KHẨU</Text>
          <Input
            style={styles.modalinput}
            placeholder="Nhập mật khẩu"
            secureTextEntry
            placeholderTextColor="rgba(0, 0, 0, .3)"
            onChangeText={(val) => (password.current = val)}
            onEndEditing={handleError}
            onSubmitEditing={_onPress}
          />
          {error.length > 0 && <Text style={styles.modalerror}>{error}</Text>}
          <TouchableWithoutFeedback onPress={_onPress}>
            <View style={styles.modalcreate}>
              <Text style={styles.modalcreatetext}>XÁC NHẬN</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ModalCenter>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingHorizontal: padding,
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
    borderColor: "#fff",
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
  modal: {
    padding: 30,
  },
  modalheading: {
    textAlign: "center",
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 1.25,
    color: mainColorText,
  },
  modalinput: {
    borderBottomWidth: 1,
    borderColor,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontFamily: "SFProDisplay-Regular",
    fontSize: 18,
    letterSpacing: 1.25,
    textAlign: "center",
    color: mainColorText,
  },
  modalcreate: {
    backgroundColor: blueColor,
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  modalcreatetext: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Bold",
  },
  modalerror: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    color: dangerColor,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default ProfileScreen;
