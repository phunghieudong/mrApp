import { settings } from "@/config";
import { Form, Icon, Input, Item, Text, View } from "native-base";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import Animated, { EasingNode } from "react-native-reanimated";

const { width: dW } = Dimensions.get("screen");

const {
  mainColor,
  mainColorText,
  labelColor,
  dangerColor,
  borderColor,
  blueColor,
} = settings.styles;

type ItemProps = {
  itemOwner: string;
  itemLabel: string;
  itemValue: string;
};

type CallbackProps = {
  cbOwner: string;
  cbValue: string;
};

type ErrorMessProps = {
  required: string;
  lackData?: string;
  empty?: string;
};

type StatusProps = {
  choose: boolean;
  loading: boolean;
};

type Props = {
  defaultValue?: string | number;
  refresh?: 0 | 1 | 2 | 3;
  placeholder: string;
  picker?: boolean;
  search?: string;
  item: ItemProps;
  callback?: CallbackProps;
  data: Array<any>;
  onValueChange: (
    k,
    v,
    callBack_k?,
    callBack_v?,
    number?: 0 | 1 | 2 | 3
  ) => void;
  onTrigger: (k) => void;
  errors: any;
  errorMess: ErrorMessProps;
  status?: StatusProps;
};

const layoutProvider = new LayoutProvider(
  (index) => {
    return index;
  },
  (type, dim) => {
    dim.width = dW;
    dim.height = 40;
  }
);

const PickerBlock = (props: Props) => {
  const {
    defaultValue,
    refresh,
    placeholder,
    picker,
    item: { itemOwner, itemLabel, itemValue },
    data,
    callback,
    search,
    onValueChange,
    onTrigger,
    errors,
    errorMess,
  } = props;

  console.log(data);

  // callback
  const cbOwner = callback?.cbOwner;
  const cbValue = callback?.cbValue;

  // animated
  const animatedLabelTop = useRef(new Animated.Value(20)).current;

  const toggleAnimated = useCallback((type: "up" | "down") => {
    if (type === "up") {
      Animated.timing(animatedLabelTop, {
        toValue: -8,
        duration: 150,
        easing: EasingNode.ease,
      }).start();
    } else {
      Animated.timing(animatedLabelTop, {
        toValue: 20,
        duration: 150,
        easing: EasingNode.ease,
      }).start();
    }
  }, []);

  // filter
  const [newData, setNewData] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const setValueAndTriggerAsync = (value: string | number, item) => {
    let callBack_v = undefined;
    if (cbValue) callBack_v = item[cbValue];
    onValueChange(itemOwner, value, cbOwner, callBack_v, refresh);
    onTrigger(itemOwner);
  };

  const onPressText = useCallback(
    async (value: number, label: string, item) => {
      await Promise.all([
        Promise.resolve(setModal(false)),
        Promise.resolve(setInput(label)),
      ]);
      setTimeout(() => {
        setValueAndTriggerAsync(value, item);
      }, 1);
    },
    []
  );

  useEffect(() => {
    if (defaultValue) {
      Promise.all([
        Promise.resolve(
          setValueAndTriggerAsync(
            defaultValue,
            data.find((x) => x[itemValue] == defaultValue)
          )
        ),
        Promise.resolve(setInput(defaultValue.toString())),
        Promise.resolve(toggleAnimated("up")),
      ]);
    }
  }, [defaultValue]);

  // modal
  const openModal = () => {
    Promise.all([
      Promise.resolve(setModal(true)),
      Promise.resolve(toggleAnimated("up")),
    ]);
  };

  const closeModal = useCallback(async () => {
    if (!input.length) {
      Promise.all([
        Promise.resolve(setModal(false)),
        Promise.resolve(toggleAnimated("down")),
      ]);
    } else {
      Promise.all([Promise.resolve(setModal(false))]);
    }
  }, [input]);

  // recycler list view
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );

  const setData = useMemo(() => {
    let newCurrentData: any[] = [];
    if (data.length > 0) {
      newCurrentData = data.filter((item) =>
        item[itemLabel].toLowerCase().includes(searchText)
      );
    }
    return newCurrentData;
  }, [data]);

  useEffect(() => {
    setNewData([...setData]);
    if ([...setData].length > 0) {
      setDataProvider(dataProvider.cloneWithRows([...setData]));
    }
  }, [searchText]);

  const renderItem = useCallback(
    (type?, item?) => {
      const value: number = item[itemValue];
      const label: string = item[itemLabel];

      return (
        <TouchableWithoutFeedback
          key={value}
          onPress={() => onPressText(value, label, item)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 11.5,
            }}
          >
            <Text
              style={[styles.item, label === input && { color: blueColor }]}
            >
              {label}
            </Text>
            {label === input && (
              <Icon
                type="Ionicons"
                name="checkmark-outline"
                style={{ color: blueColor, fontSize: 20 }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [input]
  );

  // // scroll to position item is chosen
  // const refRecyclerListView = useRef<any>(null).current;

  // useEffect(() => {
  //   refRecyclerListView?.scrollToIndex(200);
  // }, []);

  return (
    <>
      <View
        style={[
          styles.frmgroup,
          input.length > 0 && { borderColor: mainColor },
        ]}
      >
        <Animated.Text style={[styles.label, { top: animatedLabelTop }]}>
          {placeholder}
        </Animated.Text>
        {input.length > 0 && <Text style={styles.selected}>{input}</Text>}
        <View style={styles.control}>
          <Icon
            style={[styles.icon, { top: 3 }]}
            name="caret-up-sharp"
            type="Ionicons"
          />
          <Icon
            style={[styles.icon, { bottom: 3 }]}
            name="caret-down-sharp"
            type="Ionicons"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0}
          style={{
            ...(StyleSheet.absoluteFill as {}),
          }}
          onPress={openModal}
        />
      </View>
      {errors && errorMess.required && (
        <Text style={styles.error}>{errorMess.required}</Text>
      )}
      <Modal
        transparent
        animationType="none"
        visible={modal}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, .5)",
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{
              ...(StyleSheet.absoluteFill as {}),
              backgroundColor: "transparent",
            }}
          />
          <View style={{ margin: 36, flex: 1 }}>
            {data.length > 0 && search && (
              <Form style={styles.search}>
                <Icon type="Ionicons" name="search" style={styles.searchicon} />
                <Item style={styles.searchbox}>
                  <Input
                    onChangeText={(val) => setSearchText(val.toLowerCase())}
                    style={styles.searchinput}
                    placeholder={search}
                  />
                </Item>
              </Form>
            )}
            {data.length > 0 && (
              <>
                {!picker && (
                  <View
                    style={[
                      styles.modal,
                      {
                        flex: 1,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                      },
                    ]}
                  >
                    <RecyclerListView
                      style={{ flex: 1 }}
                      dataProvider={dataProvider}
                      layoutProvider={layoutProvider}
                      rowRenderer={renderItem}
                      keyboardShouldPersistTaps="always"
                      renderFooter={
                        !newData.length
                          ? () => <View style={styles.empty} />
                          : undefined
                      }
                    />
                  </View>
                )}
                {picker && (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <FlatList
                      style={[
                        styles.modal,
                        {
                          flexGrow: 0,
                          borderTopLeftRadius: 2,
                          borderTopRightRadius: 2,
                        },
                      ]}
                      data={data}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({ item }) => renderItem(undefined, item)}
                    />
                  </View>
                )}
              </>
            )}
            {!data.length && (
              <View style={{ flex: 1, backgroundColor: "#fff" }} />
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  empty: {
    ...(StyleSheet.absoluteFill as {}),
    backgroundColor: "#fff",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopStartRadius: 2,
    borderTopEndRadius: 2,
    borderBottomWidth: 1,
    borderColor,
  },
  searchicon: {
    fontSize: 20,
    flex: 0.15,
    lineHeight: 50,
    textAlign: "center",
    color: mainColor,
    borderRightWidth: 1,
    borderColor,
    top: 0,
    right: 0,
  },
  searchbox: {
    flex: 0.85,
    marginLeft: 0,
    borderBottomWidth: 0,
  },
  searchinput: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  item: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "SFProDisplay-Regular",
    color: "#343a40",
  },
  frmgroup: {
    marginTop: 26,
    height: 50.4,
    top: 8,
    paddingTop: 3,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor,
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: "SFProDisplay-Regular",
    color: labelColor,
  },
  selected: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: "SFProDisplay-Regular",
    color: mainColorText,
  },
  control: {
    position: "absolute",
    right: 6,
    bottom: 8,
  },
  icon: {
    fontSize: 12,
    color: "#a3a9c3",
  },
  error: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 13,
    color: dangerColor,
    fontFamily: "SFProDisplay-Medium",
  },
});

export default PickerBlock;
