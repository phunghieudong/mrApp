import { HeaderRoot } from "@/components";
import { settings } from "@/config";
import { Container, Text, View } from "native-base";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

const { padding, blueColor, mainColorText, dangerColor } = settings.styles;

const Index = () => {
  return (
    <View style={styles.body}>
      <View style={styles.box}>
        <Text style={styles.vaccine}>Vắc-xin Sởi - Quai bị - Rubella</Text>
        <Text style={styles.note}>* Mỗi mũi cách nhau 1 - 3 tháng</Text>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm trước khi có thai</Text>
          <Text style={styles.value}>Đã chích - 19/10/2021</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm trong thai kỳ</Text>
          <Text style={styles.value}>Đã chích - 19/05/2022</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm sau sinh</Text>
          <Text style={styles.value}>Đã chích - 19/10/2022</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.vaccine}>Thuỷ đậu</Text>
        <Text style={styles.note}>* Mỗi mũi cách nhau 1 - 3 tháng</Text>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm trước khi có thai</Text>
          <Text style={styles.value}>Đã chích - 19/10/2021</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm trong thai kỳ</Text>
          <Text style={styles.value}>Chưa chích</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Tiêm sau sinh</Text>
          <Text style={styles.value}>Chưa chích</Text>
        </View>
        <TouchableWithoutFeedback>
          <View style={styles.btn}>
            <Text style={styles.btntext}>ĐẶT LỊCH</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: "rgb(216, 227, 232)",
  },
  box: {
    backgroundColor: "#fff",
    marginHorizontal: padding,
    marginVertical: 5,
    padding: 14,
    borderRadius: 4,
  },
  vaccine: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "SFProDisplay-Medium",
    color: blueColor,
  },
  note: {
    fontSize: 12,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: dangerColor,
    fontStyle: "italic",
    marginBottom: 4,
  },
  group: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .7)",
  },
  value: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Medium",
    color: mainColorText,
  },
  btn: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "flex-end",
    marginTop: 8,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 100,
  },
  btntext: {
    fontSize: 14,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
  },
});

export default Index;
