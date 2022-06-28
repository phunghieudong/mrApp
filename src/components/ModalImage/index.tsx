import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useState,
} from "react";
import { Icon, Text, View } from "native-base";
import { Modalize } from "react-native-modalize";
import { Dimensions, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { Portal } from "react-native-portalize";
import { IHandles } from "react-native-modalize/lib/options";
import { settings } from "@/config";
import { _format } from "@/utils";

const { height: dH, width: dW } = Dimensions.get("window");
const { hostURL } = settings;

type IProps = {
  images: any[];
};

const ModalImage: ForwardRefExoticComponent<IProps & RefAttributes<Modalize>> =
  forwardRef(({ images }, ref: any) => {
    // config header when zoom, click image
    const [header, setHeader] = useState(true);

    const newData = images.map((i) => {
      return { ...i, url: i?.FileUrl ? hostURL + "/" + i?.FileUrl : i?.url };
    });

    console.log(newData);

    return (
      <Portal>
        <Modalize
          ref={ref}
          withHandle={false}
          modalHeight={dH}
          panGestureEnabled={false}
          modalStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          <View style={styles.modal}>
            <ImageViewer
              imageUrls={newData}
              saveToLocalByLongPress={false}
              enableSwipeDown
              onSwipeDown={() => ref.current?.close()}
              onDoubleClick={() => setHeader(!header)}
              renderIndicator={() => <View />}
              renderHeader={
                header
                  ? (index) => (
                      <View style={styles.top}>
                        {index !== undefined && (
                          <>
                            <Text style={styles.page}>{`${index + 1}/${
                              images.length
                            }`}</Text>
                            <Text style={styles.date}>
                              {_format.getShortVNDate(images[index].Created)}
                            </Text>
                          </>
                        )}
                        <TouchableWithoutFeedback
                          onPress={() => ref.current?.close()}
                        >
                          <Icon
                            type="AntDesign"
                            name="close"
                            style={styles.close}
                          />
                        </TouchableWithoutFeedback>
                      </View>
                    )
                  : undefined
              }
            />
          </View>
        </Modalize>
      </Portal>
    );
  });

const styles = StyleSheet.create({
  modal: {
    width: dW,
    height: dH - 25,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  top: {
    ...(StyleSheet.absoluteFill as {}),
    bottom: undefined,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  page: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "SFProDisplay-Semibold",
  },
  date: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 23,
    fontFamily: "SFProDisplay-Semibold",
  },
  close: {
    color: "#fff",
    padding: 4,
    left: 4,
  },
});

export default ModalImage;
