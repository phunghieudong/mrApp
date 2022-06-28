import React, { Dispatch, SetStateAction } from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import { MedicalRecordStoryData } from "@/types/MedicalRecordStory";
import { useNavigation } from "@react-navigation/core";

const { mainColorText, borderColor, orangeColor } = settings.styles;

type IProps = {
  item: MedicalRecordStoryData;
  remove: Dispatch<SetStateAction<boolean>>;
  handleItem: (id: number, status: "add" | "remove") => void;
  removeStatus: boolean;
  checked?: true;
  id?: number | undefined;
  surgeryPart?: string | undefined;
  surgeryYear?: string | undefined;
  surgeryPlace?: string | undefined;
  surgeryResult?: string | undefined;
  sympToms?: string | undefined;
};

const SurveyNoteBlock = ({
  item: { Id, SurgeryPart, SurgeryPlace, SurgeryResult, SurgeryYear, SympToms },
  handleItem,
  remove,
  removeStatus,
  checked,
  id,
  surgeryPart,
  surgeryPlace,
  surgeryResult,
  surgeryYear,
  sympToms,
}: IProps) => {
  // chuyển hướng
  const navigation = useNavigation();

  const handleDropdown = async (type: number) => {
    if (type === 1) {
      Promise.all([
        Promise.resolve(remove(true)),
        Promise.resolve(handleItem(Id, "add")),
      ]);
    } else if (type === 0) {
      navigation.navigate("AddSurgeryMedicalStory", {
        type: 1,
        number: 0,
        id: Id,
        surgeryPart: SurgeryPart,
        surgeryYear: SurgeryYear,
        surgeryPlace: SurgeryPlace,
        surgeryResult: SurgeryResult,
        sympToms: SympToms,
      });
    }
  };

  return (
    <View style={styles.box}>
      {removeStatus && (
        <>
          {!checked && (
            <TouchableWithoutFeedback onPress={() => handleItem(Id, "add")}>
              <Icon type="Feather" name="circle" style={styles.chkbox} />
            </TouchableWithoutFeedback>
          )}
          {checked && (
            <TouchableWithoutFeedback onPress={() => handleItem(Id, "remove")}>
              <Icon
                type="Feather"
                name="check-circle"
                style={[styles.chkbox, { color: orangeColor }]}
              />
            </TouchableWithoutFeedback>
          )}
        </>
      )}
      <View style={styles.block}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableWithoutFeedback onPress={() => handleDropdown(0)}>
            <Icon
              type="MaterialCommunityIcons"
              name="pencil"
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleDropdown(1)}>
            <Icon
              type="MaterialCommunityIcons"
              name="delete-forever"
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.group}>
          <Text style={[styles.label, { marginTop: 0 }]}>
            BỘ PHẬN PHẪU THUẬT
          </Text>
          <Text style={styles.value}>
            {id === Id ? surgeryPart : SurgeryPart}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>NĂM PHẪU THUẬT</Text>
          <Text style={styles.value}>
            {id === Id ? surgeryYear : SurgeryYear}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>NƠI PHẪU THUẬT</Text>
          <Text style={styles.value}>
            {id === Id ? surgeryPlace : SurgeryPlace}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>KẾT QUẢ PHẪU THUẬT</Text>
          <Text style={styles.value}>
            {id === Id ? surgeryResult : SurgeryResult}
          </Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>BIẾN CHỨNG</Text>
          <Text style={styles.value}>{id === Id ? sympToms : SympToms}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    flexDirection: "row",
    height: 45,
    borderRadius: 4,
    elevation: 4,
    overflow: "hidden",
  },
  dropdowntext: {
    fontSize: 16,
    fontFamily: "SFProDisplay-Regular",
    paddingHorizontal: 40,
    paddingTop: 10,
    paddingBottom: 12,
    color: mainColorText,
  },
  box: {
    flexDirection: "row",
    marginTop: 10,
  },
  block: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 13,
    paddingBottom: 15,
  },
  icon: {
    marginLeft: 6,
    left: 6,
    fontSize: 22,
    padding: 6,
    color: "rgba(0, 0, 0, .5)",
  },
  chkbox: {
    fontSize: 22,
    color: borderColor,
    marginRight: 8,
  },
  group: {
    marginTop: 10,
  },
  label: {
    letterSpacing: 0.8,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "SFProDisplay-Medium",
    color: "rgba(0, 0, 0, .5)",
  },
  value: {
    letterSpacing: 0.8,
    fontSize: 14,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
});

export default SurveyNoteBlock;
