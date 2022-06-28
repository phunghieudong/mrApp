import { Logo, ModalCenter } from "@/components";
import { settings } from "@/config";
import { InformationProps } from "@/navigation/types/Auth";
import { useAppDispatch } from "@/store/hook";
import { changeRoute } from "@/store/reducers/RouteSlice";
import { Content, Icon, Text, Toast, View } from "native-base";
import React, { useRef, useState } from "react";
import { TouchableWithoutFeedback } from "react-native";
import {
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import useTranslateLanguage from "@/libs/i18n";
import { changeLanguage } from "@/store/reducers/LanguageSlice";
import { Modalize } from "react-native-modalize";

const { width: dW } = Dimensions.get("window");

const {
  padding,
  blueColor,
  borderColor,
  selectColor,
  mainColor,
  mainColorText,
  orangeColor,
} = settings.styles;

const languages = [
  {
    img: require("@/assets/images/vietnam-flag.png"),
    text: "Tiếng việt",
    lang: "vn",
  },
  {
    img: require("@/assets/images/usa-flag.png"),
    text: "Tiếng anh",
    lang: "en",
  },
] as const;

const InformationScreen = (props: InformationProps) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();

  const navigate = () => {
    dispatch(changeRoute({ route: "auth", initialRoute: "SignIn" }));
    navigation.navigate("SignIn");
  };

  // language
  const { getTranslatedText } = useTranslateLanguage();
  const changeCurrentLanguage = (lang: "en" | "vn", index: number) => {
    dispatch(changeLanguage(lang));
    handleActive(index);
  };

  // modal
  const modal = useRef<Modalize>(null);

  // language selected
  const [active, setActive] = useState(0);

  const handleActive = (val: number) => {
    setActive(val);
    modal.current?.close();
  };

  return (
    <Content contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.heading}>
        <View style={styles.left}>
          <Text style={styles.lefttext}>An Toàn Sức Khỏe Cộng Đồng</Text>
        </View>
        <View style={styles.right}>
          <Logo width={212.174} height={67.254} />
        </View>
      </View>
      <View style={styles.language}>
        <Text style={styles.languagelabel}>Chọn ngôn ngữ</Text>
        <TouchableWithoutFeedback onPress={() => modal.current?.open()}>
          <View style={styles.languageselected}>
            <Text style={styles.languagecurrent}>
              {active === 0 ? "Tiếng việt" : "Tiếng anh"}
            </Text>
            <View style={styles.languagecontrol}>
              <Icon
                type="Ionicons"
                name="caret-up-sharp"
                style={[styles.languageicon, { top: 3 }]}
              />
              <Icon
                type="Ionicons"
                name="caret-down-sharp"
                style={[styles.languageicon, { bottom: 3 }]}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.register}>Đăng ký LẤY SỐ thứ tự khám bệnh</Text>
      <Text style={styles.where}>Tại các bệnh viện trong và ngoài nước</Text>
      <View style={styles.coop}>
        <Image
          source={require("@/assets/images/hospital-1.png")}
          style={styles.coopimg}
        />
        <Image
          source={require("@/assets/images/hospital-3.png")}
          style={styles.coopimg}
        />
        <Image
          source={require("@/assets/images/hospital-1.png")}
          style={styles.coopimg}
        />
        <Image
          source={require("@/assets/images/hospital-3.png")}
          style={styles.coopimg}
        />
        <Image
          source={require("@/assets/images/hospital-1.png")}
          style={styles.coopimg}
        />
        <Image
          source={require("@/assets/images/hospital-3.png")}
          style={styles.coopimg}
        />
      </View>
      <Text style={styles.service}>
        <Text style={styles.servicebold}>{"Ứng dụng tiện ích từ A —> Z."}</Text>{" "}
        Đăng kí lấy số thứ tự cho các dịch vụ tại bệnh viện, lưu hồ sơ bệnh án
        trọn đời, từ trong bụng mẹ, theo dõi và đăng kí chích ngừa cho trẻ,
        thanh toán online, chụp hình, quét mã QR lấy kết quả xét nghiệm…{" "}
        <Text style={styles.servicebold}>Với Mr.ApP bạn chỉ cần 30 GIÂY</Text>
      </Text>
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={navigate}>
          <View style={styles.footerbuttonlarge}>
            <Text style={styles.footertextlarge}>BẮT ĐẦU</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => Toast.show({ text: "Chức năng còn đang phát triển" })}
        >
          <View style={styles.footerbuttonsmall}>
            <Icon
              type="Ionicons"
              name="chatbubble-ellipses"
              style={styles.footericon}
            />
            <Text style={styles.footertextsmall}>Liên hệ</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ModalCenter ref={modal}>
        <View style={styles.modal}>
          <FlatList
            data={languages}
            keyExtractor={(item) => item.text}
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback
                onPress={() => changeCurrentLanguage(item.lang, index)}
              >
                <View style={styles.modalitem}>
                  {index === active && (
                    <>
                      <View style={styles.modalleft}>
                        <Image source={item.img} style={styles.modallogo} />
                        <Text style={[styles.modaltext, styles.active]}>
                          {item.text}
                        </Text>
                      </View>
                      <Icon
                        type="Ionicons"
                        name="checkmark-sharp"
                        style={styles.modalicon}
                      />
                    </>
                  )}
                  {index !== active && (
                    <View style={styles.modalleft}>
                      <Image source={item.img} style={styles.modallogo} />
                      <Text style={styles.modaltext}>{item.text}</Text>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </ModalCenter>
    </Content>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: padding,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flex: 0.3,
  },
  lefttext: {
    color: blueColor,
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 20,
    lineHeight: 27,
  },
  right: {
    flex: 0.7,
    alignItems: "flex-end",
  },
  language: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 26,
  },
  languagelabel: {
    fontSize: 12,
    color: mainColorText,
    opacity: 0.7,
    fontFamily: "SFProDisplay-Regular",
    marginRight: 8,
  },
  languageselected: {
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
  },
  languagecurrent: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.25,
    color: mainColorText,
  },
  languagecontrol: {
    marginLeft: 13,
  },
  languageicon: {
    fontSize: 12,
    color: selectColor,
  },
  register: {
    fontSize: 40,
    lineHeight: 53,
    letterSpacing: 0.2,
    color: mainColor,
    fontFamily: "SFProDisplay-Bold",
  },
  where: {
    fontSize: 20,
    lineHeight: 44,
    fontFamily: "SFProDisplay-Bold",
    color: orangeColor,
  },
  coop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  coopimg: {
    width: dW * 0.33 - 30,
    height: dW * 0.33 - 30,
  },
  service: {
    fontSize: 11,
    lineHeight: 20,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
    letterSpacing: 0.14,
    opacity: 0.7,
    marginTop: 12,
  },
  servicebold: {
    fontSize: 11,
    lineHeight: 20,
    color: mainColorText,
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 0.14,
    opacity: 0.7,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  footerbuttonlarge: {
    backgroundColor: mainColor,
    paddingTop: 16,
    paddingBottom: 17,
    minWidth: 220,
    borderRadius: 100,
  },
  footerbuttonsmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blueColor,
    paddingTop: 10,
    paddingBottom: 11,
    minWidth: 120,
    borderRadius: 100,
  },
  footertextsmall: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Medium",
  },
  footertextlarge: {
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Semibold",
    color: "#fff",
  },
  footericon: {
    fontSize: 14,
    marginRight: 10,
    color: "#fff",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 2,
  },
  modalitem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 11.5,
  },
  modalleft: {
    flexDirection: "row",
    alignItems: "center",
  },
  modallogo: {
    marginRight: 5,
    width: 20,
    height: 14,
  },
  modalicon: {
    fontSize: 18,
    color: mainColor,
  },
  modaltext: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: "#000",
    opacity: 0.7,
  },
  active: {
    color: mainColor,
    fontFamily: "SFProDisplay-Bold",
  },
});

export default InformationScreen;
