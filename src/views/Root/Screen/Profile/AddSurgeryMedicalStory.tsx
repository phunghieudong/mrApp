import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Container, Content, Toast } from "native-base";
import {
  HeaderRoot,
  InputBlock,
  ModalLoading,
  PickerBlock,
} from "@/components";
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { settings } from "@/config";
import { useForm } from "react-hook-form";
import { AddSurgeryMedicalStoryData } from "@/types/MedicalRecordStory";
import { _format } from "@/utils";
import { useAppSelector } from "@/store/hook";
import {
  addMedicalRecordHistory,
  editMedicalRecordHistory,
} from "@/api/MedicalRecordHistory";
import { UserData } from "@/types/User";
import { AddSurgeryMedicalStoryProps } from "@/navigation/types/profile";
import { Modalize } from "react-native-modalize";

const { padding, blueColor } = settings.styles;

const AddSurgeryMedicalStoryScreen: FC<AddSurgeryMedicalStoryProps> = ({
  navigation,
  route: {
    params: {
      refetch,
      id,
      type,
      surgeryPart,
      surgeryPlace,
      surgeryResult,
      surgeryYear,
      sympToms,
    },
  },
}) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AddSurgeryMedicalStoryData>();

  useEffect(() => {
    register("complication", { required: true });
    register("department", { required: true });
    register("place", { required: true });
    register("result", { required: true });
    register("year", { required: true });
  }, []);

  const onValueChange = (k, v) => {
    setValue(k, v);
  };

  const onTrigger = (k) => {
    trigger(k);
  };

  // set value khi cập nhật dữ liệu
  useEffect(() => {
    if (type === 1) {
      Promise.all([
        Promise.resolve(setValue("department", surgeryPart as string)),
      ]);
      Promise.all([Promise.resolve(setValue("year", surgeryResult as string))]);
      Promise.all([
        Promise.resolve(setValue("result", surgeryResult as string)),
      ]);
      Promise.all([
        Promise.resolve(setValue("complication", sympToms as string)),
      ]);
      Promise.all([Promise.resolve(setValue("place", surgeryPlace as string))]);
    }
  }, [type]);

  // thêm mới hoặc sửa tiền sử phẫu thuật
  const [loading, setLoading] = useState(false);
  const newRefetch = useRef(refetch);

  const add = async (data: AddSurgeryMedicalStoryData) => {
    try {
      const { complication, department, place, result, year } = data;
      const params = {
        surgeryPart: department,
        surgeryYear: year,
        surgeryPlace: place,
        surgeryResult: result,
        sympToms: complication,
        id,
        type: 1,
        userId: user.UserId,
      };
      await addMedicalRecordHistory(params);
      Toast.show({ text: "Thêm tiền sử phẫu thuật thành công" });
      newRefetch.current + 1;
    } catch (error) {
      Toast.show({ text: "Sửa tiền sử phẫu thuật thành công" });
    } finally {
      setLoading(false);
    }
  };

  const update = async (data: AddSurgeryMedicalStoryData) => {
    try {
      const { complication, department, place, result, year } = data;
      const params = {
        surgeryPart: department,
        surgeryYear: year,
        surgeryPlace: place,
        surgeryResult: result,
        sympToms: complication,
        id,
        type: 1,
        userId: user.UserId,
      };
      await editMedicalRecordHistory(params);
      Toast.show({ text: "Cập nhật tiền sử phẫu thuật thành công" });
    } catch (error) {
      Toast.show({ text: "Cập nhật tiền sử phẫu thuật thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const _onPress = async (data: AddSurgeryMedicalStoryData) => {
    setLoading(true);
    if (type === 0) add(data);
    else update(data);
  };

  // chuyển hướng
  const nav = () => {
    let info: any = {
      refetchSMRD:
        newRefetch.current === 0 ? undefined : newRefetch.current + 1,
    };
    if (type === 1)
      info = {
        refetchSMRD: undefined,
        surgeryPart: watch("department"),
        surgeryYear: watch("year"),
        surgeryPlace: watch("place"),
        surgeryResult: watch("result"),
        sympToms: watch("complication"),
        id,
      };
    navigation.navigate("MedicalStory", { ...info });
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", nav);

    return () => BackHandler.removeEventListener("hardwareBackPress", nav);
  }, []);

  return (
    <Container>
      <HeaderRoot title="TIỂU SỬ" previous={nav} />
      <Content contentContainerStyle={styles.body}>
        <Text style={styles.heading}>
          {type === 0 ? "Thêm" : "Sửa"} tiền sử phẫu thuật
        </Text>
        <InputBlock
          defaultValue={surgeryPart}
          owner="department"
          placeholder="BỘ PHẬN PHẪU THUẬT"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.department}
          errorMess={{ required: "Bộ phận phẫu thuật không được bỏ trống" }}
        />
        <PickerBlock
          defaultValue={surgeryYear}
          data={[..._format.getListYear()]}
          item={{ itemOwner: "year", itemLabel: "value", itemValue: "value" }}
          placeholder="NĂM PHẪU THUẬT"
          onTrigger={onTrigger}
          onValueChange={onValueChange}
          errors={errors.year}
          errorMess={{ required: "Năm phẫu thuật không được bỏ trống" }}
        />
        <InputBlock
          defaultValue={surgeryPlace}
          owner="place"
          placeholder="NƠI PHẪU THUẬT"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.place}
          errorMess={{ required: "Nơi phẫu thuật không được bỏ trống" }}
        />
        <InputBlock
          defaultValue={surgeryResult}
          owner="result"
          placeholder="KẾT QUẢ PHẪU THUẬT"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.result}
          errorMess={{ required: "Kết quả phẫu thuật không được bỏ trống" }}
        />
        <InputBlock
          defaultValue={sympToms}
          owner="complication"
          placeholder="BIẾN CHỨNG"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors.complication}
          errorMess={{ required: "Biến chứng không được bỏ trống" }}
        />
        <TouchableWithoutFeedback
          onPress={loading ? undefined : handleSubmit(_onPress)}
        >
          <View style={styles.btn}>
            <Text style={styles.btntext}>
              {type === 0 ? "THÊM MỚI" : "CẬP NHẬT"}
            </Text>
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
  btn: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 22,
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
});

export default AddSurgeryMedicalStoryScreen;
