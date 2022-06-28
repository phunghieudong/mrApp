import { getUpcomingExaminationCalendar } from "@/api/ExaminationCalendar";
import {
  Dialog,
  HeaderRoot,
  LazyLoading,
  Loading,
  ModalCenter,
  ModalLoading,
} from "@/components";
import { settings } from "@/config";
import { CalendarData } from "@/types/ExaminationCalendar";
import { Container, Text, Toast, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ExaminationCalendarProps } from "@/navigation/types/Home";
import { removePayment, updatePayment } from "@/api/ExaminationForm";
import { Modalize } from "react-native-modalize";
import ModalBottom from "@/components/ModalBottom";
import { _format } from "@/utils";

const {
  mainColorText,
  padding,
  blueColor,
  dangerColor,
  dangerColorLight,
  borderColor,
  successColor,
} = settings.styles;

const renderItem = (
  item: CalendarData,
  index,
  pay: (item: CalendarData) => void,
  noti: (item: CalendarData, index: number) => void,
  see: (item: CalendarData) => void
) => {
  let first = {};
  if (index === 0) first["borderTopWidth"] = 0;

  return (
    <View style={[styles.item, first]}>
      <View style={styles.left}>
        <Text style={styles.word}>BV</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.date}>
          {_format.getVNDate(item.ExaminationDate)}{" "}
          {(item.Status === 2 || item.Status === 5) && (
            <Text style={[styles.paid, { color: successColor }]}>
              {"- Đã thanh toán"}
            </Text>
          )}
          {item.Status === 1 && (
            <Text style={styles.paid}>{"- Đang chờ xác nhận"}</Text>
          )}
          {item.Status === 0 && (
            <Text style={[styles.paid, { color: dangerColor }]}>
              {"- Chưa thanh toán"}
            </Text>
          )}
        </Text>
        <Text style={styles.hospital}>{item.HospitalName}</Text>
        <Text style={styles.position}>
          {item.RoomExaminationName} - {"09:00 ~ 10:00"}
        </Text>
        <View style={styles.flex}>
          {item.Status === 0 && (
            <TouchableWithoutFeedback onPress={() => pay(item)}>
              <View style={[styles.btn, { backgroundColor: blueColor }]}>
                <Text style={[styles.btntext, { color: "#fff" }]}>
                  XÁC NHẬN
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          {(item.Status === 2 || item.Status === 5) && (
            <TouchableWithoutFeedback onPress={() => see(item)}>
              <View style={[styles.btn, { backgroundColor: blueColor }]}>
                <Text style={[styles.btntext, { color: "#fff" }]}>
                  CHI TIẾT
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={() => noti(item, index)}>
            <View style={styles.btn}>
              <Text style={styles.btntext}>HỦY</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const ExaminationCalendarScreen: FC<ExaminationCalendarProps> = ({
  navigation,
}) => {
  // thông báo hủy lịch hẹn, xem thông tin lịch hẹn
  const notification = useRef<Modalize>(null);
  const seeCalendar = useRef<Modalize>(null);
  const [item, setItem] = useState<CalendarData & { index?: number }>();
  // const calendar = useRef<{ examinationFormId?: number; index?: number, status?: number }>({});

  // các chức năng
  const pay = (item: CalendarData) => {
    const newParams = {
      doctorId: item.DoctorId,
      doctorName: item.DoctorDisplayName,
      examinationDate: item.ExaminationDate,
      examinationScheduleDetailId: item.ExaminationScheduleDetailId,
      examinationScheduleDetailName: item.ConfigTimeExaminationValue,
      hospitalId: item.HospitalId,
      hospitalName: item.HospitalName,
      hospitalAddress: item.HospitalAddress,
      hospitalWebsite: item.HospitalWebSite,
      hospitalPhoneNumber: item.HospitalPhone,
      isBHYT: item.IsBHYT ? 1 : 2,
      roomExaminationId: item.RoomExaminationId,
      roomExaminationName: item.RoomExaminationName,
      specialistTypeId: item.SpecialistTypeId
        ? item.SpecialistTypeId
        : undefined,
      specialistTypeName: item.SpecialistTypeName
        ? item.SpecialistTypeName
        : undefined,
      serviceTypeId: item.ServiceTypeId,
      serviceTypeName: item.ServiceTypeName,
      typeId: item.TypeId,
      recordId: item.RecordId,
      examinationFormId: item.Id,
      status: item.Status,
      form: 0,
    };
    navigation.navigate("CheckSchedule", { ...newParams });
  };

  const noti = (item: CalendarData, index: number) => {
    setItem({ ...item, index });
    notification.current?.open();
  };

  const remove = async () => {
    if (item) {
      try {
        const { index, Id } = item;
        if (typeof index === "number") {
          await removePayment(Id);
          setCalendarsUpcoming([
            ...calendarsUpcoming.slice(0, index),
            ...calendarsUpcoming.slice(index + 1),
          ]);
          notification.current?.close();
        }
      } catch (error) {
        Toast.show({ text: "Hủy lịch hẹn thất bại" });
      }
    }
  };

  const see = (item: CalendarData) => {
    setItem(item);
    seeCalendar.current?.open();
  };

  // dữ liệu lịch sử khám bệnh sắp tới
  const [ready, setReady] = useState(false);
  const [calendarsUpcoming, setCalendarsUpcoming] = useState<
    Array<CalendarData>
  >([]);

  // page
  const [page, setPage] = useState({ current: 1, next: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { current, next } = page;
        if (next) {
          setLoading(true);
          const res = await getUpcomingExaminationCalendar(current, 10);
          if (current <= 1) {
            setCalendarsUpcoming([...res.Data.Items]);
          } else {
            setCalendarsUpcoming([...calendarsUpcoming, ...res.Data.Items]);
          }
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
        }
      } catch (error) {
        throw new Error("FETCH CALENDAR DATA IS FAILED !");
      } finally {
        if (!ready) setReady(true);
        setLoading(false);
      }
    })();
  }, [page.current]);

  return (
    <Container>
      <HeaderRoot title="LỊCH KHÁM SẮP TỚI" />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <FlatList
            style={styles.body}
            data={calendarsUpcoming}
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item, index }) =>
              renderItem(item, index, pay, noti, see)
            }
          />
          <ModalLoading visible={loading} />
          <ModalCenter ref={notification} style={{ borderRadius: 2 }}>
            <Dialog
              text={{
                heading: "Thông báo",
                body: 'Bạn có chắc muốn hủy lịch hẹn này? Nếu chắc thì hãy bấm "TIẾP TỤC" (Lưu ý: Nếu hủy lịch 3 lần sẽ bị khóa tài khoản)',
              }}
              button={{
                ok: {
                  text: "TIẾP TỤC",
                  onPress: item ? remove : undefined,
                },
                cancel: {
                  text: "HUỶ BỎ",
                  onPress: () => notification.current?.close(),
                },
              }}
            />
          </ModalCenter>
          <ModalBottom ref={seeCalendar} heading="Xem chi tiết lịch hẹn">
            <View style={styles.modal}>
              <Text style={styles.label}>BỆNH VIỆN</Text>
              <Text style={styles.value}>{item?.HospitalName}</Text>
              <Text style={styles.label}>ĐỊA CHỈ</Text>
              <Text style={styles.value}>{item?.HospitalAddress}</Text>
              <Text style={styles.label}>WEBSITE</Text>
              <Text style={styles.value}>{item?.HospitalWebSite}</Text>
              <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
              <Text style={styles.value}>{item?.HospitalPhone}</Text>
              <Text style={styles.label}>LOẠI KHÁM</Text>
              <Text style={styles.value}>{item?.ServiceTypeName}</Text>
              {item?.ServiceTypeId === 7 && (
                <>
                  <Text style={styles.label}>CHUYÊN KHOA</Text>
                  <Text style={styles.value}>{item?.SpecialistTypeName}</Text>
                </>
              )}
              <Text style={styles.label}>PHÒNG KHÁM</Text>
              <Text style={styles.value}>{item?.RoomExaminationName}</Text>
              <Text style={styles.label}>NGÀY KHÁM</Text>
              <Text style={styles.value}>
                {_format.getVNDate(item?.ExaminationDate)}
              </Text>
              <View style={{ height: 10 }} />
            </View>
          </ModalBottom>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: padding,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor,
  },
  left: {
    marginRight: 12,
    backgroundColor: blueColor,
    borderRadius: 6,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    color: "#fff",
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 2,
  },
  right: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  paid: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: blueColor,
  },
  hospital: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  position: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .6)",
  },
  flex: {
    flexDirection: "row",
    marginTop: 11,
  },
  btn: {
    marginRight: 12,
    backgroundColor: dangerColorLight,
    minWidth: 100,
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 100,
  },
  btntext: {
    color: dangerColor,
    textAlign: "center",
    fontSize: 14,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
  },
  modal: {
    paddingHorizontal: padding,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000006a",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: "#0000009a",
  },
});

export default ExaminationCalendarScreen;
