import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, Container, Icon } from "native-base";
import {
  Empty,
  HeaderRoot,
  LazyLoading,
  Loading,
  ModalImage,
} from "@/components";
import {
  Dimensions,
  FlatList,
  Image,
  SectionList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { settings } from "@/config";
import BaseHospital from "../../Block/Base/BaseHospital";
import { BaseHeadingDate } from "../../Block/Base";
import { PrescriptionProps } from "@/navigation/types/profile";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { useAppSelector } from "@/store/hook";
import { getAllMedicalRecord } from "@/api/MedicalRecordDetail";
import { _format } from "@/utils";
import { PrescriptionItem } from "../../Block/Prescription";
import { UserData } from "@/types/User";
import { Modalize } from "react-native-modalize";

const PrescriptionScreen: FC<PrescriptionProps> = ({ navigation }) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // lấy dữ liệu toa thuốc
  const [data, setData] = useState<Array<DiagnosticData>>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      if (user.UserId && user.Id) {
        try {
          const res = await getAllMedicalRecord(user.UserId, user.Id, 1, 10);
          setData([...res.Data.Items]);
          if (!ready) setReady(true);
        } catch (error) {
          throw new Error("FETCH ALL MEDICAL RECORD IS FAILED !!!");
        }
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderRoot title="TOA THUỐC" previous={() => navigation.goBack()} />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kỳ toa thuốc nào" />
      )}
      {ready && data.length > 0 && (
        <>
          <SectionList
            sections={data.map((item) => {
              return {
                title: _format.getShortVNDate(item.ExaminationDate) as string,
                data: [{ ...item }],
              };
            })}
            stickySectionHeadersEnabled
            renderSectionHeader={({ section }) => (
              <BaseHeadingDate text={section.title} />
            )}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => <PrescriptionItem item={item} />}
          />
        </>
      )}
    </Container>
  );
};

export default PrescriptionScreen;
