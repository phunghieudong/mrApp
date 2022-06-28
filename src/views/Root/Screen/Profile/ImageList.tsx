import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Container, Toast } from "native-base";
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Empty, HeaderRoot, LazyLoading, ModalLoading } from "@/components";
import { settings } from "@/config";
import { BaseHeadingDate } from "../../Block/Base";
import { getFileInFolderExtension, uploadFileInFolder } from "@/api/UserFolder";
import { ImageListProps } from "@/navigation/types/profile";
import ModalImage from "@/components/ModalImage";
import { Modalize } from "react-native-modalize";
import { ImageFolderData } from "@/types/Folder";
import { useAppSelector } from "@/store/hook";
import * as ImagePicker from "expo-image-picker";
import { UserData } from "@/types/User";
import FastImage from "expo-fast-image";

const { hostURL } = settings;
const { padding, blueColor, borderColor } = settings.styles;
const { width: dW } = Dimensions.get("window");
const ratio = dW / 541;
const imageSize = dW * 0.33333 - (padding * 2) / 3 - 5;

const ImageListScreen: FC<ImageListProps> = ({
  navigation,
  route: {
    params: { folderId },
  },
}) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // lấy dữ liệu hình ảnh
  const [page, setPage] = useState({ current: 1, next: true });
  const [dataAll, setDataAll] = useState<ImageFolderData[]>([]);
  const [dataMonth, setDataMonth] = useState<
    { title: string; data: ImageFolderData[][] }[]
  >([]);
  const [dataYear, setDataYear] = useState<
    { title: string; data: ImageFolderData[][] }[]
  >([]);

  const fetchDataAll = async (pageIndex: number) => {
    try {
      const res = await getFileInFolderExtension(folderId, null, pageIndex, 30);
      setDataAll([...dataAll, ...res.Data.Items[0].UserFiles]);
      if (pageIndex >= res.Data.TotalPage) {
        setPage({ ...page, next: false });
      }
    } catch (error) {}
  };

  const fetchDataMonth = async (pageIndex: number) => {
    try {
      const res = await getFileInFolderExtension(folderId, 0, pageIndex, 30);
      setDataMonth([
        ...dataMonth,
        ...res.Data.Items.map((i) => {
          return {
            title: "Tháng " + i.Month + ", " + i.Year,
            data: [i.UserFiles],
          };
        }),
      ]);
      if (pageIndex >= res.Data.TotalPage) {
        setPage({ ...page, next: false });
      }
    } catch (error) {}
  };

  const fetchDataYear = async (pageIndex: number) => {
    try {
      const res = await getFileInFolderExtension(folderId, 1, pageIndex, 30);
      setDataYear([
        ...dataYear,
        ...res.Data.Items.map((i) => {
          return {
            title: "Năm " + i.Year,
            data: [i.UserFiles],
          };
        }),
      ]);
      if (pageIndex >= res.Data.TotalPage) {
        setPage({ ...page, next: false });
      }
    } catch (error) {}
  };

  const [preload, setPreload] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      const { current, next } = page;
      if (next) {
        setLoading(true);
        await Promise.all([
          fetchDataAll(current),
          fetchDataMonth(current),
          fetchDataYear(current),
        ]);
        setLoading(false);
      }
      if (!ready) setReady(true);
    })();
  }, [page.current, preload]);

  // lọc hình ảnh
  const [filter, setFilter] = useState(2);

  // chọn / chụp hình ảnh
  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        try {
          await uploadFileInFolder({
            ...result,
            userId: user.UserId,
            folderId,
          });
          setPreload((prev) => prev + 1);
        } catch (error) {
          Toast.show({ text: "Lỗi trong quá trình thêm hình ảnh" });
        }
      }
    }
  };

  const takeAPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        try {
          await uploadFileInFolder({
            ...result,
            userId: user.UserId,
            folderId,
          });
          setPreload((prev) => prev + 1);
        } catch (error) {
          Toast.show({ text: "Lỗi trong quá trình thêm hình ảnh" });
        }
        console.log(result);
      }
    }
  };

  // slide cho hình ảnh
  const modalImages = useRef<Modalize>(null);
  const [images, setImages] = useState<any[]>([]);
  const handleModalImages = (data: ImageFolderData[]) => {
    setImages([
      ...data.map((i) => {
        return { url: hostURL + "/" + i.FileUrl };
      }),
    ]);
    setTimeout(() => modalImages.current?.open(), 100);
  };

  return (
    <Container>
      <HeaderRoot title="HÌNH ẢNH" previous={() => navigation.goBack()} />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <View style={styles.menu}>
            <Text style={styles.menutext} onPress={pickPhoto}>
              Tải ảnh từ thiết bị
            </Text>
            <View style={styles.menuline} />
            <Text style={styles.menutext} onPress={takeAPhoto}>
              Chụp từ camera
            </Text>
          </View>
          {dataAll.length > 0 && (
            <>
              {filter === 0 && (
                <SectionList
                  onEndReached={() =>
                    setPage({ ...page, current: page.current + 1 })
                  }
                  onEndReachedThreshold={0.5}
                  sections={dataYear}
                  stickySectionHeadersEnabled
                  renderSectionHeader={({ section }) => (
                    <BaseHeadingDate text={section.title} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.list,
                        { flexDirection: "row", flexWrap: "wrap" },
                      ]}
                    >
                      {item.map((i) => (
                        <TouchableWithoutFeedback
                          key={i.Id}
                          onPress={() => handleModalImages(item)}
                        >
                          <FastImage
                            source={{ uri: hostURL + "/" + i.FileUrl }}
                            style={styles.img}
                          />
                        </TouchableWithoutFeedback>
                      ))}
                    </View>
                  )}
                />
              )}
              {filter === 1 && (
                <SectionList
                  sections={dataMonth}
                  onEndReached={() =>
                    setPage({ ...page, current: page.current + 1 })
                  }
                  onEndReachedThreshold={0.5}
                  stickySectionHeadersEnabled
                  renderSectionHeader={({ section }) => (
                    <BaseHeadingDate text={section.title} />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.list,
                        { flexDirection: "row", flexWrap: "wrap" },
                      ]}
                    >
                      {item.map((i) => (
                        <TouchableWithoutFeedback
                          key={i.Id}
                          onPress={() => handleModalImages(item)}
                        >
                          <FastImage
                            source={{ uri: hostURL + "/" + i.FileUrl }}
                            style={styles.img}
                          />
                        </TouchableWithoutFeedback>
                      ))}
                    </View>
                  )}
                />
              )}
              {filter === 2 && (
                <View style={{ flex: 1 }}>
                  <BaseHeadingDate text="Tất cả" />
                  <FlatList
                    // onEndReached={() =>
                    //   setPage({ ...page, current: page.current + 1 })
                    // }
                    // onEndReachedThreshold={0.5}
                    ListFooterComponent={<View style={{ height: 20 }} />}
                    style={styles.list}
                    data={dataAll}
                    keyExtractor={(i) => i.Id.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                      <TouchableWithoutFeedback
                        onPress={() => handleModalImages(dataAll)}
                      >
                        <FastImage
                          source={{ uri: hostURL + "/" + item.FileUrl }}
                          style={styles.img}
                        />
                      </TouchableWithoutFeedback>
                    )}
                  />
                </View>
              )}
            </>
          )}
          {!dataAll.length && (
            <Empty text="Không có bất kỳ hình ảnh nào trong thư mục" />
          )}
          {dataAll.length > 0 && (
            <View style={styles.filter}>
              <View style={styles.filterinner}>
                {["Năm", "Tháng", "Tất cả"].map((i, index) => (
                  <TouchableWithoutFeedback
                    key={i}
                    onPress={() => setFilter(index)}
                  >
                    <View
                      style={[
                        styles.filterbox,
                        index === filter && {
                          borderRadius: 100,
                          backgroundColor: blueColor,
                        },
                        index === 1 && { marginHorizontal: 10 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.filtertext,
                          index === filter && { color: "#fff" },
                        ]}
                      >
                        {i}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          )}
          <ModalImage ref={modalImages} images={images} />
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {},
  menu: {
    flexDirection: "row",
    alignItems: "center",
  },
  menutext: {
    color: blueColor,
    fontFamily: "SFProDisplay-Semibold",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 1.25,
    paddingTop: 12,
    paddingBottom: 14,
    flex: 0.5,
    textAlign: "center",
  },
  menuline: {
    width: 1,
    backgroundColor: borderColor,
    height: "60%",
  },
  list: {
    paddingHorizontal: padding - 2.5,
    paddingVertical: 10,
  },
  img: {
    width: imageSize,
    height: imageSize,
    margin: 2.5,
    borderRadius: 12,
  },
  filter: {
    backgroundColor: "rgba(255, 255, 255, .85)",
    borderRadius: 100,
    padding: 7,
    position: "absolute",
    bottom: 7,
    alignSelf: "center",
  },
  filterinner: {
    flexDirection: "row",
    borderRadius: 100,
    overflow: "hidden",
  },
  filterbox: {
    width: 80,
    height: 45,
  },
  filtertext: {
    lineHeight: 45,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "SFProDisplay-Semibold",
    color: "#616161",
  },
});

export default ImageListScreen;
