import { getAllMedicalRecord } from "@/api/MedicalRecordDetail";
import { LazyLoading, ModalLoading } from "@/components";
import { useAppSelector } from "@/store/hook";
import { DiagnosticData } from "@/types/MedicalRecordDetail";
import { UserData } from "@/types/User";
import { _format } from "@/utils";
import { Spinner } from "native-base";
import React, { FC, useEffect, useRef, useState } from "react";
import { SectionList } from "react-native";
import { Modalize } from "react-native-modalize";
import { DiagnosisBlock } from ".";
import Title from "./Title";

type IProps = {};

const Diagnostis: FC<IProps> = ({}) => {
  // lấy user hiện tại ra
  const user = useAppSelector((state) => state.user.current) as UserData;

  // lấy dữ liệu chuẩn đoán chung ra
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState({ current: 1, next: true });
  const [diagnosticData, setDiagnosticData] = useState<Array<DiagnosticData>>(
    []
  );

  useEffect(() => {
    (async () => {
      const { current, next } = page;
      if (next) {
        try {
          const res = await getAllMedicalRecord(
            user.UserId,
            user.Id,
            current,
            20
          );
          setDiagnosticData([...diagnosticData, ...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          if (!ready) setReady(true);
        } catch (error) {
          throw new Error("FETCH ALL MEDICAL RECORD IS FAILED !!!");
        }
      }
    })();
  }, [page.current]);

  // xử lý bấm vào dữ liệu thì hiện ra
  const [show, setShow] = useState<{ id?: number; status?: number }>({});

  const handleShow = (id, status: number) => {
    setShow({ ...show, [id]: id, [id + "status"]: status });
  };

  return (
    <>
      {!ready && <LazyLoading />}
      {ready && (
        <>
          <SectionList
            sections={diagnosticData.map((item) => {
              return {
                title:
                  item.HospitalName +
                  " - " +
                  _format.getShortVNDate(item.ExaminationDate),
                data: [{ item }],
              };
            })}
            stickySectionHeadersEnabled
            renderSectionHeader={({ section }) => (
              <Title
                title={section.title}
                handleShow={handleShow}
                item={section.data[0].item}
                status={show[section.data[0].item.Id + "status"]}
              />
            )}
            onEndReached={() => setPage({ ...page, current: page.current + 1 })}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <DiagnosisBlock
                id={item.item.Id}
                status={show[item.item.Id + "status"]}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default Diagnostis;
