import {
  HeaderRoot,
  LazyLoading,
  ModalCenter,
  ModalLoading,
} from "@/components";
import { settings } from "@/config";
import { Container, Content, Form, Icon, Text, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { NormalScheduleProps } from "@/navigation/types/Home";
import { Select } from "../../../Block/Schedule";
import {
  LastestExaminationData,
  NormalScheduleData,
} from "@/types/ExaminationForm";
import { useAppSelector } from "@/store/hook";
import { UserData } from "@/types/User";
import { _format } from "@/utils";
import { getServices, getSpeciallistType, getVaccines } from "@/api/Catalogue";
import { ServiceData, SpecialTypeData, VaccineData } from "@/types/base";
import { Modalize } from "react-native-modalize";
import ModalBottom from "@/components/ModalBottom";
import { getLastestExamination } from "@/api/ExaminationForm";

const { mainColorText, padding, orangeColor, blueColor, placeholderColor } =
  settings.styles;

const NormalScheduleScreen: FC<NormalScheduleProps> = ({
  navigation,
  route: { params },
}) => {
  const {
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

  // typeId = 0 là khám dịch vụ, = 1 là khám chuyên khoa
  const typeId = 0;
  const recordId = user.Id;

  // cảnh báo có nên được chuyển trang hay không ?
  const [next, setNext] = useState(0);

  // giá trị thu về
  const defaultValue = { isBHYT: 2, typeId, recordId };
  const [value, setValue] = useState<NormalScheduleData>(defaultValue);

  useEffect(() => {
    (async () => {
      const {
        examinationDate: vD,
        hospitalAddress: vHA,
        hospitalId: vHI,
        hospitalName: vHN,
        hospitalPhoneNumber: vHPN,
        hospitalWebsite: vHW,
        examinationScheduleDetailId: vDDI,
        specialistTypeId: vSpTI,
        specialistTypeName: vSpTN,
        serviceTypeId: vSTI,
        serviceTypeName: vSTN,
        isBHYT: vBHYT,
        vaccineTypeId: vTI,
        vaccineTypeName: vTN,
        isBHYTService: vBHYTS,
      } = value;
      if (vHI !== hospitalId) {
        setValue({
          isBHYT: vBHYT,
          typeId,
          recordId: user.Id,
          hospitalId,
          hospitalAddress,
          hospitalName,
          hospitalPhoneNumber,
          hospitalWebsite,
        });
        setNext(1);
      } else if (vD !== examinationDate) {
        setValue({
          isBHYT: vBHYT,
          typeId,
          recordId: user.Id,
          hospitalId: vHI,
          hospitalAddress: vHA,
          hospitalName: vHN,
          hospitalPhoneNumber: vHPN,
          hospitalWebsite: vHW,
          specialistTypeId: vSpTI,
          specialistTypeName: vSpTN,
          serviceTypeId: vSTI,
          serviceTypeName: vSTN,
          vaccineTypeId: vTI,
          vaccineTypeName: vTN,
          examinationDate,
          isBHYTService: vBHYTS,
        });
        setNext(4);
      } else if (vDDI !== examinationScheduleDetailId) {
        setValue({
          isBHYT: vBHYT,
          typeId,
          recordId: user.Id,
          hospitalId: vHI,
          hospitalAddress: vHA,
          hospitalName: vHN,
          hospitalPhoneNumber: vHPN,
          hospitalWebsite: vHW,
          specialistTypeId: vSpTI,
          specialistTypeName: vSpTN,
          serviceTypeId: vSTI,
          serviceTypeName: vSTN,
          vaccineTypeId: vTI,
          vaccineTypeName: vTN,
          examinationDate: vD,
          isBHYTService: vBHYTS,
          examinationScheduleDetailId,
          examinationScheduleDetailName,
          roomExaminationId,
          roomExaminationName,
        });
        setNext(5);
      }
    })();
  }, [params]);

  // modal để hiện thông tin
  const modalService = useRef<Modalize>(null);
  const modalVaccine = useRef<Modalize>(null);
  const modalBHYT = useRef<Modalize>(null);
  const modalSpecial = useRef<Modalize>(null);

  const handleModal = (
    id: number,
    name: string,
    isBHYT: boolean = false,
    type: "service" | "vaccine"
  ) => {
    if (type === "service") {
      setValue({
        ...value,
        serviceTypeId: id,
        serviceTypeName: name,
        isBHYTService: isBHYT,
        vaccineTypeId: undefined,
        vaccineTypeName: undefined,
      });
      if (id === 6 && next < 5) setNext(2);
      else if (id !== 6 && next < 5) setNext(3);
      modalService.current?.close();
    } else {
      setValue({
        ...value,
        vaccineTypeId: id,
        vaccineTypeName: name,
      });
      if (next < 5) setNext(3);
      modalVaccine.current?.close();
    }
  };

  // xử lý chọn bảo hiểm y tế
  const toggleBHYT = (isBHYT: number, status?: "Yes", close?: true) => {
    setValue({ ...value, isBHYT });
    if (status) {
      modalBHYT.current?.open();
    } else if (close) {
      modalBHYT.current?.close();
    }
  };

  // status = 1 là khám mới, = 4 tái khám
  const [status, setStatus] = useState(1);
  const _onPress = (data: NormalScheduleData) => {
    navigation.navigate("CheckSchedule", {
      ...(data as any),
      status,
      isBHYT: status === 1 ? data.isBHYT : 2,
    });
  };

  // lấy dữ liệu dịch vụ, vaccine và lần khám trước đó
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [specialistType, setSpecialistType] = useState<SpecialTypeData[]>([]);
  const [lastestExamination, setLastestExamination] =
    useState<LastestExaminationData>();
  const [vaccines, setVaccines] = useState<VaccineData[]>([]);

  const fetchServices = async (hospitalId: number) => {
    try {
      const res = await getServices(hospitalId);
      setServices([...res.Data]);
    } catch (error) {
      throw new Error("FETCH SERVICES IS FAILED !");
    }
  };

  const fetchSpeciallistType = async (hospitalId: number) => {
    try {
      const res = await getSpeciallistType(hospitalId);
      const data: SpecialTypeData[] = res.Data;
      setSpecialistType([...data]);
      const specialTypeTH = data.find((x) => x.Code === "TH");
      if (specialTypeTH && status === 1) {
        handleSpecial(specialTypeTH.Id, specialTypeTH.Name);
      }
    } catch (error) {
      throw new Error("FETCH SPECIAL LIST TYPE IS FAILED !");
    }
  };

  const handleSpecial = async (
    specialistTypeId: number,
    specialistTypeName: string
  ) => {
    Promise.all([
      Promise.resolve(
        setValue({ ...value, specialistTypeId, specialistTypeName })
      ),
      Promise.resolve(next < 2 && setNext(2)),
    ]);
    modalSpecial.current?.close();
  };

  const fetchVaccines = async (hospitalId: number) => {
    try {
      const res = await getVaccines(hospitalId);
      setVaccines([...res.Data]);
    } catch (error) {
      throw new Error("FETCH VACCINE IS FAILED !");
    }
  };

  const fetchLastestExamination = async () => {
    try {
      const res = await getLastestExamination();
      setLastestExamination({ ...res.Data });
    } catch (error) {
      throw new Error("FETCH LASTEST EXAMINATION IS FAILED !");
    }
  };

  useEffect(() => {
    (async () => {
      if (value?.hospitalId && status === 1) {
        setLoading(true);
        await Promise.all([
          fetchServices(value?.hospitalId),
          fetchVaccines(value?.hospitalId),
          fetchSpeciallistType(value?.hospitalId),
        ]);
        setLoading(false);
      }
    })();
  }, [value?.hospitalId]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchLastestExamination();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (
      status === 4 &&
      lastestExamination?.Id &&
      lastestExamination.ServiceTypeId < 7
    ) {
      const {
        HospitalAddress,
        HospitalId,
        HospitalName,
        ServiceTypeId,
        ServiceTypeName,
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
        hospitalAddress: HospitalAddress,
        hospitalId: HospitalId,
        hospitalName: HospitalName,
        hospitalPhoneNumber: "",
        hospitalWebsite: "",
        serviceTypeId: ServiceTypeId,
        serviceTypeName: ServiceTypeName,
        examinationDate: ExaminationDate,
        examinationScheduleDetailId: ExaminationScheduleDetailId,
        examinationScheduleDetailName: ConfigTimeExaminationValue,
        roomExaminationId: RoomExaminationId,
        roomExaminationName: RoomExaminationName,
      });
      setNext(5);
    } else {
      setValue({ ...defaultValue });
      setNext(0);
    }
  }, [status]);

  // chuyển hướng trang
  const navHospital = () => {
    navigation.navigate("HospitalPicker", {
      hospitalId: value?.hospitalId ?? undefined,
      typeId,
    });
  };

  const navCalendar = () => {
    navigation.navigate("Calendar", {
      hospitalId: value?.hospitalId as number,
      examinationDate: value?.examinationDate ?? undefined,
      typeId,
    });
  };

  const navTimePicker = () => {
    navigation.navigate("ChooseARoom", {
      typeId,
      examinationDate: params?.examinationDate as Date,
      hospitalId: params?.hospitalId as number,
      examinationScheduleDetailId:
        value?.examinationScheduleDetailId ?? undefined,
    });
  };

  // // xử lý trước khi vào màn hình chính thì hiển thị load trang trước
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  return (
    <Container style={styles.container}>
      <HeaderRoot title="Đặt lịch khám" />
      {!ready && <LazyLoading />}
      {ready && (
        <>
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
                nav={navHospital}
                placeholder="CHỌN BỆNH VIỆN"
                next={next >= 0 ? true : false}
                selected={value?.hospitalName || ""}
              />
              <Select
                nav={next >= 1 ? () => modalSpecial.current?.open() : undefined}
                placeholder="KHOA"
                next={next === 1 ? true : false}
                selected={value?.specialistTypeName || ""}
              />
              <Select
                nav={next >= 2 ? () => modalService.current?.open() : undefined}
                placeholder="CHỌN DỊCH VỤ"
                next={next >= 2 ? true : false}
                selected={value?.serviceTypeName || ""}
              />
              {value.isBHYTService === false && (
                <Text style={styles.note}>
                  *LƯU Ý: Dịch vụ này hiện tại {value.hospitalName} chưa hỗ trợ
                  bảo hiểm y tế
                </Text>
              )}
              {value?.serviceTypeId === 6 && (
                <Select
                  nav={
                    next >= 2 ? () => modalVaccine.current?.open() : undefined
                  }
                  placeholder="CHỌN VACCINE"
                  next={next >= 2 ? true : false}
                  selected={value?.vaccineTypeName || ""}
                />
              )}
              <Select
                nav={next >= 3 ? navCalendar : undefined}
                placeholder="CHỌN NGÀY KHÁM"
                next={next >= 3 ? true : false}
                selected={_format.getShortVNDate(value?.examinationDate) || ""}
              />
              <Select
                nav={next >= 4 ? navTimePicker : undefined}
                placeholder="CHỌN GIỜ KHÁM"
                next={next >= 4 ? true : false}
                selected={value?.examinationScheduleDetailName || ""}
              />
              {status === 1 &&
                (value.isBHYTService === undefined ||
                  value.isBHYTService === true) && (
                  <View style={styles.chkbox}>
                    <Text style={styles.chkboxlabel}>BẢO HIỂM Y TẾ</Text>
                    <View style={styles.flex}>
                      <TouchableWithoutFeedback
                        onPress={
                          next > 4 ? () => modalBHYT.current?.open() : undefined
                        }
                      >
                        <View style={styles.flex}>
                          <Icon
                            type="Feather"
                            name={
                              next > 4 && (value?.isBHYT as number) < 2
                                ? "check-circle"
                                : "circle"
                            }
                            style={[
                              styles.chkboxvalue,
                              next > 4 &&
                                (value?.isBHYT as number) < 2 && {
                                  color: orangeColor,
                                },
                            ]}
                          />
                          <Text
                            style={[
                              styles.chkboxlabel,
                              { fontFamily: "SFProDisplay-Semibold" },
                              next > 4 &&
                                (value?.isBHYT as number) < 2 && {
                                  color: orangeColor,
                                },
                            ]}
                          >
                            Có
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback
                        onPress={next > 4 ? () => toggleBHYT(2) : undefined}
                      >
                        <View style={styles.flex}>
                          <Icon
                            type="Feather"
                            name={
                              next > 4 && (value?.isBHYT as number) >= 2
                                ? "check-circle"
                                : "circle"
                            }
                            style={[
                              styles.chkboxvalue,
                              next > 4 &&
                                (value?.isBHYT as number) >= 2 && {
                                  color: orangeColor,
                                },
                            ]}
                          />
                          <Text
                            style={[
                              styles.chkboxlabel,
                              { fontFamily: "SFProDisplay-Semibold" },
                              next > 4 &&
                                (value?.isBHYT as number) >= 2 && {
                                  color: orangeColor,
                                },
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
                    next > 4 && { backgroundColor: blueColor },
                  ]}
                >
                  <Text style={styles.btntext}>TIẾP THEO</Text>
                </View>
              </TouchableWithoutFeedback>
            </Form>
          </Content>
          <ModalCenter ref={modalService} style={{ borderRadius: 4 }}>
            <>
              {services.map((i) => {
                if (i.Id !== 7) {
                  return (
                    <TouchableWithoutFeedback
                      key={i.Id}
                      onPress={() =>
                        handleModal(i.Id, i.Name, i.IsBHYT, "service")
                      }
                    >
                      <View style={styles.service}>
                        <Text
                          style={[
                            styles.servicename,
                            value?.serviceTypeId === i.Id && {
                              color: blueColor,
                            },
                          ]}
                        >
                          {i.Name}
                        </Text>
                        {value?.serviceTypeId === i.Id && (
                          <Icon
                            type="Feather"
                            name="check-circle"
                            style={styles.serviceicon}
                          />
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  );
                }
              })}
            </>
          </ModalCenter>
          <ModalCenter ref={modalSpecial} style={{ borderRadius: 4 }}>
            <>
              {specialistType.length > 0 &&
                specialistType.map((i) => (
                  <TouchableWithoutFeedback
                    key={i.Id}
                    onPress={() => handleSpecial(i.Id, i.Name)}
                  >
                    <View style={styles.service}>
                      <Text
                        style={[
                          styles.servicename,
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
                          style={styles.serviceicon}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              {!specialistType.length && (
                <Text style={[styles.service, styles.servicename]}>
                  Hiện tại chưa có bất kỳ khoa nào
                </Text>
              )}
            </>
          </ModalCenter>
          <ModalCenter ref={modalVaccine} style={{ borderRadius: 4 }}>
            <>
              {vaccines.length > 0 &&
                vaccines.map((i) => (
                  <TouchableWithoutFeedback
                    key={i.Id}
                    onPress={() =>
                      handleModal(i.Id, i.Name, undefined, "vaccine")
                    }
                  >
                    <View style={styles.service}>
                      <Text
                        style={[
                          styles.servicename,
                          value?.vaccineTypeId === i.Id && {
                            color: blueColor,
                          },
                        ]}
                      >
                        {i.Name}
                      </Text>
                      {value?.vaccineTypeId === i.Id && (
                        <Icon
                          type="Feather"
                          name="check-circle"
                          style={styles.serviceicon}
                        />
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              {!vaccines.length && (
                <View style={styles.service}>
                  <Text style={styles.servicename}>
                    Hiện tại chưa có vaccine nào ở bệnh viện này
                  </Text>
                </View>
              )}
            </>
          </ModalCenter>
          <ModalBottom
            heading="Kiểm tra bảo hiểm y tế"
            ref={modalBHYT}
            panGestureEnabled={false}
            closeOnOverlayTap={false}
          >
            <>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(0, undefined, true)}
              >
                Có giấy chuyển BHYT đúng tuyến {value.hospitalName}
              </Text>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(1, undefined, true)}
              >
                Tái khám theo hẹn trên toa thuốc BHYT của {value.hospitalName}
              </Text>
              <Text
                style={styles.bhyt}
                onPress={() => toggleBHYT(2, undefined, true)}
              >
                Không phải 2 trường hợp trên
              </Text>
            </>
          </ModalBottom>
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  loading: {
    ...(StyleSheet.absoluteFill as {}),
    backgroundColor: "#ffffff3a",
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
  note: {
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Regular",
  },
  chkboxmain: {
    paddingLeft: 0,
    paddingBottom: 0,
    left: 0,
    marginRight: 4,
    borderRadius: 4,
  },
  chkboxtext: {
    color: mainColorText,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    marginRight: 16,
  },
  chkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    backgroundColor: placeholderColor,
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
  service: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  servicename: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  serviceicon: {
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
});

export default NormalScheduleScreen;
