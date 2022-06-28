import {
  editMedicalRecordHistory,
  getMedicalRecordHistory,
  removeMedicalRecordHisory,
} from "@/api/MedicalRecordHistory";
import { LazyLoading, ModalLoading } from "@/components";
import { settings } from "@/config";
import { useAppSelector } from "@/store/hook";
import { MedicalRecordStoryData } from "@/types/MedicalRecordStory";
import { UserData } from "@/types/User";
import { useNavigation } from "@react-navigation/core";
import { Content, Toast } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { NoteBlock, SurveyNoteBlock } from ".";
import { BaseHeading, BaseSeeAll } from "../Base";

const { padding, dangerColor, blueColor, mainColorText, borderColor } =
  settings.styles;

type IProps = {
  refetchMRD?: number;
  refetchSMRD?: number;
  id?: number;
  surgeryPart?: string;
  surgeryYear?: string;
  surgeryPlace?: string;
  surgeryResult?: string;
  sympToms?: string;
};

const NoteList: FC<IProps> = ({ refetchMRD, refetchSMRD, ...info }) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // chuyển trang
  const navigation = useNavigation();

  // lấy dữ liệu tiền sử, tiểu sử chung
  const [pageMRD, setPageMRD] = useState({ page: 1, next: true });
  const [medicalRecordData, setMedicalRecordData] = useState<
    MedicalRecordStoryData[]
  >([]);
  const [pageSMRD, setPageSMRD] = useState({ page: 1, next: true });
  const [surgeryMedicalRecordData, setSurgeryMedicalRecordData] = useState<
    MedicalRecordStoryData[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(0);

  const fetchMedicalRecordData = async (
    pageIndex?: number,
    pageSize?: number
  ) => {
    try {
      setLoading(true);
      const params = {
        userId: user.UserId,
        type: 0,
        medicalRecordId: user.Id,
        pageIndex: pageIndex || pageMRD.page,
        pageSize: pageSize || 10,
      };
      const res = await getMedicalRecordHistory(params);
      if (!pageIndex && !pageSize) {
        setMedicalRecordData([...medicalRecordData, ...res.Data.Items]);
        if (pageMRD.page >= res.Data.TotalPage) {
          setPageMRD({ ...pageMRD, next: false });
        }
      } else {
        const len = medicalRecordData.length;
        if (len % 10 === 0) {
          setMedicalRecordData([
            ...res.Data.Items,
            ...medicalRecordData.slice(0, len - 1),
          ]);
          setPageMRD({ ...pageMRD, next: true });
        } else {
          setMedicalRecordData([...res.Data.Items, ...medicalRecordData]);
        }
      }
      setReady((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      throw new Error("FETCH MEDICAL RECORD HISTORY IS FAILED !!!");
    }
  };

  const fetchSurveyMedicalRecordData = async (
    pageIndex?: number,
    pageSize?: number
  ) => {
    try {
      setLoading(true);
      const params = {
        userId: user.UserId,
        type: 1,
        medicalRecordId: user.Id,
        pageIndex: pageIndex || pageMRD.page,
        pageSize: pageSize || 10,
      };
      const res = await getMedicalRecordHistory(params);
      if (!pageIndex && !pageSize) {
        setSurgeryMedicalRecordData([
          ...surgeryMedicalRecordData,
          ...res.Data.Items,
        ]);
        if (pageSMRD.page >= res.Data.TotalPage) {
          setPageSMRD({ ...pageSMRD, next: false });
        }
      } else {
        const len = surgeryMedicalRecordData.length;
        if (len % 10 === 0) {
          setSurgeryMedicalRecordData([
            ...res.Data.Items,
            ...surgeryMedicalRecordData.slice(0, len - 1),
          ]);
          setPageSMRD({ ...pageSMRD, next: true });
        } else {
          setSurgeryMedicalRecordData([
            ...res.Data.Items,
            ...surgeryMedicalRecordData,
          ]);
        }
      }
      setLoading(false);
      setReady((prev) => prev + 1);
    } catch (error) {
      throw new Error("FETCH MEDICAL RECORD HISTORY IS FAILED !!!");
    }
  };

  useEffect(() => {
    Promise.all([fetchMedicalRecordData(), fetchSurveyMedicalRecordData()]);
  }, []);

  useEffect(() => {
    (async () => {
      if (typeof refetchMRD === "number") {
        fetchMedicalRecordData(1, 1);
      }
    })();
  }, [refetchMRD]);

  useEffect(() => {
    (async () => {
      if (pageMRD.page > 1 && pageMRD.next) {
        fetchMedicalRecordData();
      }
    })();
  }, [pageMRD.page]);

  useEffect(() => {
    (async () => {
      if (typeof refetchSMRD === "number") {
        fetchSurveyMedicalRecordData(1, 1);
      }
    })();
  }, [refetchSMRD]);

  useEffect(() => {
    (async () => {
      if (pageSMRD.page > 1 && pageSMRD.next) {
        fetchMedicalRecordData();
      }
    })();
  }, [pageSMRD.page]);

  // chức năng xóa
  const [remove, setRemove] = useState(false);
  const [item, setItem] = useState({});

  const handleItem = (id: number, status: "add" | "remove") => {
    if (status === "add") {
      setItem({ ...item, [id]: true });
    } else {
      delete item[id];
      setItem({ ...item });
    }
  };

  const editNote = async (id: number, description: string) => {
    try {
      setLoading(true);
      await editMedicalRecordHistory({
        id,
        description,
        type: 0,
      });
      Toast.show({ text: "Sửa tiền sử thành công" });
    } catch (error) {
      Toast.show({ text: "Sửa tiền sử thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const confirmRemoveNote = async () => {
    try {
      setLoading(true);
      const itemArray = Object.keys(item);
      if (itemArray.length > 0) {
        await removeMedicalRecordHisory(itemArray.map((i) => parseInt(i)));
        let newMRD = medicalRecordData;
        let newSMRD = surgeryMedicalRecordData;
        itemArray.forEach(async (item) => {
          await Promise.all([
            Promise.resolve(
              (newMRD = newMRD.filter((x) => x.Id !== parseInt(item)))
            ),
            Promise.resolve(
              (newSMRD = newSMRD.filter((x) => x.Id !== parseInt(item)))
            ),
          ]);
        });
        await Promise.all([
          Promise.resolve(setMedicalRecordData([...newMRD])),
          Promise.resolve(setSurgeryMedicalRecordData([...newSMRD])),
          Promise.resolve(setItem({})),
          Promise.resolve(setRemove(false)),
        ]);
      } else {
        Toast.show({ text: "Bạn chưa chọn tiền sử để xóa" });
      }
    } catch (error) {
      Toast.show({ text: "Xóa tiền sử thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const closeRemoveNote = async () => {
    Promise.all([
      Promise.resolve(setRemove(false)),
      Promise.resolve(setItem({})),
    ]);
  };

  return (
    <>
      {ready < 2 && <LazyLoading />}
      {ready >= 2 && (
        <>
          <Content contentContainerStyle={styles.block}>
            <BaseHeading
              text="Tiền sử bệnh"
              btn={{
                btnText: "Thêm mới",
                onPress: () =>
                  navigation.navigate("AddMedicalStory", {
                    refetch: refetchMRD ? refetchMRD : 0,
                  }),
              }}
            />
            <View style={{ height: 10 }} />
            <View style={styles.list}>
              {medicalRecordData.map((i) => (
                <NoteBlock
                  key={i.Id}
                  id={i.Id}
                  text={i.Description}
                  remove={setRemove}
                  handleItem={handleItem}
                  removeStatus={remove}
                  checked={item[i.Id]}
                  editNote={loading ? undefined : editNote}
                />
              ))}
              {pageMRD.next && (
                <BaseSeeAll
                  text="Xem thêm"
                  onPress={
                    loading
                      ? undefined
                      : () => setPageMRD({ ...pageMRD, page: pageMRD.page + 1 })
                  }
                />
              )}
            </View>
            <View style={{ height: 20 }} />
            <BaseHeading
              text="Tiền sử phẩu thuật"
              btn={{
                btnText: "Thêm mới",
                onPress: () =>
                  navigation.navigate("AddSurgeryMedicalStory", {
                    type: 0,
                    number: 0,
                  }),
              }}
            />
            <View style={{ height: 10 }} />
            {surgeryMedicalRecordData.map((i) => (
              <SurveyNoteBlock
                key={i.Id}
                item={i}
                handleItem={handleItem}
                remove={setRemove}
                removeStatus={remove}
                checked={item[i.Id]}
                {...info}
              />
            ))}
            {pageSMRD.next && (
              <BaseSeeAll
                text="Xem thêm"
                onPress={
                  loading
                    ? undefined
                    : () => setPageMRD({ ...pageSMRD, page: pageSMRD.page + 1 })
                }
              />
            )}
            <View style={{ height: 20 }} />
          </Content>
          {remove && (
            <View>
              <Text
                style={styles.methodtext}
                onPress={loading ? undefined : confirmRemoveNote}
              >
                Xóa tiền sử bệnh / phẫu thuật
              </Text>
              <Text
                onPress={loading ? undefined : closeRemoveNote}
                style={[styles.methodtext, { backgroundColor: blueColor }]}
              >
                Hủy
              </Text>
            </View>
          )}
          <ModalLoading visible={loading} />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  list: {
    flexGrow: 0,
    flexShrink: 0,
  },
  method: {},
  methodtext: {
    letterSpacing: 1,
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: "#ff7875",
    color: "#fff",
  },
  modal: {
    padding: 30,
  },
  modalname: {
    textAlign: "center",
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 1.25,
    color: mainColorText,
  },
  modalinput: {
    borderBottomWidth: 1,
    borderColor,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    fontFamily: "SFProDisplay-Regular",
    fontSize: 18,
    letterSpacing: 1.25,
    textAlign: "center",
    color: mainColorText,
  },
  modalcreate: {
    backgroundColor: blueColor,
    alignSelf: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  modalcreatetext: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Bold",
  },
  modalerror: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    color: dangerColor,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default NoteList;
