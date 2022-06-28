import { Icon, DatePicker } from "native-base";
import React, { useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
// import DateTimePicker from "@react-native-community/datetimepicker";

import { settings } from "@/config";
import _format from "@/utils/Base";

const { labelColor, mainColor, mainColorText, borderColor, dangerColor } =
  settings.styles;

type ErrorMessages = {
  required: string;
};

type Props = {
  defaultValue?: Date;
  placeholder: string;
  owner: string;
  onValueChange: (key, value) => void;
  onTrigger: (key) => void;
  errors?: any;
  errorMess?: ErrorMessages;
  maximumDate?: Date;
  minimumDate?: Date;
};

const DateTimePickerBlock = (props: Props) => {
  const {
    defaultValue,
    owner,
    placeholder,
    onValueChange,
    onTrigger,
    errors,
    errorMess,
    maximumDate,
    minimumDate,
  } = props;

  // animated
  const animatedLabelTop = useRef(
    new Animated.Value(defaultValue ? -8 : 20)
  ).current;

  const toggleAnimated = (type: "up" | "down") => {
    if (type === "up") {
      Animated.timing(animatedLabelTop, {
        toValue: -8,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedLabelTop, {
        toValue: 20,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  // date time picker
  const [date, setDate] = useState<any>(
    defaultValue ? new Date(defaultValue) : null
  );
  const [show, setShow] = useState(false);

  const onChangeDate = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    if (selectedDate) {
      await onValueChange(owner, selectedDate);
    }
    await onTrigger(owner);
    if (!selectedDate && !date) toggleAnimated("down");
  };

  const openDateTimePicker = () => {
    setShow(true);
    toggleAnimated("up");
  };

  return (
    <View
      style={{
        marginTop: 26,
      }}
    >
      <View style={[styles.frmgroup, date && { borderColor: mainColor }]}>
        <Animated.Text style={[styles.label, { top: animatedLabelTop }]}>
          {placeholder}
        </Animated.Text>
        {date && (
          <Text style={styles.selected}>{_format.getShortVNDate(date)}</Text>
        )}
      </View>
      <View style={styles.date}>
        {/* @ts-ignore */}
        <Icon style={styles.icon} name="calendar" type="EvilIcons" />
      </View>
      <TouchableOpacity
        activeOpacity={0}
        onPress={openDateTimePicker}
        style={{ ...(StyleSheet.absoluteFill as {}) }}
      />
      {show && ( // @ts-ignore
        <DatePicker
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          locale="vi-VN"
          defaultDate={date || new Date()}
          // @ts-ignore
          onChange={onChangeDate}
        />
      )}
      {errors && errorMess && errorMess.required && (
        <Text style={styles.error}>{errorMess.required}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  frmgroup: {
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
  date: {
    position: "absolute",
    right: 0,
    bottom: 8,
  },
  icon: {
    fontSize: 26,
    color: "#a3a9c3",
  },
  error: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 13,
    color: dangerColor,
    fontFamily: "SFProDisplay-Regular",
  },
});

export default DateTimePickerBlock;
