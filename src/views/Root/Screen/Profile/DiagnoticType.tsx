import { getDiagnoticType } from "@/api/Catalogue";
import { Empty, HeaderRoot, LazyLoading } from "@/components";
import { DiagnoticTypeProps } from "@/navigation/types/profile";
import { Container } from "native-base";
import React, { FC, useEffect, useState } from "react";

const DiagnoticType: FC<DiagnoticTypeProps> = ({
  navigation,
  route: {
    params: { hospitalId },
  },
}) => {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDiagnoticType(hospitalId);
        setData([...res.Data]);
        setReady(true);
      } catch (error) {
        throw new Error("FETCH DIAGNOTIC TYPE IS FAILED");
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderRoot title="Chuẩn đoán" previous={() => navigation.goBack()} />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kỳ chuẩn đoán nào" />
      )}
      {ready && !!data.length && <Empty text="Đang xử lý ..." />}
    </Container>
  );
};

export default DiagnoticType;
