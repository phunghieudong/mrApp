import React, { FC, useEffect, useState } from "react";
import { View, Text, Container, Icon } from "native-base";
import { Empty, HeaderRoot, LazyLoading } from "@/components";
import { NewsProps } from "@/navigation/types/profile";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { getNewFeed } from "@/api/NewFeed";
import { NewFeedData } from "@/types/NewFeed";
import { settings } from "@/config";

const { padding, mainColorText, successColor } = settings.styles;

const News: FC<NewsProps> = ({ navigation }) => {
  const [data, setData] = useState<NewFeedData[]>([]);
  const [page, setPage] = useState({ current: 1, next: true });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { current, next } = page;
        if (next) {
          const params = { pageIndex: current, pageSize: 10 };
          const res = await getNewFeed(params);
          setData([...res.Data.Items]);
          if (current >= res.Data.TotalPage) {
            setPage({ ...page, next: false });
          }
          if (!ready) setReady(true);
        }
      } catch (error) {
        throw new Error("FETCH NEW FEED DATA IS FAILED !");
      }
    })();
  }, [page.current]);

  return (
    <Container style={styles.container}>
      <HeaderRoot title="tin tức" previous={() => navigation.goBack()} />
      {!ready && <LazyLoading />}
      {ready && !data.length && (
        <Empty text="Không tìm thấy bất kỳ tin tức nào" />
      )}
      {ready && data.length > 0 && (
        <FlatList
          data={data}
          style={styles.body}
          onEndReached={() => setPage({ ...page, current: page.current + 1 })}
          onEndReachedThreshold={0.5}
          keyExtractor={(i) => i.Id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("NewsDetail", {
                  bannerImage: item.BannerUrl,
                  backgroundImage: item.BackGroundImgUrl,
                  content: item.Content,
                  title: item.Title,
                })
              }
            >
              <View style={styles.box}>
                <View style={styles.logo}>
                  <Text style={styles.logotext}>LG</Text>
                </View>
                <View style={styles.detail}>
                  <View style={styles.flex}>
                    <Text style={styles.title}>{item.Title}</Text>
                    <Icon
                      style={styles.icon}
                      type="Ionicons"
                      name="chevron-forward"
                    />
                  </View>
                  <Text style={styles.content} numberOfLines={5}>
                    {item.Content}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(216, 227, 232)",
  },
  body: {
    paddingHorizontal: padding,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 10,
    padding: 14,
    flexDirection: "row",
  },
  logo: {
    backgroundColor: successColor,
    borderRadius: 100,
    width: 34,
    height: 34,
    marginRight: 8,
    marginTop: 4,
  },
  logotext: {
    textAlign: "center",
    lineHeight: 34,
    color: "#fff",
    fontSize: 14,
    fontFamily: "SFProDisplay-Regular",
  },
  detail: {
    flex: 1,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 18,
    padding: 8,
    left: 8,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  img: {
    width: 40,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Regular",
  },
});

export default News;
