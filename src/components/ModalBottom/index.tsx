import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
import { settings } from "@/config";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

const { padding, blueColor } = settings.styles;

type IProps = {
  heading: string;
  children: ReactElement;
  panGestureEnabled?: false;
  closeOnOverlayTap?: false;
  headingButton?: {
    text: string;
    onPress: () => void;
  };
  onClose?: () => void;
};

const ModalBottom: ForwardRefExoticComponent<IProps & RefAttributes<Modalize>> =
  forwardRef(
    (
      {
        children,
        heading,
        panGestureEnabled,
        closeOnOverlayTap,
        headingButton,
        onClose,
      },
      ref: ForwardedRef<Modalize>
    ) => {
      return (
        <Portal>
          <Modalize
            ref={ref}
            panGestureEnabled={panGestureEnabled}
            closeOnOverlayTap={closeOnOverlayTap}
            onClose={onClose}
            adjustToContentHeight
            withHandle={false}
            modalStyle={{
              backgroundColor: "transparent",
              elevation: 0,
              shadowColor: "transparent",
              shadowOffset: undefined,
              shadowOpacity: 0,
              shadowRadius: 0,
            }}
          >
            <View style={styles.modal}>
              <View style={styles.box}>
                <Text style={styles.heading}>{heading}</Text>
                {headingButton && (
                  <Text
                    style={styles.btnsubmit}
                    onPress={headingButton.onPress}
                  >
                    {headingButton.text}
                  </Text>
                )}
              </View>
              {children}
            </View>
          </Modalize>
        </Portal>
      );
    }
  );

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: padding,
    paddingTop: 16,
    paddingBottom: 18,
  },
  heading: {
    flex: 1,
    fontSize: 20,
    fontFamily: "SFProDisplay-Regular",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  pseudo: {
    position: "absolute",
    left: 15,
    right: 15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#dfdfdf",
    zIndex: -1,
  },
  icon: {
    color: "#000",
    fontSize: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  btnclose: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
    marginRight: 15,
  },
  btnsubmit: {
    color: blueColor,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default ModalBottom;
