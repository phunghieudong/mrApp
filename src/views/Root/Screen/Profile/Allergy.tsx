import React, { FC, useEffect, useState } from "react";
import { View, Text, Container, Icon, Toast } from "native-base";
import { Empty, HeaderRoot, LazyLoading, ModalLoading } from "@/components";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import { AllergyProps } from "@/navigation/types/profile";
import { editAllergy, getAllergyNote, removeAllergys } from "@/api/allergy";
import { AllergyNoteData } from "@/types/Allergy";
import { NoteItem } from "../../Block/Allergy";

const { blueColor, padding, orangeColor, orangeColorLight } = settings.styles;

type IHeader = {
  onPress: () => void;
};

const HeaderComponent = ({ onPress }: IHeader) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.btn}>
        <Icon type="EvilIcons" name="plus" style={styles.btnicon} />
        <Text style={styles.btntext}>Thêm mới</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const AllergyScreen: FC<AllergyProps> = ({ navigation, route: { params } }) => {
  const { refetch, ...newParams } = params;

  // lấy danh sách dị ứng / phân trang
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AllergyNoteData[]>([]);
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState({ current: 1, next: true });

  useEffect(() => {
    (async () => {
      try {
        const { current, next } = page;
        if (next) {
          setLoading(true);
          const params = {
            pageIndex: current,
            pageSize: 10,
          };
          const res = await getAllergyNote(params);
          setData([...data, ...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
        }
        if (!ready) setReady(true);
      } catch (error) {
        throw new Error("FETCH 10 ALLERGIES LIST IS FAILED !");
      } finally {
        setLoading(false);
      }
    })();
  }, [page.current]);

  useEffect(() => {
    (async () => {
      if (typeof refetch === "number") {
        try {
          setLoading(true);
          const params = {
            pageIndex: 1,
            pageSize: 1,
          };
          const res = await getAllergyNote(params);
          const len = data.length;
          if (len % 10 === 0) {
            setData([...res.Data.Items, ...data.slice(0, len - 1)]);
            setPage({ ...page, next: true });
          } else {
            setData([...res.Data.Items, ...data]);
          }
        } catch (error) {
          throw new Error("FETCH A ALLERGY LIST IS FAILED !");
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [refetch]);

  // xóa dị ứng
  const [items, setItems] = useState({});
  const [remove, setRemove] = useState(false);

  const handleRemove = (id?: number) => {
    if (id) {
      Promise.all([
        Promise.resolve(setRemove(true)),
        Promise.resolve(setItems({ ...items, [id]: true })),
      ]);
    } else {
      Promise.all([
        Promise.resolve(setRemove(false)),
        Promise.resolve(setItems({})),
      ]);
    }
  };

  const handleItems = (id: number, status: "add" | "remove") => {
    if (status === "add") {
      setItems({ ...items, [id]: true });
    } else {
      delete items[id];
      setItems({ ...items });
    }
  };

  const removeItems = async () => {
    try {
      setLoading(true);
      const newItems = Object.keys(items);
      if (newItems.length > 0) {
        await removeAllergys([...newItems.map((i) => parseInt(i))]);
        let newData = data;
        newItems.forEach(
          (i) => (newData = newData.filter((x) => x.Id !== parseInt(i)))
        );
        Promise.all([
          Promise.resolve(setData([...newData])),
          Promise.resolve(setItems({})),
          Promise.resolve(setRemove(false)),
        ]);
        Toast.show({ text: "Xoá tiền sử thành công" });
      } else {
        Toast.show({ text: "Bạn chưa chọn tiền sử để xóa" });
      }
    } catch (error) {
      Toast.show({ text: "Xóa tiền sử thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const editItem = async (params: {
    id: number;
    description: string;
    allergyTypeId: number;
    allergyTypeName: string;
  }) => {
    try {
      setLoading(true);
      await editAllergy(params.id, params);
      Toast.show({ text: "Sửa dị ứng thành công" });
    } catch (error) {
      Toast.show({ text: "Sửa dị ứng thất bại" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderRoot title="DỊ ỨNG" previous={() => navigation.goBack()} />
      <View style={styles.body}>
        {!ready && <LazyLoading />}
        {ready && !data.length && (
          <>
            <HeaderComponent
              onPress={() =>
                navigation.navigate("AddAllergy", { refetch: 0, status: 0 })
              }
            />
            <Empty text="Không tìm thấy bất kỳ dị ứng nào" />
          </>
        )}
        {ready && data.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <HeaderComponent
                onPress={() =>
                  navigation.navigate("AddAllergy", {
                    refetch: refetch ?? 0,
                    status: 0,
                  })
                }
              />
            }
            data={data}
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.Id.toString()}
            renderItem={({ item, index }) => (
              <NoteItem
                {...newParams}
                first={index === 0}
                item={item}
                checked={items[item.Id]}
                select={handleItems}
                remove={remove}
                removeMethod={handleRemove}
                editMethod={loading ? undefined : editItem}
              />
            )}
          />
        )}
      </View>
      {remove && (
        <View>
          <Text
            style={styles.methodtext}
            onPress={loading ? undefined : removeItems}
          >
            Xóa dị ứng
          </Text>
          <Text
            style={[styles.methodtext, { backgroundColor: blueColor }]}
            onPress={loading ? undefined : () => handleRemove()}
          >
            Hủy
          </Text>
        </View>
      )}
      <ModalLoading visible={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: padding,
  },
  btn: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: orangeColorLight,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    borderRadius: 100,
    marginTop: 16,
  },
  btnicon: {
    marginRight: 4,
    color: orangeColor,
    fontSize: 20,
  },
  btntext: {
    fontSize: 15,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    color: orangeColor,
  },
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
});

export default AllergyScreen;
