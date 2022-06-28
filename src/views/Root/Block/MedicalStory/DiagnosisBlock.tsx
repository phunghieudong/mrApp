import ModalBottom from "@/components/ModalBottom";
import { settings } from "@/config";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { Icon, Input, Toast } from "native-base";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableWithoutFeedback,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Modalize } from "react-native-modalize";
import { useAppSelector } from "@/store/hook";
import {
  getMedicalRecordDetail,
  updateNote,
  uploadMedicalRecordDetailMultipleFiles,
} from "@/api/MedicalRecordDetail";
import { UserData, UserFile } from "@/types/User";
import {
  LazyLoading,
  ModalCenter,
  ModalImage,
  ModalLoading,
} from "@/components";
import { useNavigation } from "@react-navigation/core";

const { hostURL } = settings;
const { blueColor, padding, orangeColor, mainColor, mainColorLight } =
  settings.styles;
const { diagnosis } = settings.defaultData;
const { width: dW } = Dimensions.get("screen");
const imageSize = dW * 0.25 - (padding * 2) / 4 - 6;

const menuRenderItem = (
  item: { shortName: string; name: string },
  index: number,
  currentSlide: number,
  clickHeading: (page: number) => void
) => {
  let firstOrLast = { marginRight: padding };
  let active = {};
  if (index === 0) firstOrLast["marginLeft"] = padding;
  if (index === currentSlide)
    active = { color: blueColor, textDecorationLine: "underline" };

  return (
    <Text
      onPress={() => clickHeading(index)}
      style={[styles.menutext, firstOrLast, active]}
    >
      {item.shortName}
    </Text>
  );
};

const renderItem = (
  item: { shortName: string; name: string },
  index: number,
  imagePillList: any[],
  imageResultList: any[],
  imageProfileList: any[],
  handleKindOfImage: (number: number) => void
) => {
  let firstOrLast = {};
  let newArray: any[] = [];
  if (index <= 0) {
    firstOrLast = { marginLeft: padding };
    newArray = [...imagePillList];
  } else if (index === 1) {
    newArray = [...imageResultList];
  } else {
    newArray = [...imageProfileList];
  }

  if (!newArray.length) {
    return (
      <View style={[styles.listcontainer, firstOrLast]}>
        <View style={styles.list}>
          <View
            style={{
              width: "100%",
              height: imageSize * 2 + 12,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Text
              style={{
                color: "#8c8c8c",
                fontSize: 13,
                fontFamily: "SFProDisplay-Regular",
                letterSpacing: 1.25,
              }}
            >
              Không có hình ảnh {item.name.toLowerCase()} nào
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.listcontainer, firstOrLast]}>
      <View style={styles.list}>
        {newArray.map((i, pos) => (
          <TouchableWithoutFeedback
            key={pos}
            onPress={() => handleKindOfImage(index)}
          >
            <Image
              source={{
                uri: i?.FileUrl ? hostURL + "/" + i?.FileUrl : i.uri,
              }}
              style={styles.img}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

type IProps = {
  id: number;
  status?: number;
};

const DiagnosisBlock: FC<IProps> = ({ id, status }) => {
  const navigation = useNavigation();

  const user = useAppSelector((state) => state.user.current) as UserData;

  // fetch dữ liệu 1 lần
  const first = useRef(true);
  const [data, setData] = useState<DiagnosticData>();

  const fetchData = async () => {
    try {
      const res = await getMedicalRecordDetail(id);
      setData({ ...res.Data });
    } catch (error) {
      throw new Error("FETCH RECORD");
    }
  };

  useEffect(() => {
    if (first.current && status === 1) {
      fetchData().then(() => (first.current = false));
    }
  }, [status]);

  // handle scroll images slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<any>();

  const clickHeading = (page: number) => {
    slideRef.current?.scrollToIndex({ animated: true, index: "" + page });
  };

  const dragSlide = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentPage = Math.round(
        parseFloat((e.nativeEvent.contentOffset.x / dW).toString())
      );
      setCurrentSlide(currentPage);
    },
    []
  );

  // choose image from device
  const [imagePillList, setImagePillList] = useState<Array<any>>([]);
  const [imageResultList, setImageResultList] = useState<Array<any>>([]);
  const [imageProfileList, setImageProfileList] = useState<Array<any>>([]);
  const type = useRef<number>(1);

  const removeImage = (index: number, type: 1 | 2 | 3) => {
    if (type === 1) {
      setImagePillList([
        ...imagePillList.slice(0, index),
        ...imagePillList.slice(index + 1),
      ]);
    } else if (type === 2) {
      setImageResultList([
        ...imageResultList.slice(0, index),
        ...imageResultList.slice(index + 1),
      ]);
    } else {
      setImageProfileList([
        ...imageProfileList.slice(0, index),
        ...imageProfileList.slice(index + 1),
      ]);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });

      if (!result.cancelled) {
        const { current } = type;
        if (current === 1) {
          setImagePillList([
            ...imagePillList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 2,
            },
          ]);
        } else if (current === 2) {
          setImageResultList([
            ...imageResultList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 3,
            },
          ]);
        } else {
          setImageProfileList([
            ...imageProfileList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 4,
            },
          ]);
        }
      }
    }
  };

  const takeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });

      if (!result.cancelled) {
        const { current } = type;
        if (current === 1) {
          setImagePillList([
            ...imagePillList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 2,
            },
          ]);
        } else if (current === 2) {
          setImageResultList([
            ...imageResultList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 3,
            },
          ]);
        } else {
          setImageProfileList([
            ...imageProfileList,
            {
              ...result,
              url: result["uri"],
              folderId: current,
              medicalRecordId: id,
              medicalRecordDetailId: data?.Id,
              userId: user.UserId,
              fileType: 4,
            },
          ]);
        }
      }
    }
  };

  // modal bottom
  const chooseImages = useRef<Modalize>(null);
  const slideImages = useRef<Modalize>(null);
  const [kindOfImage, setKindOfImage] = useState(0);

  const handleImage = (number: number) => {
    setKindOfImage(number);
    slideImages.current?.open();
  };

  // ghi chú
  const [note, setNote] = useState("");

  // cập nhật ghi chú + hình ảnh
  const [loading, setLoading] = useState(false);
  const select = useRef<Modalize>(null);
  const handleSelect = (t: 1 | 2 | 3) => {
    type.current = t;
    select.current?.open();
  };

  const _onPress = async () => {
    const newData = [...imagePillList, ...imageProfileList, ...imageResultList];
    if (!note.length && !newData.length) return;
    try {
      setLoading(true);
      if (newData.length) {
        if (note.length) {
          await uploadMedicalRecordDetailMultipleFiles(id, newData);
          await updateNote(id, note);
        } else {
          await uploadMedicalRecordDetailMultipleFiles(id, newData);
        }
      } else {
        await updateNote(id, note);
      }
      await Promise.all([
        Promise.resolve(setImagePillList([])),
        Promise.resolve(setImageResultList([])),
        Promise.resolve(setImageProfileList([])),
        (() => fetchData())(),
      ]);
    } catch (error) {
      Toast.show({ text: "Thêm ảnh thất bại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[styles.block, (status === 0 || !status) && { display: "none" }]}
    >
      {!data?.Id && <LazyLoading />}
      {data?.Id && (
        <>
          <View style={styles.info}>
            <Text style={styles.label}>
              Mã bệnh viện:{" "}
              <Text style={styles.value}>BV-{data?.HospitalId}</Text>
            </Text>
            <Text style={styles.label}>
              Khoa: <Text style={styles.value}>{data?.SpecialistTypeName}</Text>
            </Text>
            <Text style={styles.label}>
              Huyết áp:{" "}
              <Text style={styles.value}>{data?.BloodPressure ?? "- -"}</Text>
            </Text>
            <Text style={styles.label}>
              Nhịp tim:{" "}
              <Text style={styles.value}>{data?.HeartBeat ?? "- -"}</Text>
            </Text>
            <Text style={styles.label}>
              Đường huyết:{" "}
              <Text style={styles.value}>{data?.BloodSugar ?? "- -"}</Text>
            </Text>
            <Text style={styles.label}>
              Bệnh:{" "}
              <Text style={styles.value}>
                {data?.DiagnoticSickName ?? "- - "}
                <Text
                  onPress={() =>
                    navigation.navigate("DiagnoticType", {
                      hospitalId: data?.HospitalId,
                    })
                  }
                  style={[styles.value, { color: blueColor }]}
                >
                  Xem chi tiết
                </Text>
              </Text>
            </Text>
            <Text style={styles.label}>
              Chuẩn đoán lâm sàng:{" "}
              <Text style={styles.value}>{data?.DoctorComment}</Text>
            </Text>
          </View>
          <View style={styles.file}>
            <FlatList
              data={diagnosis}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              keyExtractor={(item) => item.shortName}
              renderItem={({ item, index }) =>
                menuRenderItem(item, index, currentSlide, clickHeading)
              }
            />
            <FlatList
              data={diagnosis}
              ref={slideRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.shortName}
              renderItem={({ item, index }) =>
                renderItem(
                  item,
                  index,
                  [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 1
                    ) as UserFile[]),
                    ...imagePillList,
                  ],
                  [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 2
                    ) as UserFile[]),
                    ...imageResultList,
                  ],
                  [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 3
                    ) as UserFile[]),
                    ...imageProfileList,
                  ],
                  handleImage
                )
              }
              onScroll={(e) => dragSlide(e)}
            />
            <TouchableWithoutFeedback
              onPress={() => chooseImages.current?.open()}
            >
              <View style={styles.document}>
                <Icon
                  type="EvilIcons"
                  name="camera"
                  style={styles.documenticon}
                />
                <Text style={styles.documenttext}>TẢI ẢNH / LƯU HỒ SƠ</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Input
            multiline
            placeholder="GHI CHÚ"
            style={styles.note}
            textAlignVertical="top"
            onChangeText={(val) => setNote(val)}
          />
          {(imagePillList.length > 0 ||
            imageProfileList.length > 0 ||
            imageResultList.length > 0 ||
            note.length > 0) && (
            <TouchableWithoutFeedback onPress={loading ? undefined : _onPress}>
              <View style={styles.update}>
                <Text style={styles.updatetext}>CẬP NHẬT</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          <ModalBottom
            headingButton={
              !loading &&
              (imagePillList.length > 0 ||
                imageProfileList.length > 0 ||
                imageResultList.length > 0)
                ? { onPress: _onPress, text: "LƯU" }
                : undefined
            }
            heading="Thêm hình ảnh"
            ref={chooseImages}
          >
            <>
              {imagePillList.length > 0 && (
                <View>
                  <Text style={styles.title}>Ảnh toa thuốc</Text>
                  <FlatList
                    data={imagePillList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      let firstOrLast = {};
                      if (index === 0) firstOrLast = { marginLeft: 30 };
                      else if (index === imagePillList.length - 1)
                        firstOrLast = { marginRight: 30 };
                      return (
                        <View
                          style={[styles.imgbox, firstOrLast, { margin: 4 }]}
                        >
                          <TouchableWithoutFeedback
                            onPress={loading ? undefined : () => handleImage(0)}
                          >
                            <Image
                              source={{ uri: item?.uri }}
                              style={styles.img}
                            />
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            onPress={
                              loading ? undefined : () => removeImage(index, 1)
                            }
                          >
                            <Icon
                              type="AntDesign"
                              name="closecircle"
                              style={styles.remove}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {imageResultList.length > 0 && (
                <View>
                  <Text style={styles.title}>Ảnh kết quả xét nghiệm</Text>
                  <FlatList
                    data={imageResultList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => {
                      let firstOrLast = {};
                      if (index === 0) firstOrLast = { marginLeft: 30 };
                      else if (index === imageResultList.length - 1)
                        firstOrLast = { marginRight: 30 };
                      return (
                        <View
                          style={[styles.imgbox, firstOrLast, { margin: 4 }]}
                        >
                          <TouchableWithoutFeedback
                            onPress={loading ? undefined : () => handleImage(1)}
                          >
                            <Image
                              source={{ uri: item?.uri }}
                              style={styles.img}
                            />
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            onPress={
                              loading ? undefined : () => removeImage(index, 2)
                            }
                          >
                            <Icon
                              type="AntDesign"
                              name="closecircle"
                              style={styles.remove}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              <View
                style={{
                  paddingHorizontal: 30,
                  marginTop: 10,
                  marginBottom: 4,
                }}
              >
                <TouchableWithoutFeedback
                  onPress={loading ? undefined : () => handleSelect(1)}
                >
                  <View style={styles.add}>
                    <Text style={styles.addtext}>Thêm hình ảnh toa thuốc</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={loading ? undefined : () => handleSelect(2)}
                >
                  <View style={styles.add}>
                    <Text style={styles.addtext}>
                      Thêm hình ảnh kết quả xét nghiệm
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={loading ? undefined : () => handleSelect(3)}
                >
                  <View style={styles.add}>
                    <Text style={styles.addtext}>
                      Thêm hình ảnh hồ sơ bệnh án
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </>
          </ModalBottom>
          <ModalImage
            images={
              kindOfImage === 0
                ? [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 1
                    ) as UserFile[]),
                    ...imagePillList,
                  ]
                : kindOfImage === 1
                ? [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 2
                    ) as UserFile[]),
                    ...imageResultList,
                  ]
                : [
                    ...(data?.UserFiles.filter(
                      (x) => x.FolderId === 3
                    ) as UserFile[]),
                    ...imageProfileList,
                  ]
            }
            ref={slideImages}
          />
          <ModalCenter ref={select} style={{ borderRadius: 16 }}>
            <View style={styles.modal}>
              <TouchableWithoutFeedback onPress={pickImage}>
                <View style={styles.add}>
                  <Text style={styles.addtext}>Chụp hình ảnh</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={takeImage}>
                <View style={[styles.add, { marginBottom: 0 }]}>
                  <Text style={styles.addtext}>Chọn hình ảnh từ thiết bị</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ModalCenter>
          <ModalLoading visible={loading} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
  heading: {
    textTransform: "uppercase",
    backgroundColor: blueColor,
    paddingHorizontal: padding,
    paddingTop: 13,
    paddingBottom: 15,
    fontSize: 14,
    lineHeight: 30,
    fontFamily: "SFProDisplay-Bold",
    color: "#fff",
  },
  date: {
    fontFamily: "SFProDisplay-Regular",
  },
  info: {
    paddingHorizontal: padding,
    paddingTop: padding,
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    lineHeight: 30,
    marginVertical: 3,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
  },
  value: {
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 14,
    lineHeight: 22,
  },
  file: {
    marginTop: 6,
    marginBottom: 14,
  },
  menutext: {
    fontSize: 13,
    paddingVertical: 8,
    letterSpacing: 1.5,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: "SFProDisplay-Semibold",
  },
  listcontainer: {
    width: dW - padding * 2,
    marginRight: padding * 2,
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  lisempty: {},
  lisemptytext: {},
  listheading: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: orangeColor,
    fontFamily: "SFProDisplay-Semibold",
    marginBottom: 6,
  },
  title: {
    marginTop: 10,
    marginBottom: 4,
    marginHorizontal: 30,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "SFProDisplay-Regular",
  },
  imgbox: {
    height: 100,
    justifyContent: "center",
  },
  img: {
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    margin: 3,
  },
  remove: {
    position: "absolute",
    top: 0,
    right: -4,
    fontSize: 24,
    color: "#434343",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  document: {
    paddingHorizontal: padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    marginTop: 10,
  },
  documenticon: {
    color: orangeColor,
    marginRight: 4,
  },
  documenttext: {
    textAlign: "center",
    color: orangeColor,
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
  },
  note: {
    marginHorizontal: padding,
    backgroundColor: mainColorLight,
    height: 120,
    borderRadius: 12,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 15,
    color: mainColor,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
  },
  modal: {
    padding: 10,
  },
  add: {
    paddingTop: 15,
    paddingBottom: 17,
    backgroundColor: blueColor,
    paddingHorizontal: 12,
    borderRadius: 100,
    marginBottom: 6,
  },
  addtext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Semibold",
  },
  update: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "center",
    marginBottom: 15,
    paddingHorizontal: 57,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
  },
  updatetext: {
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
  },
});

export default DiagnosisBlock;
