import { Content, View } from "native-base";
import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import { Dimensions, Keyboard } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

const { height: dH } = Dimensions.get("window");

type IProps = {
  children: ReactElement;
  style?: {
    borderRadius?: number;
  };
  avoidKeyboard?: true;
  panGestureEnabled?: false;
  closeOnOverlayTap?: false;
  onClosed?: () => void;
  onClose?: () => void;
};

const Index: ForwardRefExoticComponent<IProps & RefAttributes<Modalize>> =
  forwardRef(
    (
      {
        children,
        avoidKeyboard,
        style,
        panGestureEnabled,
        closeOnOverlayTap,
        onClose,
        onClosed,
      },
      ref
    ) => {
      const [height, setHeight] = useState(0);
      const [position, setPosition] = useState(0);

      useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          if (avoidKeyboard) {
            setPosition(60);
          }
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          if (avoidKeyboard) {
            setPosition(0);
          }
        });

        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

      return (
        <Portal>
          <Modalize
            ref={ref}
            withHandle={false}
            adjustToContentHeight
            scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
            disableScrollIfPossible={false}
            panGestureEnabled={panGestureEnabled}
            closeOnOverlayTap={closeOnOverlayTap}
            onClose={onClose}
            onClosed={onClosed}
            modalStyle={{
              margin: 30,
              marginTop:
                height >= dH - 90 - position
                  ? 30
                  : dH / 2 - height / 2 - 10 - position,
              elevation: 0,
              borderTopLeftRadius: style?.borderRadius,
              borderTopRightRadius: style?.borderRadius,
              borderBottomLeftRadius: style?.borderRadius,
              borderBottomRightRadius: style?.borderRadius,
              overflow: "hidden",
            }}
            childrenStyle={{
              maxHeight: dH - 90,
            }}
          >
            <Content
              keyboardShouldPersistTaps="handled"
              style={{
                backgroundColor: "#fff",
              }}
              onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
            >
              {children}
            </Content>
          </Modalize>
        </Portal>
      );
    }
  );
export default Index;
