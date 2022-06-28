import { settings } from "@/config";
import { useAppSelector } from "@/store/hook";
import { UserData } from "@/types/User";
import { _format } from "@/utils";
import { useNavigation } from "@react-navigation/core";
import { Content, Text, View } from "native-base";
import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { BaseHeading } from "../Base";
import Image from "expo-fast-image";

const { padding, mainColorText } = settings.styles;
const { width: dW } = Dimensions.get("window");
const imageSize = dW * 0.25 - 4 - (padding * 2) / 4;

const Information = () => {
  // navigation
  const navigation = useNavigation();

  // get current user
  const user = useAppSelector((state) => state.user.current) as UserData;

  return (
    <Content contentContainerStyle={styles.block}>
      <BaseHeading
        text="TỔNG QUAN"
        btn={{
          btnText: "Chỉnh sửa",
          onPress: () => navigation.navigate("EditPatientProfile"),
        }}
      />
      <View style={styles.info}>
        <Text style={styles.label}>
          Tên: <Text style={styles.value}>{user.UserFullName}</Text>
        </Text>
        <Text style={styles.label}>
          Ngày sinh:{" "}
          <Text style={styles.value}>{_format.getVNDate(user.BirthDate)}</Text>
        </Text>
        <Text style={styles.label}>
          Giới tính:{" "}
          <Text style={styles.value}>{user.Gender === 0 ? "Nữ" : "Nam"}</Text>
        </Text>
        <Text style={styles.label}>
          Quốc gia: <Text style={styles.value}>{user.CountryName}</Text>
        </Text>
        <Text style={styles.label}>
          Dân tộc: <Text style={styles.value}>{user.NationName}</Text>
        </Text>
        <Text style={styles.label}>
          Chiều cao:{" "}
          <Text style={styles.value}>
            {user.Height ? user.Height + " cm" : "- -"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Nhóm máu:{" "}
          <Text style={styles.value}>
            {user.Blood ? user.Blood + "kg" : "- -"}
          </Text>
        </Text>
        <Text style={styles.label}>
          Cân nặng:{" "}
          <Text style={styles.value}>
            {user.Weight ? user.Weight + "kg" : "- -"}
          </Text>
        </Text>
      </View>
      <BaseHeading
        text="CHẨN ĐOÁN"
        btn={{
          btnText: "Chỉnh sửa",
          onPress: () => navigation.navigate("EditPatientProfile"),
        }}
      />
      <View style={styles.info}>
        <Text style={styles.value}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tristique, odio ut vulputate posuere, lacus eros ullamcorper augue,
          vitae pulvinar nunc quam et lorem. Morbi at sem cursus, gravida lorem
          in, laoreet magna. Nulla lacinia auctor enim, at lobortis justo
          sodales ut. Quisque mattis, diam sed auctor rutrum, augue ligula
          porttitor lacus, non aliquet ante enim quis mi. Vestibulum eu felis at
          turpis vestibulum convallis. Pellentesque vestibulum vel eros aliquam
          mollis. Vivamus lacinia nisi neque, nec maximus orci pharetra eu.
        </Text>
      </View>
      <BaseHeading
        text="TIỀN SỬ PHẪU THUẬT"
        btn={{ btnText: "Thêm mới", onPress: () => null }}
      />
      <View style={styles.info}>
        <Text style={styles.label}>
          Chỉ định phẫu thuật: <Text style={styles.value}>- -</Text>
        </Text>
        <Text style={styles.label}>
          Ngày phẫu thuật: <Text style={styles.value}>- -</Text>
        </Text>
        <Text style={styles.label}>
          Nơi phẫu thuật: <Text style={styles.value}>- -</Text>
        </Text>
        <Text style={styles.label}>
          Ghi chú: <Text style={styles.value}>- -</Text>
        </Text>
        <Text style={styles.label}>Hình ảnh đính kèm</Text>
        <FlatList
          data={["1", "2", "3", "4", "5", "6", "7", "8"]}
          numColumns={4}
          keyExtractor={(i) => i}
          renderItem={({ item }) => (
            <Image
              style={styles.img}
              source={require("@/assets/images/introduce.png")}
            />
          )}
        />
        <View style={{ height: 12 }} />
      </View>
    </Content>
  );
};

const styles = StyleSheet.create({
  block: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  info: {
    marginTop: 16,
  },
  date: {
    fontSize: 14,
    lineHeight: 30,
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
  },
  label: {
    fontSize: 14,
    letterSpacing: 1.5,
    lineHeight: 18,
    color: "rgba(0, 0, 0, 0.7)",
    fontFamily: "SFProDisplay-Regular",
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    opacity: 1,
    letterSpacing: 1.5,
    lineHeight: 18,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
  },
  img: {
    width: imageSize,
    height: imageSize,
    margin: 2,
    borderRadius: 4,
  },
});

export default Information;
