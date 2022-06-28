import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Container, Input, Content, Toast } from "native-base";
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { settings } from "@/config";
import { HeaderRoot, ModalLoading } from "@/components";
import { useAppSelector } from "@/store/hook";
import { addMedicalRecordHistory } from "@/api/MedicalRecordHistory";
import { AddMedicalStoryProps } from "@/navigation/types/profile";
import { UserData } from "@/types/User";
import { Modalize } from "react-native-modalize";

const {
  mainColorLight,
  dangerColor,
  noteColor,
  mainColor,
  padding,
  blueColor,
} = settings.styles;

const AddSurgeryMedicalStoryScreen: FC<AddMedicalStoryProps> = ({
  navigation,
  route: {
    params: { refetch },
  },
}) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // xử lý lưu mới ghi chú
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const onTrigger = () => {
    if (!note.length) setError("Ghi chú không được bỏ trống");
    else setError("");
  };

  // xử lý khi thêm mới ghi chú
  const newRefetch = useRef<number>(refetch);
  const [loading, setLoading] = useState(false);
  const _onPress = async () => {
    if (note.length > 0) {
      setLoading(true);
      try {
        const params = { description: note, userId: user.UserId, type: 0 };
        await addMedicalRecordHistory(params);
        setError("");
        setNote("");
        newRefetch.current = newRefetch.current + 1;
        Toast.show({ text: "Thêm tiền sử thành công" });
      } catch (error) {
        Toast.show({ text: "Thêm tiền sử thất bại" });
      } finally {
        setLoading(false);
      }
    } else onTrigger();
  };

  const backAction = () => {
    navigation.navigate("MedicalStory", {
      refetchMRD: newRefetch.current === 0 ? undefined : newRefetch.current,
    });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Container>
      <HeaderRoot title="TIỂU SỬ" previous={backAction} />
      <Content contentContainerStyle={styles.body}>
        <Text style={styles.heading}>Thêm tiền sử mới</Text>
        <Input
          multiline
          style={styles.input}
          textAlignVertical="top"
          placeholder="GHI CHÚ"
          defaultValue={note}
          onChangeText={(val) => setNote(val)}
          onEndEditing={onTrigger}
          placeholderTextColor={noteColor}
        />
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
        <TouchableWithoutFeedback onPress={loading ? undefined : _onPress}>
          <View style={styles.btn}>
            <Text style={styles.btntext}>THÊM MỚI</Text>
          </View>
        </TouchableWithoutFeedback>
      </Content>
      <ModalLoading visible={loading} />
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 1.25,
    fontFamily: "SFProDisplay-Regular",
    marginTop: 20,
  },
  input: {
    marginTop: 20,
    flex: 0,
    backgroundColor: mainColorLight,
    minHeight: 120,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    color: mainColor,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
  },
  btn: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "center",
    marginTop: 26,
    marginBottom: 26,
    paddingHorizontal: 57,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
  },
  btntext: {
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
  },
  error: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    color: dangerColor,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default AddSurgeryMedicalStoryScreen;
