import React, { FC, useRef, useState } from "react";
import { View, Text, Icon, Spinner } from "native-base";
import BaseHospital from "../Base/BaseHospital";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { settings } from "@/config";
import { Modalize } from "react-native-modalize";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import * as ImagePicker from "expo-image-picker";
import { uploadMedicalRecordDetailMultipleFiles } from "@/api/MedicalRecordDetail";
import { useAppSelector } from "@/store/hook";
import { UserData } from "@/types/User";
import ModalBottom from "@/components/ModalBottom";
import { ModalImage, ModalLoading } from "@/components";

const { padding, blueColor, orangeColor, mainColorLight, mainColor } =
  settings.styles;

type IProps = {
  item: DiagnosticData;
  first: boolean;
};

const Index: FC<IProps> = ({
  item: {
    MedicalRecordId,
    DoctorComment,
    UserFiles,
    HospitalAddress,
    HospitalName,
    HospitalId,
    SpecialistTypeName,
    Id,
  },
  first,
}) => {
  const user = useAppSelector((state) => state.user.current) as UserData;

  // chọn / chụp hình ảnh từ thiết bị
  const [images, setImages] = useState<any[]>([]);
  const select = useRef<Modalize>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([
          ...images,
          {
            ...result,
            medicalRecordId: MedicalRecordId,
            medicalRecordDetailId: Id,
            folderId: 2,
            userId: user.UserId,
            fileType: 3,
          },
        ]);
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
        setImages([
          ...images,
          {
            ...result,
            medicalRecordId: MedicalRecordId,
            medicalRecordDetailId: Id,
            folderId: 2,
            userId: user.UserId,
            fileType: 3,
            url: result["uri"],
          },
        ]);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  };

  const [loading, setLoading] = useState(false);
  const _onPress = async () => {
    try {
      try {
        setLoading(true);
        await uploadMedicalRecordDetailMultipleFiles(Id, images);
        setLoading(false);
      } catch (error) {}
    } catch (error) {}
  };

  // xem slide hình
  const slide = useRef<Modalize>(null);

  return (
    <View style={styles.block}>
      <BaseHospital
        first={first}
        hospital={HospitalName}
        address={HospitalAddress}
      />
      <View style={styles.profile}>
        <View style={styles.group}>
          <Text style={styles.label}>MÃ HỒ SƠ BỆNH VIỆN</Text>
          <Text style={styles.value}>BV-{HospitalId}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>KHOA</Text>
          <Text style={styles.value}>{SpecialistTypeName}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>KẾT QUẢ XÉT NGHIỆM</Text>
          <Text style={styles.value}>{DoctorComment}</Text>
        </View>
      </View>
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: i, index }) => {
          let firstOrLast = {};
          if (index === 0) firstOrLast = { marginLeft: padding };
          else if (index === images.length - 1)
            firstOrLast = { marginRight: padding };
          return (
            <View
              style={[
                firstOrLast,
                { width: 72, height: 72, marginRight: 8, marginTop: 8 },
              ]}
            >
              <TouchableWithoutFeedback onPress={() => slide.current?.open()}>
                <Image source={{ uri: i.uri }} style={styles.img} />
              </TouchableWithoutFeedback>
            </View>
          );
        }}
      />
      <TouchableWithoutFeedback onPress={() => select.current?.open()}>
        <View style={styles.document}>
          <Icon type="EvilIcons" name="camera" style={styles.documenticon} />
          <Text style={styles.documenttext}>TẢI ẢNH / LƯU HỒ SƠ</Text>
        </View>
      </TouchableWithoutFeedback>
      {images.length > 0 && (
        <TouchableWithoutFeedback onPress={loading ? undefined : _onPress}>
          <View style={styles.update}>
            <Text style={styles.updatetext}>CẬP NHẬT</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      <ModalBottom
        ref={select}
        heading="Chọn hình ảnh"
        headingButton={
          images.length > 0 ? { text: "LƯU", onPress: _onPress } : undefined
        }
      >
        <>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item: i, index }) => {
              let firstOrLast = {};
              if (index === 0) firstOrLast = { marginLeft: 30 };
              else if (index === images.length - 1)
                firstOrLast = { marginRight: 30 };
              return (
                <View style={[styles.box, firstOrLast]}>
                  <TouchableWithoutFeedback
                    onPress={() => slide.current?.open()}
                  >
                    <Image source={{ uri: i.uri }} style={styles.img} />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => removeImage(index)}>
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
          <View
            style={{
              paddingHorizontal: 30,
              marginTop: 10,
              marginBottom: 4,
            }}
          >
            <TouchableWithoutFeedback onPress={loading ? undefined : takeImage}>
              <View style={styles.add}>
                <Text style={styles.addtext}>Chụp ảnh</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={loading ? undefined : pickImage}>
              <View style={styles.add}>
                <Text style={styles.addtext}>Thêm hình ảnh từ thiết bị</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </>
      </ModalBottom>
      <ModalImage ref={slide} images={images} />
      <ModalLoading visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingBottom: 10,
  },
  profile: {
    marginHorizontal: padding,
    marginTop: 16,
    backgroundColor: mainColorLight,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  group: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    lineHeight: 24,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
    color: mainColor,
    opacity: 0.5,
  },
  value: {
    color: mainColor,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: "SFProDisplay-Regular",
  },
  list: {},
  box: {
    width: 84,
    height: 95,
    justifyContent: "flex-end",
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  remove: {
    position: "absolute",
    top: 12,
    right: 2,
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
    marginTop: 15,
    marginBottom: 5,
  },
  documenticon: {
    color: orangeColor,
    marginRight: 4,
  },
  documenttext: {
    textAlign: "center",
    color: orangeColor,
    fontSize: 16,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
  },
  update: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "center",
    marginVertical: 15,
    paddingHorizontal: 57,
    paddingTop: 15,
    paddingBottom: 17,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  updatetext: {
    fontSize: 16,
    letterSpacing: 1.25,
    color: "#fff",
    fontFamily: "SFProDisplay-Semibold",
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
});

export default Index;
