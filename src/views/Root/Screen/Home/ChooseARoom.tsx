import { getExaminationSchedules } from "@/api/ExaminationForm";
import { Empty, HeaderRoot, LazyLoading, Loading } from "@/components";
import { settings } from "@/config";
import { ChooseARoomProps } from "@/navigation/types/home";
import {
  ExaminationScheduleData,
  ConfigTimeExaminationBySessionData,
} from "@/types/ExaminationForm";
import { Container, Icon } from "native-base";
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

const { padding, blueColor, mainColorText } = settings.styles;

const ChooseARoom: FC<ChooseARoomProps> = ({
  navigation,
  route: {
    params: {
      examinationDate,
      hospitalId,
      typeId,
      doctorId,
      examinationScheduleDetailId,
      specialistTypeId,
    },
  },
}) => {
  // data
  const [time, setTime] = useState<ExaminationScheduleData>();
  const [ready, setReady] = useState(false);

  const navTimePicker = (item: ConfigTimeExaminationBySessionData) => {
    navigation.navigate("TimePicker", {
      ...item,
      doctorName: time?.DoctorName as string,
      typeId,
      examinationScheduleDetailId,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getExaminationSchedules(
          hospitalId,
          doctorId,
          specialistTypeId,
          examinationDate,
          "examinationDate asc",
          1,
          1
        );
        setTime({ ...res.Data.Items[0] });
        setReady(true);
      } catch (error) {
        throw new Error("FETCH EXAMINATION SCHEDULES IS FAILED");
      }
    })();
  }, []);

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="CHỌN PHÒNG VÀ GIỜ KHÁM"
        previous={() => navigation.goBack()}
      />
      {!ready && <LazyLoading />}
      {ready && (time?.ConfigTimeExaminationBySessions?.length as number) > 0 && (
        <FlatList
          style={styles.body}
          data={time?.ConfigTimeExaminationBySessions}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => navTimePicker(item)}>
              <View style={styles.box}>
                <View style={styles.detail}>
                  <Icon
                    type={"Fontisto" as any}
                    name="doctor"
                    style={styles.icon}
                  />
                  <Text style={styles.name}>{time?.DoctorName}</Text>
                </View>
                <View style={styles.detail}>
                  <Icon
                    type="FontAwesome5"
                    name="hospital"
                    style={styles.icon}
                  />
                  <Text style={styles.room}>
                    Phòng: {item.RoomExaminationName} - {item.SessionTypeName}
                  </Text>
                </View>
                <Icon
                  type="Ionicons"
                  name="chevron-forward"
                  style={styles.next}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
      {ready && (!time?.ConfigTimeExaminationBySessions?.length as boolean) && (
        <Empty text="Không tìm thấy bất kì phòng nào" />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
  },
  body: {
    paddingHorizontal: padding,
  },
  box: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
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
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  room: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .5)",
  },
  next: {
    position: "absolute",
    right: 10,
    top: 10,
    fontSize: 18,
    color: mainColorText,
  },
});

export default ChooseARoom;
