import { settings } from "@/config";
import { Icon, Text, View } from "native-base";
import React from "react";
import { FlatList, StyleSheet } from "react-native";

const { padding, blueColor, mainColorText } = settings.styles;

const menu = [
  {
    type: "Feather",
    name: "activity",
    label: "Chế độ\ndinh dưỡng",
  },
  {
    type: "Feather",
    name: "activity",
    label: "Quy trình\nchích ngừa",
  },
  {
    type: "Feather",
    name: "activity",
    label: "Lịch theo dõi\nthai kỳ",
  },
  {
    type: "Feather",
    name: "activity",
    label: "Danh sách\nmũi tiêm",
  },
  {
    type: "Feather",
    name: "activity",
    label: "Hình ảnh",
  },
];

const Index = () => {
  return (
    <FlatList
      style={styles.body}
      numColumns={2}
      data={menu}
      keyExtractor={(i) => i.label}
      renderItem={({ item }) => (
        <View style={styles.box}>
          <View style={styles.circle}>
            <Icon
              type={item.type as any}
              name={item.name}
              style={styles.icon}
            />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: padding,
  },
  box: {
    width: "50%",
    alignSelf: "center",
    marginVertical: 10,
  },
  circle: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 100,
    overflow: "hidden",
  },
  icon: {
    fontSize: 50,
    padding: 20,
    backgroundColor: blueColor,
    color: "#fff",
  },
  label: {
    textAlign: "center",
    marginHorizontal: 12,
    marginTop: 4,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Medium",
    color: mainColorText,
  },
});

export default Index;
