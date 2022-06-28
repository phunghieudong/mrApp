import { getDoctors } from "@/api/ExaminationForm";
import { HeaderRoot, Empty, ModalLoading, LazyLoading } from "@/components";
import { settings } from "@/config";
import { DoctorData } from "@/types/ExaminationForm";
import { Container, Icon, Input, Text, View } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  InteractionManager,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { DoctorPickerProps } from "@/navigation/types/Home";
import { getDegree } from "@/api/Catalogue";
import { DegreeData } from "@/types/base";
import { Modalize } from "react-native-modalize";
import { _format } from "@/utils";

const {
  mainColor,
  mainColorText,
  borderColor,
  padding,
  blueColor,
  orangeColor,
} = settings.styles;

const { genders } = settings.defaultData;

type MenuData = {
  value?: number;
  menu: string;
  placeholder: string;
};

type MenuProps = {
  gender: MenuData;
  study: MenuData;
};

const DoctorPickerScreen: FC<DoctorPickerProps> = ({
  navigation,
  route: {
    params: { data, hospitalId, doctorId, specialistTypeId },
  },
}) => {
  const nav = (doctorId: number, doctorName: string) => {
    navigation.navigate("SpecialSchedule", {
      doctorId,
      doctorName,
    });
  };

  // menu to filter
  const [menu, setMenu] = useState<MenuProps>({
    gender: {
      value: undefined,
      menu: "gender",
      placeholder: "Giới tính",
    },
    study: {
      value: undefined,
      menu: "study",
      placeholder: "Học vị",
    },
  });

  // modal
  const [modal, setModal] = useState({
    gender: false,
    study: false,
  });

  const handleModal = (which: "gender" | "special" | "study") => {
    setModal({ ...modal, [which]: !modal[which] });
    const item = menu[which];
    setMenu({ ...menu, [which]: item });
  };

  // fitler doctor name
  const [name, setName] = useState({
    placeholder: "",
    value: "",
  });

  // degree data
  const [degree, setDegree] = useState<Array<DegreeData>>([]);

  useEffect(() => {
    (async () => {
      if (hospitalId) {
        const res = await getDegree(hospitalId);
        setDegree([...res.Data]);
      }
    })();
  }, []);

  // doctors data
  const [doctors, setDoctors] = useState<Array<DoctorData>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    next: true,
  });

  useEffect(() => {
    (async () => {
      if (hospitalId && page.next) {
        if (page.current <= 1) {
          setDoctors([...data]);
        } else {
          setLoading(true);
          const res = await getDoctors(
            page.current,
            10,
            hospitalId,
            specialistTypeId,
            menu.gender.value,
            menu.study.value,
            name.value
          );
          if (page.current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          if (page.current === 1) {
            setDoctors([...res.Data.Items]);
          } else {
            setDoctors([...doctors, ...res.Data.Items]);
          }
          setLoading(false);
        }
      }
    })();
  }, [page, menu.gender.value, menu.study.value]);

  // filter doctor combobox
  const filterDoctor = (
    which: "gender" | "study" | "special",
    placeholder: string,
    value?: number
  ) => {
    let label = "Giới tính: ";
    if (which === "study") {
      label = "Học vị: ";
    } else if (which === "special") {
      label = "Chuyên khoa: ";
    }
    const item = menu[which];
    item.placeholder = label + placeholder;
    item.value = value;
    setMenu({ ...menu, [which]: item });
    setModal({ ...modal, [which]: !modal[which] });
    setPage({ ...page, current: 1, next: true });
  };

  // interaction
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      setReady(true);
    });
  }, []);

  return (
    <Container style={styles.container}>
      <HeaderRoot title="CHỌN BÁC SĨ" previous={() => navigation.goBack()} />
      <View style={styles.filter}>
        <View style={styles.input}>
          <Input
            style={styles.inputmain}
            placeholder="Nhập tên bác sĩ"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            onChangeText={(value) => setName({ ...name, placeholder: value })}
            onSubmitEditing={() =>
              setName({ ...name, value: name.placeholder })
            }
          />
          <TouchableWithoutFeedback
            onPress={() => setName({ ...name, value: name.placeholder })}
          >
            <View style={styles.search}>
              <Icon
                type="Ionicons"
                name="search-outline"
                style={styles.searchicon}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Object.keys(menu)}
          keyExtractor={(item) => menu[item].menu}
          renderItem={({ item, index }) => {
            let firstOrLast = {};
            if (index === 0) firstOrLast = { marginLeft: padding };
            else if (index === Object.keys(menu).length - 1)
              firstOrLast = { marginRight: padding };
            return (
              <TouchableWithoutFeedback
                onPress={() => handleModal(menu[item].menu)}
              >
                <View style={[styles.menu, firstOrLast]}>
                  <Text style={styles.menutext}>{menu[item].placeholder}</Text>
                  <View style={styles.menucontrol}>
                    <Icon
                      type="Ionicons"
                      name="caret-up-sharp"
                      style={[styles.menuicon, { top: 2.2 }]}
                    />
                    <Icon
                      type="Ionicons"
                      name="caret-down-sharp"
                      style={[styles.menuicon, { bottom: 2.2 }]}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {modal.gender && (
          <View style={styles.modal}>
            <FlatList
              style={styles.modalcontainer}
              ListHeaderComponent={
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => filterDoctor("gender", "Tất cả")}
                >
                  <Text style={styles.modalitem}>Tất cả</Text>
                  <View style={styles.modalborder} />
                </TouchableOpacity>
              }
              data={genders}
              keyExtractor={(item) => item.Name}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => filterDoctor("gender", item.Name, item.Id)}
                >
                  <Text style={styles.modalitem}>{item.Name}</Text>
                  <View style={styles.modalborder} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => handleModal("gender")}
              style={styles.background}
            />
          </View>
        )}
        {modal.study && (
          <View style={styles.modal}>
            <FlatList
              style={styles.modalcontainer}
              data={degree}
              ListHeaderComponent={
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => filterDoctor("study", "Tất cả")}
                >
                  <Text style={styles.modalitem}>Tất cả</Text>
                  <View style={styles.modalborder} />
                </TouchableOpacity>
              }
              keyExtractor={(item) => item.Id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => filterDoctor("study", item.Name, item.Id)}
                >
                  <Text style={styles.modalitem}>{item.Name}</Text>
                  <View style={styles.modalborder} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => handleModal("study")}
              activeOpacity={1}
              style={styles.background}
            />
          </View>
        )}
        {!ready && <LazyLoading />}
        {ready && doctors.length > 0 && (
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.Id.toString()}
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                key={item.Id}
                onPress={() => nav(item.DoctorId, item.DoctorName)}
              >
                <View style={styles.box}>
                  <View style={styles.heading}>
                    <View style={styles.left}>
                      <Text style={styles.word}>BS</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.headinglabel}>Bác Sĩ</Text>
                      <Text style={styles.headingvalue}>{item.DoctorName}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Giới tính</Text>
                      <View style={styles.valuebox}>
                        <Text style={styles.value}>
                          {item.DoctorGenderName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Chuyên khoa</Text>
                      <View style={styles.valuebox}>
                        <Text style={styles.value}>
                          {item.SpecialistTypeName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.label}>Lịch khám</Text>
                      <View style={styles.valuebox}>
                        {item.DayOfWeekDisplays.map((subItem, index) => (
                          <Text
                            key={index.toString()}
                            style={[styles.value, { color: orangeColor }]}
                          >
                            {_format.getShortSession(subItem.SessionTypeName) +
                              ": " +
                              subItem.DayOfWeekName}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={styles.click}>
                    {item.DoctorId !== doctorId && (
                      <View style={styles.clickcircle}>
                        <Icon
                          type="MaterialCommunityIcons"
                          name="plus"
                          style={styles.clickplus}
                        />
                      </View>
                    )}
                    {item.DoctorId === doctorId && (
                      <Icon
                        type="Feather"
                        name="check-circle"
                        style={styles.clickchecked}
                      />
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        )}
        {ready && !doctors.length && (
          <Empty text="Không tìm thấy bất kỳ bác sĩ nào" />
        )}
      </View>
      <ModalLoading visible={loading} />
    </Container>
  );
};

const heightInput = 40;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(216, 227, 232)",
  },
  body: {
    flexGrow: 1,
  },
  filter: {
    backgroundColor: mainColor,
  },
  input: {
    marginHorizontal: padding,
    height: heightInput,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  inputmain: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, .1)",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 16,
    color: "#fff",
    fontFamily: "SFProDisplay-Regular",
  },
  search: {
    width: heightInput + 20,
    height: heightInput,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  searchicon: {
    fontSize: 20,
    color: "#fff",
  },
  menu: {
    minWidth: 104.5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: "rgba(255, 255, 255, .1)",
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menutext: {
    fontSize: 16,
    lineHeight: 20,
    color: "#fff",
    fontFamily: "SFProDisplay-Medium",
  },
  menucontrol: {
    marginLeft: 4,
  },
  menuicon: {
    fontSize: 10,
    color: "#fff",
    marginLeft: 4,
    alignSelf: "flex-end",
  },
  modal: {
    ...(StyleSheet.absoluteFill as {}),
  },
  modalload: {
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: "auto",
    marginRight: "auto",
  },
  modalcontainer: {
    flexGrow: 0,
    flexShrink: 0,
    zIndex: 1,
  },
  modalitem: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalborder: {
    ...(StyleSheet.absoluteFill as {}),
    top: undefined,
    height: 1,
    backgroundColor: borderColor,
  },
  background: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  box: {
    backgroundColor: "#fff",
    marginHorizontal: padding,
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
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
    // flex: 1,
  },
  heading: {
    flexDirection: "row",
  },
  headinglabel: {
    fontSize: 16,
    lineHeight: 20,
    color: blueColor,
    fontFamily: "SFProDisplay-Regular",
  },
  headingvalue: {
    fontSize: 20,
    lineHeight: 24,
    color: mainColorText,
    fontFamily: "SFProDisplay-Semibold",
  },
  detail: {
    marginTop: 6,
    flexDirection: "row",
  },
  label: {
    flex: 0.4,
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Regular",
    top: 1,
  },
  valuebox: {
    flex: 0.6,
  },
  value: {
    fontSize: 16,
    lineHeight: 20,
    color: mainColorText,
    fontFamily: "SFProDisplay-Regular",
  },
  click: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  clickcircle: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blueColor,
    elevation: 4,
    borderRadius: 100,
  },
  clickplus: {
    fontSize: 20,
    color: "#fff",
  },
  clickchecked: {
    fontSize: 34,
    color: blueColor,
  },
});

export default DoctorPickerScreen;
