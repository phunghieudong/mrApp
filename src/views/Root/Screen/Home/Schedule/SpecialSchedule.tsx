import {
  HeaderRoot,
  LazyLoading,
  Loading,
  ModalCenter,
  ModalLoading,
} from "@/components";
import { settings } from "@/config";
import { Container, Content, Form, Icon, Text, Toast, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SpecialScheduleProps } from "@/navigation/types/Home";
import { useFieldArray, useForm } from "react-hook-form";
import {
  DoctorData,
  LastestExaminationData,
  SpecialScheduleData,
} from "@/types/ExaminationForm";
import { Select } from "../../../Block/Schedule";
import { useAppSelector } from "@/store/hook";
import { UserData } from "@/types/User";
import { getSpeciallistType } from "@/api/Catalogue";
import { SpecialTypeData } from "@/types/base";
import { Modalize } from "react-native-modalize";
import { _format } from "@/utils";
import ModalBottom from "@/components/ModalBottom";
import { getDoctors, getLastestExamination } from "@/api/ExaminationForm";

const { mainColorText, padding, orangeColor, blueColor, placeholderColor } =
  settings.styles;

const SpecialScheduleScreen: FC<SpecialScheduleProps> = ({
  navigation,
  route: { params },
}) => {
  const {
    doctorId,
    doctorName,
    examinationDate,
    examinationScheduleDetailId,
    examinationScheduleDetailName,
    hospitalAddress,
    hospitalId,
    hospitalName,
    hospitalPhoneNumber,
    hospitalWebsite,
    roomExaminationId,
    roomExaminationName,
  } = params;

  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // status = 1 là khám mới, = 4 là tái khám
  const [status, setStatus] = useState(1);

  const _onPress = (data: SpecialScheduleData) => {
    navigation.navigate("CheckSchedule", {
      ...(data as any),
      status,
      isBHYT: status === 1 ? data.isBHYT : 2,
    });
  };

  // cảnh báo có được chuyển trang hay không
  const [next, setNext] = useState(0);

  // type = 0 khám dịch vụ, = 1 khám chuyên khoa
  const typeId = 1;
  const recordId = user.Id;
  const serviceTypeId = 7;
  const serviceTypeName = "Khám chuyên khoa";

  // giá trị thu về
  const defaultValue = {
    typeId,
    serviceTypeId,
    serviceTypeName,
    recordId,
  };
  const [value, setValue] = useState<SpecialScheduleData>({
    ...defaultValue,
    isBHYT: 2,
  });

  // modal
  const modalSpecial = useRef<Modalize>(null);
  const modalBHYT = useRef<Modalize>(null);

  // lấy dữ liệu khoa, bác sĩ và lần khám trước đó
  const [loading, setLoading] = useState(false);
  const [specialistType, setSpecialistType] = useState<SpecialTypeData[]>([]);
  const [lastestExamination, setLastestExamination] =
    useState<LastestExaminationData>();
  const doctor = useRef<Modalize>(null);
  const profile = useRef<Modalize>(null);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const handleSpecial = async (
    specialistTypeId: number,
    specialistTypeName: string
  ) => {
    Promise.all([
      Promise.resolve(
        setValue({ ...value, specialistTypeId, specialistTypeName })
      ),
      Promise.resolve(setNext(2)),
    ]);
    modalSpecial.current?.close();
  };

  const fetchSpeciallistType = async () => {
    if (value?.hospitalId) {
      try {
        const res = await getSpeciallistType(value.hospitalId);
        const data: SpecialTypeData[] = res.Data;
        setSpecialistType([...data]);
        const specialTypeTH = data.find((x) => x.Code === "TH");
        if (specialTypeTH && status === 1) {
          handleSpecial(specialTypeTH.Id, specialTypeTH.Name);
        }
      } catch (error) {
        throw new Error("FETCH SPECIAL LIST TYPE IS FAILED !");
      }
    }
  };

  const first = useRef(true);
  const fetchLastestExamination = async () => {
    if (first.current) {
      try {
        const res = await getLastestExamination();
        setLastestExamination({ ...res.Data });
        first.current = false;
      } catch (error) {
        throw new Error("FETCH LASTEST EXAMINATION IS FAILED !");
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchSpeciallistType(), fetchLastestExamination()]);
      setLoading(false);
    })();
  }, [value?.hospitalId]);

  useEffect(() => {
    (async () => {
      const { hospitalId, specialistTypeId } = value;
      if (hospitalId && specialistTypeId) {
        setLoading(true);
        const res = await getDoctors(1, 10, hospitalId, specialistTypeId);
        const data: DoctorData[] = res.Data.Items;
        setDoctors([...data]);
        if (data.length > 0 && status === 1) {
          setValue({
            ...value,
            doctorId: data[0].DoctorId,
            doctorName: data[0].DoctorName,
          });
          setNext(3);
        } else {
          setValue({
            ...value,
            doctorId: undefined,
            doctorName: undefined,
          });
        }
        setLoading(false);
      }
    })();
  }, [value?.specialistTypeId]);

  useEffect(() => {
    if (
      status === 4 &&
      lastestExamination?.Id &&
      lastestExamination.ServiceTypeId === 7
    ) {
      const {
        HospitalAddress,
        HospitalId,
        HospitalName,
        SpecialistTypeId,
        SpecialistTypeName,
        DoctorId,
        DoctorDisplayName,
        ExaminationDate,
        ExaminationScheduleDetailId,
        ExaminationScheduleDetail: {
          ConfigTimeExaminationValue,
          RoomExaminationId,
          RoomExaminationName,
        },
      } = lastestExamination;
      setValue({
        ...defaultValue,
        isBHYT: 2,
        hospitalAddress: HospitalAddress,
        hospitalId: HospitalId,
        hospitalName: HospitalName,
        hospitalPhoneNumber: "",
        hospitalWebsite: "",
        specialistTypeId: SpecialistTypeId as number,
        specialistTypeName: SpecialistTypeName as string,
        doctorId: DoctorId as number,
        doctorName: DoctorDisplayName as string,
        examinationDate: ExaminationDate,
        examinationScheduleDetailId: ExaminationScheduleDetailId,
        examinationScheduleDetailName: ConfigTimeExaminationValue,
        roomExaminationId: RoomExaminationId,
        roomExaminationName: RoomExaminationName,
      });
      setNext(5);
    } else {
      setValue({ ...defaultValue, isBHYT: 2 });
      setNext(0);
    }
  }, [status]);

  // navigation
  const navHospitalPicker = () => {
    navigation.navigate("HospitalPicker", {
      hospitalId: value?.hospitalId ?? undefined,
      typeId,
    });
  };

  const beforeNavDoctorPicker = () => {
    if (doctors.length > 0) {
      doctor.current?.open();
    } else {
      Toast.show({ text: "Hiện tại không có bác sĩ làm việc trong khoa này" });
    }
  };

  const navDoctorPicker = () => {
    doctor.current?.close();
    navigation.navigate("DoctorPicker", {
      hospitalId: value?.hospitalId as number,
      specialistTypeId: value?.specialistTypeId as number,
      doctorId: value?.doctorId ?? undefined,
      data: doctors,
    });
  };

  const navCalendar = () => {
    navigation.navigate("Calendar", {
      hospitalId: value?.hospitalId as number,
      specialistTypeId: value?.specialistTypeId as number,
      doctorId: value?.doctorId as number,
      examinationDate: value?.examinationDate ?? undefined,
      typeId,
    });
  };

  const navTimePicker = () => {
    navigation.navigate("ChooseARoom", {
      typeId,
      hospitalId: value?.hospitalId as number,
      specialistTypeId: value?.specialistTypeId as number,
      doctorId: value?.doctorId as number,
      examinationDate: value?.examinationDate as Date,
      examinationScheduleDetailId:
        value?.examinationScheduleDetailId ?? undefined,
    });
  };

  // toggle bhyt
  const toggleBHYT = (isBHYT: number, status?: "Yes", close?: true) => {
    setValue({ ...value, isBHYT });
    if (status) {
      modalBHYT.current?.open();
    } else if (close) {
      modalBHYT.current?.close();
    }
  };

  // // add or remove value
  useEffect(() => {
    (async () => {
      const {
        isBHYT: vBHYT,
        doctorId: vDI,
        doctorName: vDN,
        examinationDate: vD,
        examinationScheduleDetailId: vDDI,
        hospitalAddress: vHA,
        hospitalId: vHI,
        hospitalName: vHN,
        hospitalPhoneNumber: vHPN,
        hospitalWebsite: vHW,
        specialistTypeId: vSTI,
        specialistTypeName: vSTN,
      } = value;
      if (vHI !== hospitalId && hospitalId) {
        Promise.all([
          Promise.resolve(
            setValue({
              ...defaultValue,
              isBHYT: vBHYT,
              hospitalAddress,
              hospitalId,
              hospitalName,
              hospitalPhoneNumber,
              hospitalWebsite,
            })
          ),
          Promise.resolve(setNext(1)),
        ]);
      } else if (vDI !== doctorId && doctorId) {
        Promise.all([
          Promise.resolve(
            setValue({
              ...defaultValue,
              isBHYT: vBHYT,
              hospitalAddress: vHA,
              hospitalId: vHI,
              hospitalName: vHN,
              hospitalPhoneNumber: vHPN,
              hospitalWebsite: vHW,
              specialistTypeId: vSTI,
              specialistTypeName: vSTN,
              doctorId,
              doctorName,
            })
          ),
          Promise.resolve(setNext(3)),
        ]);
      } else if (vD !== examinationDate && examinationDate) {
        Promise.all([
          Promise.resolve(
            setValue({
              ...defaultValue,
              isBHYT: vBHYT,
              hospitalAddress: vHA,
              hospitalId: vHI,
              hospitalName: vHN,
              hospitalPhoneNumber: vHPN,
              hospitalWebsite: vHW,
              specialistTypeId: vSTI,
              specialistTypeName: vSTN,
              doctorId: vDI,
              doctorName: vDN,
              examinationDate,
            })
          ),
          Promise.resolve(setNext(4)),
        ]);
      } else if (
        vDDI !== examinationScheduleDetailId &&
        examinationScheduleDetailId
      ) {
        Promise.all([
          Promise.resolve(
            setValue({
              ...defaultValue,
              isBHYT: vBHYT,
              hospitalAddress: vHA,
              hospitalId: vHI,
              hospitalName: vHN,
              hospitalPhoneNumber: vHPN,
              hospitalWebsite: vHW,
              specialistTypeId: vSTI,
              specialistTypeName: vSTN,
              doctorId: vDI,
              doctorName: vDN,
              examinationDate: vD,
              examinationScheduleDetailId,
              examinationScheduleDetailName,
              roomExaminationId,
              roomExaminationName,
            })
          ),
          Promise.resolve(setNext(5)),
        ]);
      }
    })();
  }, [params]);

  // xử lý trước khi vào màn hình chính thì hiển thị load trang trước
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  return (
    <Container style={styles.container}>
      <HeaderRoot title="ĐẶT LỊCH KHÁM" />
      {!ready && <LazyLoading />}
      {ready && (
        <Content contentContainerStyle={styles.body}>
          <View style={styles.mainTab}>
            <TouchableWithoutFeedback onPress={() => setStatus(1)}>
              <View style={styles.rowCenter}>
                {status === 1 ? (
                  <View style={styles.rotate45}>
                    <View style={styles.blueOfCircle}></View>
                    <View style={styles.orangeOfCircle}></View>
                  </View>
                ) : (
                  <View style={styles.normalCircle} />
                )}

                <Text style={styles.tabTitle}>Khám mới</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => setStatus(4)}>
              <View style={[styles.rowCenter, { paddingLeft: 30 }]}>
                {status === 4 ? (
                  <View style={styles.rotate45}>
                    <View style={styles.blueOfCircle}></View>
                    <View style={styles.orangeOfCircle}></View>
                  </View>
                ) : (
                  <View style={styles.normalCircle} />
                )}

                <Text style={styles.tabTitle}>Tái khám</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Form style={styles.frmcontrol}>
            <Select
              nav={navHospitalPicker}
              placeholder="BỆNH VIỆN"
              next={next === 0 ? true : false}
              selected={value?.hospitalName || ""}
            />
            <Select
              nav={next >= 1 ? () => modalSpecial.current?.open() : undefined}
              placeholder="KHOA"
              next={next === 1 ? true : false}
              selected={value?.specialistTypeName || ""}
            />
            <Select
              nav={next >= 2 ? beforeNavDoctorPicker : undefined}
              placeholder="BÁC SĨ"
              next={next === 2 ? true : false}
              selected={value?.doctorName || ""}
            />
            <Select
              nav={next >= 3 ? navCalendar : undefined}
              placeholder="NGÀY KHÁM"
              next={next === 3 ? true : false}
              selected={_format.getShortVNDate(value.examinationDate) || ""}
            />
            <Select
              nav={next >= 4 ? navTimePicker : undefined}
              placeholder="GIỜ KHÁM"
              next={next === 4 ? true : false}
              selected={value.examinationScheduleDetailName || ""}
            />
            {status === 1 && (
              <View style={styles.chkbox}>
                <Text style={styles.chkboxlabel}>BẢO HIỂM Y TẾ</Text>
                <View style={styles.flex}>
                  <TouchableWithoutFeedback
                    onPress={() => modalBHYT.current?.open()}
                  >
                    <View style={styles.flex}>
                      <Icon
                        type="Feather"
                        name={value?.isBHYT < 2 ? "check-circle" : "circle"}
                        style={[
                          styles.chkboxvalue,
                          value?.isBHYT < 2 && { color: orangeColor },
                        ]}
                      />
                      <Text
                        style={[
                          styles.chkboxlabel,
                          { fontFamily: "SFProDisplay-Semibold" },
                          value?.isBHYT < 2 && { color: orangeColor },
                        ]}
                      >
                        Có
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => toggleBHYT(2)}>
                    <View style={styles.flex}>
                      <Icon
                        type="Feather"
                        name={value?.isBHYT >= 2 ? "check-circle" : "circle"}
                        style={[
                          styles.chkboxvalue,
                          value?.isBHYT >= 2 && { color: orangeColor },
                        ]}
                      />
                      <Text
                        style={[
                          styles.chkboxlabel,
                          { fontFamily: "SFProDisplay-Semibold" },
                          value?.isBHYT >= 2 && { color: orangeColor },
                        ]}
                      >
                        Không
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
            <TouchableWithoutFeedback
              onPress={next > 4 ? () => _onPress(value) : undefined}
            >
              <View
                style={[
                  styles.btn,
                  next <= 4 && { backgroundColor: placeholderColor },
                ]}
              >
                <Text style={styles.btntext}>TIẾP THEO</Text>
              </View>
            </TouchableWithoutFeedback>
          </Form>
          <ModalCenter ref={modalSpecial} style={{ borderRadius: 4 }}>
            <>
              {specialistType.length > 0 &&
                specialistType.map((i) => (
                  <TouchableWithoutFeedback
                    key={i.Id}
                    onPress={() => handleSpecial(i.Id, i.Name)}
                  >
                    <View style={styles.special}>
                      <Text
                        style={[
                          styles.specialname,
                          value?.specialistTypeId === i.Id && {
                            color: blueColor,
                          },
                        ]}
                      >
                        {i.Name}
                      </Text>
                      {value?.specialistTypeId === i.Id && (
                        <Icon
                          type="Feather"
                          name="check-circle"
                          style={styles.specialicon}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              {!specialistType.length && (
                <Text style={[styles.special, styles.specialname]}>
                  Hiện tại chưa có bất kỳ khoa nào
                </Text>
              )}
            </>
          </ModalCenter>
          <ModalBottom heading="Kiểm tra bảo hiểm y tế" ref={modalBHYT}>
            <>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(0, undefined, true)}
              >
                Có giấy chuyển BHYT đúng tuyến BV MrApp
              </Text>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(1, undefined, true)}
              >
                Tái khám theo hẹn trên toa thuốc BHYT của BV MrApp
              </Text>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(2, undefined, true)}
              >
                Không phải 2 trường hợp trên
              </Text>
            </>
          </ModalBottom>
          <ModalBottom ref={doctor} heading="Chức năng">
            <View style={styles.modal}>
              <TouchableWithoutFeedback onPress={() => profile.current?.open()}>
                <View style={styles.box}>
                  <Text style={styles.text}>Xem thông tin bác sĩ</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={navDoctorPicker}>
                <View style={styles.box}>
                  <Text style={styles.text}>Tìm bác sĩ khác</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ModalBottom>
          {doctors.length > 0 && (
            <ModalBottom ref={profile} heading="Thông tin bác sĩ">
              <View style={styles.modal}>
                <Text style={styles.label}>TÊN BÁC SĨ</Text>
                <Text style={styles.value}>{doctors[0].DoctorName}</Text>
                <Text style={styles.label}>GIỚI TÍNH</Text>
                <Text style={styles.value}>{doctors[0].DoctorGenderName}</Text>
                <Text style={styles.label}>CHUYÊN KHOA</Text>
                <Text style={styles.value}>
                  {doctors[0].SpecialistTypeName}
                </Text>
                <Text style={styles.label}>LỊCH KHÁM</Text>
                {doctors[0].DayOfWeekDisplays.map((i) => (
                  <Text key={i.DayOfWeekName} style={styles.value}>
                    {_format.getShortSession(i.SessionTypeName) +
                      ": " +
                      i.DayOfWeekName}
                  </Text>
                ))}
              </View>
            </ModalBottom>
          )}
          <ModalLoading visible={loading} />
        </Content>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  frmcontrol: {
    marginTop: -20,
  },
  chkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  chkboxlabel: {
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Semibold",
    color: "#333",
  },
  chkboxvalue: {
    marginLeft: 10,
    marginRight: 4,
    padding: 4,
    fontSize: 20,
    color: placeholderColor,
  },
  btn: {
    marginVertical: 15,
    backgroundColor: blueColor,
    alignSelf: "flex-end",
    elevation: 4,
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 19,
    borderRadius: 100,
  },
  btntext: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  blueOfCircle: {
    width: 20,
    height: 10,
    borderTopStartRadius: 999,
    borderTopEndRadius: 999,
    backgroundColor: "#279EBA",
  },
  orangeOfCircle: {
    width: 20,
    height: 10,
    borderBottomStartRadius: 999,
    borderBottomEndRadius: 999,
    backgroundColor: "#FB8500",
  },
  normalCircle: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#e6e6e6",
  },
  tabTitle: {
    marginLeft: 10,
    fontFamily: "SFProDisplay-Regular",
    color: "#219EBC",
  },
  rotate45: {
    transform: [{ rotate: "-45deg" }],
  },
  mainTab: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  special: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  specialname: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  specialicon: {
    fontSize: 20,
    color: blueColor,
  },
  bhyt: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 16,
    lineHeight: 21,
    color: blueColor,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modal: {
    paddingVertical: 10,
    paddingHorizontal: padding,
  },
  box: {
    paddingTop: 15,
    paddingBottom: 17,
    backgroundColor: blueColor,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginBottom: 6,
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
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

export default SpecialScheduleScreen;
