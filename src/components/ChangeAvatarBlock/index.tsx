import React from "react";
import { View, Text, Icon, Input } from "native-base";
import { settings } from "@/config";
import { Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { InputBlock } from "@/components";

const { mainColorLight, blueColor, blueColorLight, padding } = settings.styles;

type IProps = {
  avatar?: string;
  setState: (img: string) => void;
  owner: string;
  placeholder: string;
  onValueChange: (key, value) => void;
  onTrigger: (key) => void;
  errors: any;
  errorMess: {
    required: string;
    pattern?: string;
    validate?: string;
    minLength?: string;
    maxLength?: string;
  };
};

const ChangeAvatarBlock = ({
  setState,
  avatar,
  onTrigger,
  errorMess,
  errors,
  onValueChange,
  owner,
}: IProps) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
      });

      if (!result.cancelled) {
        setState(result.uri);
      }
    }
  };

  return (
    <View style={styles.block}>
      <TouchableWithoutFeedback onPress={pickImage}>
        <View>
          {!avatar && (
            <View style={styles.left}>
              <Icon type="EvilIcons" name="camera" style={styles.camera} />
            </View>
          )}
          {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.right}>
        <InputBlock
          owner={owner}
          placeholder="HỌ VÀ TÊN"
          onValueChange={onValueChange}
          onTrigger={onTrigger}
          errors={errors}
          errorMess={errorMess}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: mainColorLight,
    paddingVertical: padding,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: blueColor,
    backgroundColor: blueColorLight,
  },
  camera: {
    textAlign: "center",
    lineHeight: 90,
    color: blueColor,
    fontSize: 32,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  right: {
    top: -20,
    marginLeft: 15,
  },
});

export default ChangeAvatarBlock;
