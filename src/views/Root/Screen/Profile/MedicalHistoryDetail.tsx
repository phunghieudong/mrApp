import { getHospitals } from "@/api/Catalogue";
import { getExaminationFormHistory } from "@/api/ExaminationForm";
import {
  Empty,
  HeaderRoot,
  LazyLoading,
  ModalCenter,
  ModalLoading,
} from "@/components";
import ModalBottom from "@/components/ModalBottom";
import { settings } from "@/config";
import { MedicalHistoryDetailProps } from "@/navigation/types/profile";
import { HospitalData } from "@/types/base";
import { CalendarData } from "@/types/ExaminationCalendar";
import { _format } from "@/utils";
import { Container, Icon, Text, DatePicker, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Modalize } from "react-native-modalize";
// import DateTimePicker from "@react-native-community/datetimepicker";

const { borderColor, padding, blueColor, mainColorText, successColor } =
  settings.styles;

const renderItem = (
  item: CalendarData,
  index,
  see: (item: CalendarData) => void
) => {
  let last = {};
  if (index === 0) last["borderTopWidth"] = 0;

  return (
    <View style={[styles.item, last]}>
      <View style={styles.left}>
        <Text style={styles.word}>BV</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.date}>
          {_format.getVNDate(item.ExaminationDate)}{" "}
          <Text style={[styles.paid, { color: successColor }]}>
            {"- Đã khám"}
          </Text>
        </Text>
        <Text style={styles.hospital}>{item.HospitalName}</Text>
        <Text style={styles.position}>
          {item.RoomExaminationName} - {"09:00 ~ 10:00"}
        </Text>
        <View style={styles.flex}>
          <TouchableWithoutFeedback onPress={() => see(item)}>
            <View style={[styles.btn, { backgroundColor: blueColor }]}>
              <Text style={[styles.btntext, { color: "#fff" }]}>CHI TIẾT</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const MedicalHistoryDetail: FC<MedicalHistoryDetailProps> = ({
  navigation,
}) => {
  // dữ liệu lịch sử khám bệnh đã khám
  const [data, setData] = useState<CalendarData[]>([]);
  const [ready, setReady] = useState(0);

  // dữ liệu bệnh viện
  const [hospitals, setHospital] = useState<HospitalData[]>([]);

  // phân trang
  const [page, setPage] = useState({ current: 1, next: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHospitals();
        setHospital([...res.Data]);
        setReady((prev) => prev + 1);
      } catch (error) {
        throw new Error("FETCH HOSPITAL DATA IS FAILED");
      }
    })();
  }, []);

  // filter
  const [hospitalId, setHospitalId] = useState<number | undefined>();
  const hospitalName = useRef("");
  const [date, setDate] = useState(undefined);
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleHospital = (id: number | undefined, name: string) => {
    setHospitalId(id);
    hospitalName.current = name;
    hospital.current?.close();
  };

  const [lastFilter, setLastFilter] = useState<{
    hospitalId?: number;
    examinationDate?: Date;
  }>({});

  const _onFilter = () => {
    Promise.all([
      Promise.resolve(setLastFilter({ hospitalId, examinationDate: date })),
      Promise.resolve(setPage({ current: 1, next: true })),
    ]);
  };

  useEffect(() => {
    (async () => {
      try {
        const { current, next } = page;
        if (next) {
          setLoading(true);
          const params = {
            hospitalId: lastFilter.hospitalId,
            examinationDate: lastFilter.examinationDate,
            statusIds: 6,
            pageIndex: current,
            pageSize: 10,
          };
          const res = await getExaminationFormHistory(params);
          if (current <= 1) {
            if (res.Data.Items !== null) setData([...res.Data.Items]);
            else setData([]);
          } else {
            setData([...data, ...res.Data.Items]);
          }
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
        }
      } catch (error) {
        throw new Error("FETCH CALENDAR DATA IS FAILED !");
      } finally {
        if (ready < 2) setReady((prev) => prev + 1);
        setLoading(false);
      }
    })();
  }, [page.current, lastFilter]);

  const info = useRef<Modalize>(null);
  const hospital = useRef<Modalize>(null);
  const filter = useRef<Modalize>(null);
  const [item, setItems] = useState<CalendarData>();
  const see = (item: CalendarData) => {
    setItems({ ...item });
    info.current?.open();
  };

  return (
    <Container>
      <HeaderRoot
        title="Lịch sử khám bệnh"
        previous={() => navigation.goBack()}
        notifications={false}
        filter={() => filter.current?.open()}
      />
      {ready < 2 && <LazyLoading />}
      {ready >= 2 && (
        <>
          {!data.length && (
            <Empty text="Không tìm thấy bất kỳ lịch sử khám bệnh nào" />
          )}
          {data.length > 0 && (
            <>
              <FlatList
                style={styles.body}
                data={data}
                onEndReached={() =>
                  setPage({ ...page, current: page.current + 1 })
                }
                onEndReachedThreshold={0.5}
                keyExtractor={(item) => item.Id.toString()}
                renderItem={({ item, index }) => renderItem(item, index, see)}
              />
              <ModalBottom ref={info} heading="Xem chi tiết">
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
                      <Text style={styles.value}>
                        {item?.SpecialistTypeName}
                      </Text>
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
          <ModalBottom
            onClose={() => setReady((prev) => prev + 1)}
            ref={filter}
            heading="Bộ lọc"
          >
            <View style={[styles.modal, { paddingVertical: 6 }]}>
              <Text
                style={[
                  styles.label,
                  { color: mainColorText, fontFamily: "SFProDisplay-Medium" },
                ]}
              >
                BỆNH VIỆN
              </Text>
              <TouchableWithoutFeedback
                onPress={() => hospital.current?.open()}
              >
                <View style={styles.selected}>
                  <Text style={styles.selectedtext}>
                    {hospitalId ? hospitalName.current : "Tất cả"}
                  </Text>
                  <Icon
                    type="Ionicons"
                    name="chevron-down"
                    style={styles.selectedicon}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text
                style={[
                  styles.label,
                  { color: mainColorText, fontFamily: "SFProDisplay-Medium" },
                ]}
              >
                THỜI GIAN
              </Text>
              <View style={styles.selected}>
                <Text onPress={() => setShow(true)} style={styles.selectedtext}>
                  {date ? _format.getShortVNDate(date) : "Tất cả"}
                </Text>
                {!date && (
                  <TouchableWithoutFeedback onPress={() => setShow(true)}>
                    <Icon
                      type="Ionicons"
                      name="chevron-down"
                      style={styles.selectedicon}
                    />
                  </TouchableWithoutFeedback>
                )}
                {date && (
                  <TouchableWithoutFeedback onPress={() => setDate(undefined)}>
                    <Icon
                      type="Ionicons"
                      name="close"
                      style={styles.selectedicon}
                    />
                  </TouchableWithoutFeedback>
                )}
              </View>
              <TouchableWithoutFeedback
                onPress={loading ? undefined : _onFilter}
              >
                <View style={styles.filter}>
                  <Text style={styles.filtertext}>TÌM KIẾM</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ModalBottom>
          <ModalCenter ref={hospital} style={{ borderRadius: 4 }}>
            <>
              <TouchableWithoutFeedback
                onPress={() => handleHospital(undefined, "")}
              >
                <View style={styles.picker}>
                  <Text style={styles.pickertext}>Tất cả</Text>
                </View>
              </TouchableWithoutFeedback>
              {hospitals.map((i) => (
                <TouchableWithoutFeedback
                  key={i.Id}
                  onPress={() => handleHospital(i.Id, i.Name)}
                >
                  <View style={styles.picker}>
                    <Text style={styles.pickertext} key={i.Id}>
                      {i.Name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </>
          </ModalCenter>
          {show && (
            <DatePicker
              defaultDate={date ?? new Date()}
              mode="date"
              onChange={onChangeDate}
            />
          )}
          <ModalLoading visible={loading} />
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
    backgroundColor: "#fff",
    minWidth: 100,
    paddingTop: 8,
    paddingBottom: 10,
    borderRadius: 100,
  },
  btntext: {
    color: blueColor,
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
  selected: {
    borderWidth: 1,
    borderColor,
    borderRadius: 4,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    marginVertical: 6,
  },
  selectedtext: {
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 40,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
    flex: 1,
    height: "100%",
  },
  selectedicon: {
    textAlignVertical: "center",
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 20,
    color: mainColorText,
  },
  filter: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 57,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
  },
  filtertext: {
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 7,
    paddingBottom: 9,
    paddingHorizontal: 14,
  },
  pickertext: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
});

export default MedicalHistoryDetail;
