import { HeaderRoot, Loading } from "@/components";
import { settings } from "@/config";
import { Container, Icon, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { TimePickerProps } from "@/navigation/types/Home";

const { mainColorText, blueColor, borderColor, placeholderColor, orangeColor } =
  settings.styles;

const TimePickerScreen = ({
  navigation,
  route: {
    params: {
      examinationScheduleDetailId,
      ConfigTimeExaminationDayOfWeeks,
      RoomExaminationName,
      SessionTypeName,
      typeId,
      doctorName,
    },
  },
}: TimePickerProps) => {
  // chuyển hướng
  const nav = (
    examinationScheduleDetailId: number,
    examinationScheduleDetailName: string,
    roomExaminationId: number,
    roomExaminationName: string
  ) => {
    navigation.navigate(typeId === 0 ? "NormalSchedule" : "SpecialSchedule", {
      examinationScheduleDetailId,
      examinationScheduleDetailName,
      roomExaminationId,
      roomExaminationName,
    });
  };

  return (
    <Container>
      <HeaderRoot title="CHỌN GIỜ KHÁM" previous={() => navigation.goBack()} />
      <View style={styles.box}>
        <View style={styles.detail}>
          <Icon type={"Fontisto" as any} name="doctor" style={styles.icon} />
          <Text style={styles.value}>{doctorName}</Text>
        </View>
        <View style={styles.detail}>
          <Icon type="MaterialIcons" name="add-location" style={styles.icon} />
          <Text style={styles.label}>Phòng:</Text>
          <Text style={styles.value}>{RoomExaminationName}</Text>
        </View>
        {/* <View style={styles.detail}>
          <Icon
            type="MaterialIcons"
            name="published-with-changes"
            style={[styles.label, { color: orangeColor }]}
          />
          <Text style={[styles.value, { color: orangeColor }]}>
            Được thay thế bởi: Trần Tấn Tính
          </Text>
        </View> */}
        <View style={styles.session}>
          <Text style={styles.sessionheading}>{SessionTypeName}</Text>
          <FlatList
            numColumns={3}
            data={ConfigTimeExaminationDayOfWeeks}
            keyExtractor={(i) => i.ExaminationScheduleDetailId.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={
                  !item.IsMaximum
                    ? () =>
                        nav(
                          item.ExaminationScheduleDetailId,
                          item.ConfigTimeExaminationValue,
                          item.RoomExaminationId,
                          item.RoomName
                        )
                    : () => null
                }
              >
                <View
                  style={[
                    styles.time,
                    item.IsMaximum && {
                      backgroundColor: placeholderColor,
                      borderColor: placeholderColor,
                    },
                    item.ExaminationScheduleDetailId ===
                      examinationScheduleDetailId && {
                      backgroundColor: blueColor,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timetext,
                      (item.IsMaximum ||
                        item.ExaminationScheduleDetailId ===
                          examinationScheduleDetailId) && {
                        color: "#fff",
                      },
                    ]}
                  >
                    {item.ConfigTimeExaminationValue}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  box: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: blueColor,
    borderRadius: 4,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    fontSize: 16,
    color: blueColor,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Light",
    color: mainColorText,
    marginRight: 4,
  },
  value: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Medium",
  },
  session: {
    marginTop: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor,
  },
  sessionheading: {
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Regular",
    fontSize: 16,
    lineHeight: 21,
  },
  time: {
    borderWidth: 1,
    borderColor: blueColor,
    borderRadius: 4,
    width: 110,
    marginRight: 10,
    alignSelf: "flex-start",
    paddingTop: 4,
    paddingBottom: 6,
    marginTop: 10,
  },
  disabled: {
    backgroundColor: placeholderColor,
    borderColor: placeholderColor,
  },
  disabledtext: {
    color: "#fff",
  },
  timetext: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: blueColor,
  },
});

export default TimePickerScreen;
