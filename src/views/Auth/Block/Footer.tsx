import { settings } from "@/config";
import { Text, Toast, View } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const { mainColorLight, mainColorText, padding } = settings.styles;

const menus = [
  {
    image: (
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Defs>
          <ClipPath id="clip-path">
            <Rect
              id="Rectangle_777"
              data-name="Rectangle 777"
              width="20"
              height="20"
              transform="translate(48 700)"
              fill="#023047"
            />
          </ClipPath>
        </Defs>
        <G
          id="Mask_Group_272"
          data-name="Mask Group 272"
          transform="translate(-48 -700)"
          clipPath="url(#clip-path)"
        >
          <G
            id="newspaper_2_"
            data-name="newspaper (2)"
            transform="translate(48 700)"
          >
            <G id="Group_792" data-name="Group 792">
              <Path
                id="Path_1578"
                data-name="Path 1578"
                d="M19.286,5H15.714V.714A.714.714,0,0,0,15,0H.714A.714.714,0,0,0,0,.714V17.143A2.857,2.857,0,0,0,2.857,20H17.143A2.857,2.857,0,0,0,20,17.143V5.714A.714.714,0,0,0,19.286,5ZM5.714,3.571H10A.714.714,0,0,1,10,5H5.714a.714.714,0,1,1,0-1.429Zm6.429,13.571H3.571a.714.714,0,1,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,1,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,0,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,0,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm6.429,8.571a1.429,1.429,0,1,1-2.857,0V6.429h2.857V17.143Z"
                fill="#023047"
              />
            </G>
          </G>
        </G>
      </Svg>
    ),
    text: "Tin tức",
  },
  {
    image: (
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Defs>
          <ClipPath id="clip-path">
            <Rect
              id="Rectangle_916"
              data-name="Rectangle 916"
              width="20"
              height="20"
              transform="translate(173 700)"
              fill="#023047"
            />
          </ClipPath>
        </Defs>
        <G
          id="Mask_Group_273"
          data-name="Mask Group 273"
          transform="translate(-173 -700)"
          clipPath="url(#clip-path)"
        >
          <G id="lock_1_" data-name="lock (1)" transform="translate(175.5 700)">
            <G id="Group_793" data-name="Group 793">
              <Path
                id="Path_1579"
                data-name="Path 1579"
                d="M18.333,7.5h-1.25V5.833a5.833,5.833,0,0,0-11.667,0V7.5H4.167a.416.416,0,0,0-.417.417V18.333A1.668,1.668,0,0,0,5.417,20H17.083a1.668,1.668,0,0,0,1.667-1.667V7.917A.416.416,0,0,0,18.333,7.5ZM12.5,16.2a.417.417,0,0,1-.414.463H10.417A.417.417,0,0,1,10,16.2l.263-2.364a1.648,1.648,0,0,1-.682-1.34,1.667,1.667,0,0,1,3.333,0,1.648,1.648,0,0,1-.682,1.34Zm2.086-8.7H7.917V5.833a3.333,3.333,0,1,1,6.667,0Z"
                transform="translate(-3.75)"
                fill="#023047"
              />
            </G>
          </G>
        </G>
      </Svg>
    ),
    text: "Quy định\nsử dụng",
  },
  {
    image: (
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Defs>
          <ClipPath id="clip-path">
            <Rect
              id="Rectangle_840"
              data-name="Rectangle 840"
              width="20"
              height="20"
              transform="translate(225 850)"
              fill="#023047"
            />
          </ClipPath>
        </Defs>
        <G
          id="Mask_Group_248"
          data-name="Mask Group 248"
          transform="translate(-225 -850)"
          clipPath="url(#clip-path)"
        >
          <G id="criminal-record" transform="translate(226.154 850)">
            <Circle
              id="Ellipse_144"
              data-name="Ellipse 144"
              cx="3.445"
              cy="3.445"
              r="3.445"
              transform="translate(7.839 8.259)"
              fill="#023047"
            />
            <Path
              id="Path_2153"
              data-name="Path 2153"
              d="M382.8,381.24l-3.04-3.04a4.823,4.823,0,0,1-1.562,1.562l3.04,3.04a1.1,1.1,0,0,0,1.562-1.562Z"
              transform="translate(-364.28 -364.279)"
              fill="#023047"
            />
            <G id="Group_856" data-name="Group 856">
              <Path
                id="Path_2154"
                data-name="Path 2154"
                d="M12.144,8.787,8.787,12.144h3.357Z"
                transform="translate(-8.464 -8.464)"
                fill="#023047"
              />
              <Path
                id="Path_2155"
                data-name="Path 2155"
                d="M90,211.84h3.681A4.809,4.809,0,0,1,95.044,210H90Z"
                transform="translate(-86.687 -202.27)"
                fill="#023047"
              />
              <Path
                id="Path_2156"
                data-name="Path 2156"
                d="M6.682,10.675H2.761a.552.552,0,0,1-.552-.552V7.178a.552.552,0,0,1,.552-.552h8.65a4.761,4.761,0,0,1,2.945,1.016V1.656A1.658,1.658,0,0,0,12.7,0H4.785V4.233a.552.552,0,0,1-.552.552H0v12.4a1.658,1.658,0,0,0,1.656,1.656H12.7a1.659,1.659,0,0,0,1.635-1.389l-1.483-1.483a4.78,4.78,0,0,1-4.494-.883h-5.6a.552.552,0,1,1,0-1.1H7.38a4.767,4.767,0,0,1-.522-1.1h-4.1a.552.552,0,0,1,0-1.1H6.64A4.914,4.914,0,0,1,6.682,10.675Zm4.913-5.153H6.442a.552.552,0,1,1,0-1.1h5.153a.552.552,0,0,1,0,1.1Zm0-2.209H6.442a.552.552,0,1,1,0-1.1h5.153a.552.552,0,0,1,0,1.1Z"
                fill="#023047"
              />
            </G>
          </G>
        </G>
      </Svg>
    ),
    text: "Hướng dẫn",
  },
  {
    image: (
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          id="phone-call-id"
          data-name="phone-call"
          d="M20.357,15.4c-.055-.043-4.023-2.9-5.113-2.7-.52.092-.817.447-1.414,1.157-.1.115-.327.389-.506.585a8.344,8.344,0,0,1-1.1-.448A9.133,9.133,0,0,1,8.009,9.781a8.306,8.306,0,0,1-.448-1.1c.2-.18.471-.411.588-.509C8.856,7.577,9.211,7.28,9.3,6.759c.189-1.08-2.67-5.076-2.7-5.112A1.526,1.526,0,0,0,5.467,1C4.308,1,1,5.291,1,6.014c0,.042.061,4.311,5.325,9.667C11.675,20.939,15.944,21,15.986,21,16.709,21,21,17.692,21,16.533a1.522,1.522,0,0,0-.643-1.133Z"
          transform="translate(-1 -1)"
          fill="#023047"
        />
      </Svg>
    ),
    text: "Liên hệ",
  },
  {
    image: (
      <Svg width="20" height="20" viewBox="0 0 20 20">
        <Defs>
          <ClipPath id="clip-path">
            <Rect
              id="Rectangle_777"
              data-name="Rectangle 777"
              width="20"
              height="20"
              transform="translate(48 700)"
              fill="#023047"
            />
          </ClipPath>
        </Defs>
        <G
          id="Mask_Group_272"
          data-name="Mask Group 272"
          transform="translate(-48 -700)"
          clipPath="url(#clip-path)"
        >
          <G
            id="newspaper_2_"
            data-name="newspaper (2)"
            transform="translate(48 700)"
          >
            <G id="Group_792" data-name="Group 792">
              <Path
                id="Path_1578"
                data-name="Path 1578"
                d="M19.286,5H15.714V.714A.714.714,0,0,0,15,0H.714A.714.714,0,0,0,0,.714V17.143A2.857,2.857,0,0,0,2.857,20H17.143A2.857,2.857,0,0,0,20,17.143V5.714A.714.714,0,0,0,19.286,5ZM5.714,3.571H10A.714.714,0,0,1,10,5H5.714a.714.714,0,1,1,0-1.429Zm6.429,13.571H3.571a.714.714,0,1,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,1,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,0,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm0-2.857H3.571a.714.714,0,0,1,0-1.429h8.571a.714.714,0,1,1,0,1.429Zm6.429,8.571a1.429,1.429,0,1,1-2.857,0V6.429h2.857V17.143Z"
                fill="#023047"
              />
            </G>
          </G>
        </G>
      </Svg>
    ),
    text: "Chính sách\nbảo mật",
  },
];

const FooterBlock = () => {
  // toast
  const showDiffToast = () => {
    Toast.show({ text: "Chức năng còn đang phát triển" });
  };

  return (
    <View style={styles.footer}>
      <FlatList
        data={menus}
        horizontal
        style={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.text}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={showDiffToast} activeOpacity={0.7}>
              <View style={styles.menu}>
                <View style={styles.menusvg}>{item.image}</View>
                <Text numberOfLines={2} style={styles.menutext}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  flatlist: {
    flexGrow: 0,
    flexShrink: 0,
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    margin: padding,
    marginBottom: 0,
  },
  menusvg: {
    padding: 12,
    paddingBottom: 8,
  },
  menutext: {
    fontSize: 12,
    lineHeight: 12,
    marginTop: 7,
    fontFamily: "SFProDisplay-Regular",
    textAlign: "center",
    color: mainColorText,
  },
});

export default FooterBlock;
