import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Container,
  Icon,
  Input,
  Content,
  Toast,
  Spinner,
} from "native-base";
import { HeaderRoot, LazyLoading, Loading } from "@/components";
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { settings } from "@/config";
import { FolderProps } from "@/navigation/types/profile";
import { addFolder, getFolder } from "@/api/UserFolder";
import { useAppSelector } from "@/store/hook";
import { FolderData } from "@/types/Folder";
import Svg, { G, Path } from "react-native-svg";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { UserData } from "@/types/User";

const {
  dangerColor,
  padding,
  orangeColor,
  orangeColorLight,
  mainColorText,
  blueColor,
  borderColor,
} = settings.styles;

const { height: dH } = Dimensions.get("screen");

const FolderScreen: FC<FolderProps> = ({ navigation }) => {
  // get current user
  const user = useAppSelector((state) => state.user.current) as UserData;

  // folder list
  const [data, setData] = useState<FolderData[]>([]);
  const [ready, setReady] = useState(false);

  const fetchData = async () => {
    try {
      if (user?.Id) {
        const res = await getFolder(user?.Id);
        setData([...res.Data.Items]);
        setReady(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  // modal add folder
  const modal = useRef<Modalize>(null);
  const [viewHeight, setViewHeight] = useState(0);
  const [position, setPosition] = useState(20);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setPosition(100);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setPosition(20);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onBackButtonPress = () => {
    if (!submitting) {
      modal.current?.close();
      return true;
    }
    return false;
  };

  // ++ create new folder
  const [newFolder, setNewFolder] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const _onPress = async () => {
    if (newFolder.length <= 4) {
      setError("Tên album phải ít nhất 5 kí tự");
      return;
    }
    try {
      if (user.UserId) {
        setSubmitting(true);
        const params = {
          FolderName: newFolder,
          FolderIcon: null,
          UserId: user.UserId,
          TypeId: 3,
          UserFiles: [],
          Created: new Date(),
          CreatedBy: user.UserFullName,
          TotalImageInFolder: 0,
          Updated: null,
          UpdatedBy: null,
          Deleted: false,
          Active: true,
          RowNumber: 0,
        };
        await addFolder(params).then(() =>
          setData([{ ...params, Id: data[0].Id + 1 || 1 }, ...data])
        );
        Toast.show({ text: "Tạo album thành công" });
      }
    } catch (error) {
      Toast.show({ text: "Tạo album thất bại" });
    } finally {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <Container>
      <HeaderRoot title="HÌNH ẢNH" previous={() => navigation.goBack()} />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <FlatList
            style={styles.body}
            ListHeaderComponent={
              <View style={styles.heading}>
                <Text style={styles.title}>
                  Hiện có <Text style={styles.num}>{data.length}</Text> album
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => modal.current?.open("top")}
                >
                  <View style={styles.add}>
                    <Icon
                      type="MaterialCommunityIcons"
                      name="pencil"
                      style={styles.addicon}
                    />
                    <Text style={styles.addtext}>Tạo folder</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            }
            numColumns={3}
            data={data}
            keyExtractor={(i) => i.Id.toString()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("ImageList", { folderId: item.Id })
                }
              >
                <View style={styles.folder}>
                  <Svg width="38.119" height="31.13" viewBox="0 0 38.119 31.13">
                    <G
                      id="Group_1122"
                      data-name="Group 1122"
                      transform="translate(-6875 -1052)"
                    >
                      <G id="folder" transform="translate(6875 1052)">
                        <Path
                          id="Path_2445"
                          data-name="Path 2445"
                          d="M37.97,211.695H9.534a.994.994,0,0,1-.959-1.253l6.458-17.707a.994.994,0,0,1,.959-.735H44.428c.654,0,.959.625.959,1.253L38.929,210.96a.994.994,0,0,1-.959.735Z"
                          transform="translate(-7.904 -181.2)"
                          fill="#b2f0fb"
                        />
                        <Path
                          id="Path_2446"
                          data-name="Path 2446"
                          d="M36.064,211.695H9.534a.994.994,0,0,1-.959-1.253l6.458-17.707a.994.994,0,0,1,.959-.735h26.53c.654,0,.959.625.959,1.253L37.023,210.96a.994.994,0,0,1-.959.735Z"
                          transform="translate(-7.904 -181.2)"
                          fill="#e3e7f2"
                        />
                        <Path
                          id="Path_2447"
                          data-name="Path 2447"
                          d="M40.468,59.913H24.416l-3.177-4.447H9.634a1.1,1.1,0,0,0-1.1,1.1V83.712l.131.006,6.363-17.353a.994.994,0,0,1,.959-.735H41.569V61.014a1.1,1.1,0,0,0-1.1-1.1Z"
                          transform="translate(-7.898 -54.831)"
                          fill="#b2f0fb"
                        />
                        <Path
                          id="Path_2448"
                          data-name="Path 2448"
                          d="M38.563,59.913H24.416l-3.177-4.447H9.634a1.1,1.1,0,0,0-1.1,1.1V83.712l.131.006,6.363-17.353a.994.994,0,0,1,.959-.735H39.663V61.014a1.1,1.1,0,0,0-1.1-1.1Z"
                          transform="translate(-7.898 -54.831)"
                          fill="#b2f0fb"
                        />
                        <Path
                          id="Path_2449"
                          data-name="Path 2449"
                          d="M17.689,55.466h-.222a1.1,1.1,0,0,0-1.1,1.1V83.712l.131.006,1.192-3.475V55.466Z"
                          transform="translate(-15.148 -54.831)"
                          fill="#fff"
                        />
                        <G
                          id="Group_1121"
                          data-name="Group 1121"
                          transform="translate(0 0)"
                        >
                          <Path
                            id="Path_2450"
                            data-name="Path 2450"
                            d="M30.072,204.431H1.636a1.629,1.629,0,0,1-1.573-2.055l6.475-17.758a1.613,1.613,0,0,1,1.556-1.152H36.53a1.7,1.7,0,0,1,1.595,1.889.635.635,0,0,1-.038.218l-6.458,17.707A1.613,1.613,0,0,1,30.072,204.431ZM8.094,184.736a.36.36,0,0,0-.346.265L1.274,202.76a.341.341,0,0,0,.078.259.352.352,0,0,0,.285.141H30.072a.36.36,0,0,0,.346-.265l6.431-17.639c-.016-.174-.078-.521-.319-.521Z"
                            transform="translate(-0.006 -173.301)"
                            fill="#142977"
                          />
                          <Path
                            id="Path_2451"
                            data-name="Path 2451"
                            d="M.766,76.456l-.046,0-.112-.006A.635.635,0,0,1,0,75.814V48.669a1.738,1.738,0,0,1,1.736-1.736H13.342a.636.636,0,0,1,.517.266l2.986,4.181H32.571a1.738,1.738,0,0,1,1.736,1.736v4.617a.635.635,0,0,1-.635.635H8.088a.36.36,0,0,0-.346.265L1.362,76.04A.636.636,0,0,1,.766,76.456ZM1.736,48.2a.466.466,0,0,0-.465.465V72.6l5.261-14.35A1.613,1.613,0,0,1,8.088,57.1H33.036V53.116a.466.466,0,0,0-.465-.465H16.518A.636.636,0,0,1,16,52.385L13.015,48.2Z"
                            transform="translate(0 -46.933)"
                            fill="#142977"
                          />
                        </G>
                      </G>
                    </G>
                  </Svg>
                  <Text style={styles.foldertext}>{item.FolderName}</Text>
                  <Text style={styles.foldernum}>
                    {item.TotalImageInFolder} hình ảnh
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <Portal>
            <Modalize
              onClose={() => setError("")}
              ref={modal}
              withHandle={false}
              modalStyle={{
                margin: 30,
                marginTop: dH / 2 - viewHeight / 2 - position,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                borderRadius: 24,
              }}
              onBackButtonPress={onBackButtonPress}
              onOverlayPress={submitting ? () => null : undefined}
              panGestureEnabled={!submitting}
              adjustToContentHeight
              tapGestureEnabled
              scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
            >
              <View
                style={styles.modal}
                onLayout={(e) => setViewHeight(e.nativeEvent.layout.height)}
              >
                <Text style={styles.modalname}>Đặt tên album</Text>
                <Input
                  style={styles.modalinput}
                  placeholder="Nhập tên album ảnh"
                  placeholderTextColor="rgba(0, 0, 0, .3)"
                  onChangeText={(val) => setNewFolder(val)}
                  onEndEditing={
                    newFolder.length > 4 ? () => setError("") : () => null
                  }
                  onSubmitEditing={
                    newFolder.length <= 4
                      ? () => setError("Tên album phải ít nhất 5 kí tự")
                      : _onPress
                  }
                />
                {error.length > 0 && (
                  <Text style={styles.modalerror}>{error}</Text>
                )}
                <TouchableWithoutFeedback onPress={_onPress}>
                  <View style={styles.modalcreate}>
                    {submitting && (
                      <Spinner
                        color="#fff"
                        size={20}
                        style={{ height: 0, marginRight: 4 }}
                      />
                    )}
                    <Text style={styles.modalcreatetext}>Tạo album</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Modalize>
          </Portal>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: padding,
    paddingVertical: 10,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    letterSpacing: 1.25,
    lineHeight: 24,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  num: {
    fontFamily: "SFProDisplay-Bold",
  },
  add: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: orangeColorLight,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 12,
    borderRadius: 100,
  },
  addicon: {
    color: orangeColor,
    fontSize: 18,
    marginRight: 4,
  },
  addtext: {
    color: orangeColor,
    fontSize: 14,
    fontFamily: "SFProDisplay-Regular",
  },
  folder: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "33.33333%",
    marginTop: 20,
  },
  foldertext: {
    marginTop: 4,
    textAlign: "center",
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
    fontSize: 16,
    lineHeight: 21,
  },
  foldernum: {
    color: blueColor,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
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

export default FolderScreen;
