import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Container, Input, Icon } from "native-base";
import { Empty, HeaderRoot, LazyLoading, Loading } from "@/components";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import { settings } from "@/config";
import { HospitalData } from "@/types/base";
import { _format } from "@/utils";
import { HospitalCodeProps } from "@/navigation/types/profile";
import { getAllMedicalRecord } from "@/api/MedicalRecordDetail";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { useAppSelector } from "@/store/hook";
import { UserData } from "@/types/User";

const { padding, mainColorText, blueColor } = settings.styles;

const HospitalCodeScreen: FC<HospitalCodeProps> = ({ navigation }) => {
  // lấy user hiện tại
  const user = useAppSelector((state) => state.user.current) as UserData;

  // get hospital data
  const [data, setData] = useState<DiagnosticData[]>([]);
  const [page, setPage] = useState({ current: 1, next: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { current, next } = page;
      if (next) {
        try {
          const res = await getAllMedicalRecord(
            user.UserId,
            user.Id,
            current,
            20
          );
          setData([...data, ...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          if (!ready) setReady(true);
        } catch (error) {
          throw new Error("FETCH ALL MEDICAL RECORD IS FAILED !!!");
        }
      }
    })();
  }, [page.current]);

  return (
    <Container style={styles.container}>
      <HeaderRoot
        title="MÃ HỒ SƠ BỆNH VIỆN"
        previous={() => navigation.goBack()}
      />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kỳ hồ sơ bệnh viện nào" />
      )}
      {ready && data.length > 0 && (
        <FlatList
          data={data}
          style={styles.body}
          keyExtractor={(i) => i.Id.toString()}
          renderItem={({ item }) => (
            <View style={styles.block}>
              <View style={styles.flex}>
                <Text style={styles.label}>MÃ HỒ SƠ BỆNH</Text>
                <Text
                  style={[
                    styles.value,
                    { color: blueColor, fontFamily: "SFProDisplay-Bold" },
                  ]}
                >
                  {item.Code}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>NƠI KHÁM</Text>
                <Text style={styles.value}>{item.HospitalName}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>ĐỊA CHỈ</Text>
                <Text style={styles.value}>{item.HospitalAddress}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>WEBSITE</Text>
                <Text
                  style={[
                    styles.value,
                    { color: blueColor, textDecorationLine: "underline" },
                  ]}
                >
                  {item.HospitalWebSite}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>SĐT</Text>
                <Text
                  style={[
                    styles.value,
                    { color: blueColor, textDecorationLine: "underline" },
                  ]}
                >
                  {item.HospitalPhone}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>NGÀY KHÁM</Text>
                <Text style={styles.value}>
                  {_format.getShortVNDate(item.ExaminationDate)}
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>THỜI GIAN</Text>
                <Text style={styles.value}>{item.ConfigTimeValue}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>BỆNH NHÂN</Text>
                <Text style={styles.value}>{user.UserFullName}</Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.label}>NGÀY SINH</Text>
                <Text style={styles.value}>
                  {_format.getShortVNDate(user.BirthDate)}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(216, 227, 232)",
  },
  body: {
    paddingHorizontal: padding,
  },
  block: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 5,
    padding: 14,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .7)",
  },
  value: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    marginLeft: 4,
    textAlign: "right",
  },
});

export default HospitalCodeScreen;
