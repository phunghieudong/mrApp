import { getNotifications } from "@/api/Notification";
import { Empty, HeaderRoot } from "@/components";
import { NotificationProps } from "@/navigation/types/RootStack";
import { NotificationData } from "@/types/Notification";
import { Container, Text, View } from "native-base";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const NotificationScreen: FC<NotificationProps> = ({ navigation }) => {
  const [data, setData] = useState<NotificationData[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getNotifications();
        setData([...res.Data]);
        if (!ready) setReady(true);
      } catch (error) {
        throw new Error("FETCH NOTIFICATIONS DATA IS FAILED");
      }
    })();
  }, []);

  return (
    <Container>
      <HeaderRoot title="thông báo" previous={() => navigation.goBack()} />
      <Empty text="Không tìm thấy bất kỳ thông báo nào" />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default NotificationScreen;
