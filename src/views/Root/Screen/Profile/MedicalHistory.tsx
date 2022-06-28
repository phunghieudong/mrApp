import { Empty, HeaderRoot, LazyLoading, Loading } from "@/components";
import { settings } from "@/config";
import { Container, Icon } from "native-base";
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { MedicalHistoryProps } from "@/navigation/types/Profile";
import { HospitalData } from "@/types/base";
import { getHospitals } from "@/api/Catalogue";

const { padding, mainColorText, borderColor, blueColor } = settings.styles;

const renderItem = (
  item: HospitalData,
  index: number,
  nav: (id: number) => void
) => {
  let first = {};
  if (index === 0) first["borderTopWidth"] = 0;

  return (
    <TouchableWithoutFeedback onPress={() => nav(item.Id)}>
      <View style={[styles.item, first]}>
        <View style={styles.left}>
          <Text style={styles.word}>BV</Text>
        </View>
        <View style={styles.right}>
          {/* <Text style={styles.date}>25 tháng 07, 2021</Text> */}
          <Text style={styles.hospital}>{item.Name}</Text>
          <Text style={styles.position}>{item.Address}</Text>
          <Icon type="Ionicons" name="chevron-forward" style={styles.next} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MedicalHistoryScreen: FC<MedicalHistoryProps> = ({ navigation }) => {
  // chuyển hướng trang
  const nav = (id: number) => {
    navigation.navigate("MedicalHistoryDetail");
  };

  // lấy danh sách bệnh viện
  const [data, setData] = useState<HospitalData[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getHospitals();
        setData([...res.Data]);
        setReady(true);
      } catch (error) {
        throw new Error("FETCH HOSPITAL IS FAILED !");
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderRoot
        title="LỊCH SỬ KHÁM BỆNH"
        previous={() => navigation.goBack()}
      />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kì bệnh viện nào" />
      )}
      {ready && data.length > 0 && (
        <FlatList
          style={styles.body}
          data={data}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item, index }) => renderItem(item, index, nav)}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: padding,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor,
  },
  left: {
    marginRight: 12,
    backgroundColor: blueColor,
    borderRadius: 6,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  word: {
    color: "#fff",
    fontFamily: "SFProDisplay-Bold",
    letterSpacing: 2,
  },
  right: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  hospital: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Medium",
    color: mainColorText,
  },
  position: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .6)",
  },
  next: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 18,
    color: mainColorText,
  },
});

export default MedicalHistoryScreen;
