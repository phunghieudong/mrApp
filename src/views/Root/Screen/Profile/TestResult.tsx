import { HeaderRoot, LazyLoading, Loading, ModalLoading } from "@/components";
import { Container } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import { BaseHeadingDate } from "../../Block/Base";
import { SectionList } from "react-native";
import { settings } from "@/config";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { useAppSelector } from "@/store/hook";
import { getAllMedicalRecord } from "@/api/MedicalRecordDetail";
import { _format } from "@/utils";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import { Modalize } from "react-native-modalize";
import ModalImage from "@/components/ModalImage";
import { TestResultItem } from "../../Block/TestResult";
import { TestResultProps } from "@/navigation/types/profile";
import { UserData } from "@/types/User";

const { hostURL } = settings;

const TestResultScreen: FC<TestResultProps> = ({ navigation }) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // lấy danh sách kết quả xét nghiệm
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<DiagnosticData>>([]);
  const [page, setPage] = useState({ current: 1, next: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { current, next } = page;
        if (next) {
          setLoading(true);
          const res = await getAllMedicalRecord(
            user.UserId,
            user.Id,
            current,
            10
          );
          setData([...data, ...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          if (!ready) setReady(true);
          setLoading(false);
        }
      } catch (error) {
        throw new Error("FETCH TEST RESULT DATA IS FAILED !");
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderRoot
        title="K.QUẢ XÉT NGHIỆM"
        previous={() => navigation.goBack()}
      />
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <SectionList
            sections={data.map((item) => {
              return {
                title:
                  _format.getDateOfWeek(item.ExaminationDate) +
                  ", " +
                  _format.getShortVNDate(item.ExaminationDate),
                data: [{ ...item }],
              };
            })}
            stickySectionHeadersEnabled
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            renderSectionHeader={({ section }) => (
              <BaseHeadingDate text={section.title} />
            )}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <TestResultItem first={index === 0} item={item} />
            )}
          />
          <ModalLoading visible={loading} />
        </>
      )}
    </Container>
  );
};

export default TestResultScreen;
