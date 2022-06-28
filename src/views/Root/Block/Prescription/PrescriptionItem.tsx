import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { Icon, Text, View } from "native-base";
import React, { FC, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import BaseHospital from "../Base/BaseHospital";
import * as ImagePicker from "expo-image-picker";
import { settings } from "@/config";
import { useAppSelector } from "@/store/hook";
import { uploadMedicalRecordDetailMultipleFiles } from "@/api/MedicalRecordDetail";
import { ModalImage, ModalLoading } from "@/components";
import { UserData } from "@/types/User";
import { Modalize } from "react-native-modalize";
import ModalBottom from "@/components/ModalBottom";

const { padding, orangeColor, blueColor } = settings.styles;
const { width: dW } = Dimensions.get("window");

type IProps = {
  item: DiagnosticData;
};

const PrescriptionItem: FC<IProps> = ({ item }) => {
  // get current user
  const user = useAppSelector((state) => state.user.current) as UserData;

  // new images to add
  const select = useRef<Modalize>(null);
  const slide = useRef<Modalize>(null);
  const [images, setImages] = useState<any[]>([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([
          ...images,
          {
            ...result,
            folderId: 1,
            medicalRecordId: item.MedicalRecordId,
            medicalRecordDetailId: item.Id,
            userId: user.UserId,
            fileType: 2,
            url: result["uri"],
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
            folderId: 1,
            medicalRecordId: item.MedicalRecordId,
            medicalRecordDetailId: item.Id,
            userId: user.UserId,
            fileType: 2,
            url: result["uri"],
          },
        ]);
      }
    }
  };

  const removeImage = (index) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)]);
  };

  const [loading, setLoading] = useState(false);
  const _onPress = async () => {
    setLoading(true);
    await uploadMedicalRecordDetailMultipleFiles(item.Id, images);
    setLoading(false);
  };

  return (
    <View style={styles.block}>
      <BaseHospital
        hospital={item.HospitalName}
        address={item.HospitalAddress}
        first={true}
      />
      <Text style={styles.type}>
        {item.SpecialistTypeId && `Khoa: ${item.SpecialistTypeName}, `}Phòng{" "}
        {item.RoomName}
      </Text>
      <FlatList
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[...item.UserFiles, ...images]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          let firstOrLast = {};
          if (index === 0) firstOrLast = { marginLeft: padding };
          else if (index === 4) firstOrLast = { marginRight: padding };
          return (
            <TouchableWithoutFeedback onPress={() => slide.current?.open()}>
              <View style={[styles.box, firstOrLast, { height: "auto" }]}>
                <Image source={{ uri: item.uri }} style={styles.img} />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
      <TouchableWithoutFeedback onPress={() => select.current?.open()}>
        <View style={styles.document}>
          <Icon type="EvilIcons" name="camera" style={styles.documenticon} />
          <Text style={styles.documenttext}>CHỤP ẢNH / LƯU HỒ SƠ</Text>
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
        heading="Thêm hình ảnh"
        headingButton={
          images.length > 0 ? { text: "LƯU", onPress: _onPress } : undefined
        }
      >
        <>
          <FlatList
            style={styles.list}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[...item.UserFiles, ...images]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              let firstOrLast = {};
              if (index === 0) firstOrLast = { marginLeft: 30 };
              else if (index === 4) firstOrLast = { marginRight: 30 };
              return (
                <TouchableWithoutFeedback onPress={() => slide.current?.open()}>
                  <View style={[styles.box, firstOrLast]}>
                    <Image source={{ uri: item.uri }} style={styles.img} />
                    <TouchableWithoutFeedback
                      onPress={() => removeImage(index)}
                    >
                      <Icon
                        type="AntDesign"
                        name="closecircle"
                        style={styles.remove}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
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
  type: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Semibold",
    color: blueColor,
    marginHorizontal: padding,
  },
  list: {
    marginTop: 8,
  },
  box: {
    height: 90,
    justifyContent: "flex-end",
    marginRight: 10,
    marginBottom: 14,
  },
  img: {
    width: 74,
    height: 74,
    borderRadius: 12,
  },
  remove: {
    position: "absolute",
    top: 4,
    right: -10,
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
  update: {
    elevation: 4,
    backgroundColor: blueColor,
    alignSelf: "center",
    marginVertical: 15,
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

export default PrescriptionItem;
