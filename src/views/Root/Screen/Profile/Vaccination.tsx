import { Empty, HeaderRoot, LazyLoading, ModalLoading } from "@/components";
import { Container, Icon, Text, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import { SectionList, StyleSheet } from "react-native";
import { BaseHeadingDate } from "../../Block/Base";
import BaseHospital from "../../Block/Base/BaseHospital";
import { VaccinationProps } from "@/navigation/types/Profile";
import { CalendarData } from "@/types/ExaminationCalendar";
import { getVaccineCalendar } from "@/api/ExaminationCalendar";
import { Modalize } from "react-native-modalize";
import { _format } from "@/utils";
import { settings } from "@/config";

const {
  padding,
  borderColor,
  blueColor,
  mainColorText,
  mainColorLight,
  orangeColor,
  orangeColorLight,
  dangerColor,
  dangerColorLight,
} = settings.styles;

const VaccinationScreen: FC<VaccinationProps> = ({ navigation }) => {
  const [data, setData] = useState<CalendarData[]>([]);
  const [page, setPage] = useState({ current: 1, next: true });
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { current, next } = page;
      if (next) {
        try {
          setLoading(true);
          const res = await getVaccineCalendar(1, 10);
          setData([...data, ...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          setLoading(false);
          if (!ready) setReady(true);
        } catch (error) {
          throw new Error("FETCH VACCINE DATA IS FAILED !");
        }
      }
    })();
  }, [page.current]);

  return (
    <Container>
      <HeaderRoot
        title="LỊCH TIÊM CHỦNG"
        previous={() => navigation.goBack()}
      />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kỳ lịch tiêm chủng nào cả" />
      )}
      {ready && data.length > 0 && (
        <>
          <SectionList
            sections={data.map((item) => {
              return { title: item, data: [item] };
            })}
            stickySectionHeadersEnabled
            renderSectionHeader={({ section }) => (
              <BaseHeadingDate
                text={
                  _format.getDateOfWeek(section.title.ExaminationDate) +
                  ", " +
                  _format.getShortVNDate(section.title.ExaminationDate)
                }
              />
            )}
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[styles.block, index === 0 && { borderTopWidth: 0 }]}
              >
                <Text style={styles.hospital}>{item.VaccineTypeName}</Text>
                <Text style={styles.address}>{item.HospitalName}</Text>
                <View style={styles.flex}>
                  <Icon
                    type="MaterialIcons"
                    name="add-location"
                    style={styles.icon}
                  />
                  <Text style={styles.address}>{item.HospitalAddress}</Text>
                </View>
                <View style={styles.flex}>
                  <Icon type="FontAwesome" name="phone" style={styles.icon} />
                  <Text style={styles.address}>{item.HospitalPhone}</Text>
                </View>
                <View style={styles.line} />
                <Text style={styles.address}>
                  Mũi thứ: {item.TotalCurrentInjections}
                </Text>
                <Text style={styles.address}>
                  Tổng số mũi phải tiêm: {item.NumberOfDoses}
                </Text>
                <Text style={styles.address}>
                  Mũi kế tiếp: {item.NextInjectionDateDisplay}
                </Text>
                {(item.TotalCurrentInjections as number) <
                  (item.NumberOfDoses as number) && (
                  <View
                    style={[
                      styles.status,
                      item.Status === 6 && {
                        backgroundColor: mainColorLight,
                      },
                    ]}
                  >
                    <Icon
                      type="Feather"
                      name={item.Status === 6 ? "check-circle" : "x-circle"}
                      style={[
                        styles.statusicon,
                        item.Status === 6 && { color: blueColor },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statustext,
                        item.Status === 6 && { color: blueColor },
                      ]}
                    >
                      {item.Status === 6 ? "Đã" : "Chưa"} chích
                    </Text>
                  </View>
                )}
                {(item.TotalCurrentInjections as number) ===
                  (item.NumberOfDoses as number) && (
                  <View
                    style={[
                      styles.status,
                      {
                        backgroundColor: orangeColorLight,
                      },
                    ]}
                  >
                    <Icon
                      type="Feather"
                      name={item.Status === 6 ? "check-circle" : "x-circle"}
                      style={[styles.statusicon, { color: orangeColor }]}
                    />
                    <Text style={[styles.statustext, { color: orangeColor }]}>
                      Đã chích đủ
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  block: {
    borderTopWidth: 1,
    borderColor,
    marginHorizontal: padding,
    marginTop: 10,
  },
  hospital: {
    color: blueColor,
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Bold",
    textTransform: "uppercase",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 14,
    marginRight: 8,
    color: mainColorText,
    opacity: 0.5,
  },
  address: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1.5,
    color: mainColorText,
    opacity: 0.5,
  },
  line: {
    borderTopWidth: 1,
    borderColor,
    marginTop: 10,
    marginBottom: 10,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginLeft: padding,
    backgroundColor: dangerColorLight,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 9,
    borderRadius: 100,
  },
  statusicon: {
    color: dangerColor,
    fontSize: 18,
    marginRight: 8,
  },
  statustext: {
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    color: dangerColor,
  },
});

export default VaccinationScreen;
