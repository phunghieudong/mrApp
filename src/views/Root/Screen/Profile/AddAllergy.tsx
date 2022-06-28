import { addNewAllergy, editAllergy } from "@/api/allergy";
import { getAllergy } from "@/api/Catalogue";
import {
  DateTimePickerBlock,
  HeaderRoot,
  InputBlock,
  LazyLoading,
  ModalLoading,
} from "@/components";
import { settings } from "@/config";
import { AddAllergyData } from "@/types/Allergy";
import { AllergyData } from "@/types/base";
import {
  Container,
  Content,
  Icon,
  Input,
  Text,
  Toast,
  View,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  BackHandler,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AddAllergyProps } from "@/navigation/types/Profile";

const {
  padding,
  orangeColor,
  borderColor,
  labelColor,
  mainColorText,
  mainColor,
  blueColor,
} = settings.styles;

const AddAllergyScreen = ({
  navigation,
  route: { params },
}: AddAllergyProps) => {
  const {
    refetch,
    status,
    allergyTypeId,
    allergyTypeName,
    description,
    id,
    fromDate,
    toDate,
  } = params;

  // react hook form
  const {
    register,
    setValue,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<AddAllergyData>();

  const onValueChange = (k, v) => {
    setValue(k, v);
  };

  const onValuesChange = (k1, v1, k2, v2) => {
    Promise.all([
      Promise.resolve(setValue(k1, v1)),
      Promise.resolve(setValue(k2, v2)),
    ]);
  };

  const onTrigger = (k) => {
    trigger(k);
  };

  useEffect(() => {
    register("description", { required: true });
    register("allergyTypeId", { required: true });
    register("allergyTypeName", { required: true });
  }, []);

  useEffect(() => {
    if (allergyTypeId && allergyTypeName && description && toDate && fromDate) {
      Promise.all([
        Promise.resolve(setValue("allergyTypeId", allergyTypeId)),
        Promise.resolve(setValue("allergyTypeName", allergyTypeName)),
        Promise.resolve(setValue("description", description)),
        Promise.resolve(setValue("fromDate", fromDate)),
        Promise.resolve(setValue("toDate", toDate)),
      ]);
    }
  }, [params]);

  // lấy danh sách dị ứng
  const [data, setData] = useState<AllergyData[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllergy();
        setData([...res.Data]);
        setReady(true);
      } catch (error) {
        throw new Error("FETCH ALLERGY IS FAILED !");
      }
    })();
  }, []);

  // tạo mới dị ứng
  const newRefetch = useRef(refetch);
  const [loading, setLoading] = useState(false);

  const add = async (data: AddAllergyData) => {
    try {
      setLoading(true);
      await addNewAllergy(data);
      newRefetch.current = refetch + 1;
      Toast.show({ text: "Thêm dị ứng thành công" });
    } catch (error) {
      Toast.show({ text: "Thêm dị ứng thất bại" });
    } finally {
      setLoading(false);
    }
  };

  const edit = async (data: AddAllergyData) => {
    if (id) {
      try {
        setLoading(true);
        await editAllergy(id, data);
        Toast.show({ text: "Cập nhật dị ứng thành công" });
      } catch (error) {
        Toast.show({ text: "Cập nhật dị ứng thất bại" });
      } finally {
        setLoading(false);
      }
    }
  };

  const _onPress = async (data: AddAllergyData) => {
    if (status === 0) {
      add(data);
    } else {
      edit(data);
    }
  };

  const backAction = () => {
    if (status === 0) {
      navigation.navigate("Allergy", {
        refetch: newRefetch.current === 0 ? undefined : newRefetch.current,
      });
    } else {
      navigation.navigate("Allergy", {
        refetch: undefined,
        id,
        allergyTypeId: watch("allergyTypeId"),
        allergyTypeName: watch("allergyTypeName"),
        description: watch("description"),
        fromDate: watch("fromDate"),
        toDate: watch("toDate"),
      });
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <Container>
      <HeaderRoot
        title={status === 0 ? "Thêm dị ứng" : "C.Nhật dị ứng"}
        previous={backAction}
      />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <Content contentContainerStyle={styles.body}>
            <View style={styles.list}>
              <Text style={styles.heading}>Nhóm dị ứng</Text>
              {data.map((item) => (
                <TouchableWithoutFeedback
                  key={item.Id}
                  onPress={() =>
                    onValuesChange(
                      "allergyTypeId",
                      item.Id,
                      "allergyTypeName",
                      item.Name
                    )
                  }
                >
                  <View style={styles.box}>
                    <Text style={styles.item}>{item.Name}</Text>
                    <Icon
                      type="Feather"
                      name={
                        item.Id === watch("allergyTypeId")
                          ? "check-circle"
                          : "circle"
                      }
                      style={[
                        styles.chkbox,
                        item.Id === watch("allergyTypeId") && {
                          color: orangeColor,
                        },
                      ]}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
            <DateTimePickerBlock
              defaultValue={fromDate}
              owner="fromDate"
              placeholder="NGÀY BỊ DỊ ỨNG"
              onTrigger={onTrigger}
              onValueChange={onValueChange}
              maximumDate={new Date()}
            />
            <DateTimePickerBlock
              defaultValue={toDate}
              owner="toDate"
              placeholder="NGÀY HẾT DỊ ỨNG"
              onTrigger={onTrigger}
              onValueChange={onValueChange}
              maximumDate={new Date()}
            />
            <InputBlock
              owner="description"
              placeholder="MÔ TẢ"
              defaultValue={watch("description")}
              onValueChange={onValueChange}
              onTrigger={onTrigger}
              errors={errors.description}
              errorMess={{
                required: "Mô tả không được bỏ trống",
              }}
            />
            <TouchableWithoutFeedback
              onPress={loading ? undefined : handleSubmit(_onPress)}
            >
              <View style={styles.btn}>
                <Text style={styles.btntext}>
                  {status === 0 ? "THÊM" : "CẬP NHÂT"} DỊ ỨNG
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </Content>
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    paddingHorizontal: padding,
  },
  list: {
    borderRadius: 6,
    marginTop: padding,
  },
  heading: {
    marginBottom: 8,
    fontSize: 18,
    lineHeight: 25,
    fontFamily: "SFProDisplay-Medium",
    color: mainColorText,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    paddingTop: 6,
    paddingBottom: 8,
  },
  item: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  chkbox: {
    fontSize: 22,
    color: borderColor,
  },
  frmgroup: {
    width: "100%",
    minHeight: 50,
    top: 8,
    paddingTop: 3,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor,
    justifyContent: "center",
    marginTop: 26,
  },
  label: {
    position: "absolute",
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
    color: labelColor,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    height: "auto",
    width: "100%",
    flex: 0,
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  btn: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "flex-end",
    marginTop: 30,
    marginBottom: padding,
    paddingHorizontal: 24,
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

export default AddAllergyScreen;
