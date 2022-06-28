import React from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import { useNavigation } from "@react-navigation/core";
import { AllergyNoteData } from "@/types/Allergy";
import { _format } from "@/utils";

const { mainColorText, borderColor, orangeColor, blueColor } = settings.styles;

type IProps = {
  allergyTypeName?: string;
  allergyTypeId?: number;
  id?: number;
  description?: string;
  fromDate?: Date;
  toDate?: Date;
  item: AllergyNoteData;
  first: boolean;
  checked?: true;
  select: (id: number, status: "add" | "remove") => void;
  remove: boolean;
  removeMethod: (id: number) => void;
  editMethod:
    | ((params: {
        id: number;
        description: string;
        allergyTypeId: number;
        allergyTypeName: string;
      }) => Promise<void>)
    | undefined;
};

const NoteItem = ({
  first,
  checked,
  select,
  remove,
  removeMethod,
  editMethod,
  item: { Description, Id, AllergyTypeId, AllergyTypeName, FromDate, ToDate },
  allergyTypeId,
  allergyTypeName,
  description,
  fromDate,
  id,
  toDate,
}: IProps) => {
  // chuyển hướng
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      {remove && (
        <>
          {!checked && (
            <TouchableWithoutFeedback onPress={() => select(Id, "add")}>
              <View style={styles.left}>
                <Icon type="Feather" name="circle" style={styles.chkbox} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {checked && (
            <TouchableWithoutFeedback onPress={() => select(Id, "remove")}>
              <View style={styles.left}>
                <Icon
                  type="Feather"
                  name="check-circle"
                  style={[styles.chkbox, { color: orangeColor }]}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        </>
      )}
      <View style={[styles.right, first && { borderTopWidth: 0 }]}>
        <View
          style={[
            styles.flex,
            { marginTop: 16, justifyContent: "space-between" },
          ]}
        >
          <Text style={styles.group}>
            {id === Id ? allergyTypeName : AllergyTypeName}
          </Text>
          <View style={styles.flex}>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("AddAllergy", {
                  refetch: undefined,
                  status: 1,
                  allergyTypeName: AllergyTypeName,
                  allergyTypeId: AllergyTypeId,
                  id: Id,
                  description: Description,
                  fromDate: FromDate,
                  toDate: ToDate,
                })
              }
            >
              <Icon
                type="MaterialCommunityIcons"
                name="pencil"
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => removeMethod(Id)}>
              <Icon
                type="MaterialCommunityIcons"
                name="delete-forever"
                style={styles.icon}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text
          style={[
            styles.description,
            (!FromDate || !ToDate) && { marginBottom: 24 },
          ]}
        >
          {id === Id ? description : Description}
        </Text>
        {((FromDate && ToDate) || (toDate && fromDate)) && (
          <Text style={styles.date}>
            Thời gian:{" "}
            {_format.getShortVNDate(id === Id ? fromDate : FromDate) +
              " - " +
              _format.getShortVNDate(id === Id ? toDate : ToDate)}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
  },
  left: {
    marginRight: 8,
    marginTop: 24,
  },
  chkbox: {
    fontSize: 22,
    color: borderColor,
  },
  right: {
    flex: 1,
    borderTopWidth: 1,
    borderColor,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 6,
    left: 6,
    fontSize: 22,
    padding: 6,
    color: "rgba(0, 0, 0, .5)",
  },
  group: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.25,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    color: "rgba(0, 0, 0, .5)",
    fontFamily: "SFProDisplay-Regular",
  },
  date: {
    marginBottom: 24,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .5)",
  },
  box: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    minHeight: 40,
    borderRadius: 6,
    color: mainColorText,
  },
  submit: {
    fontSize: 22,
    height: 52,
    textAlignVertical: "center",
    paddingHorizontal: 12,
    color: orangeColor,
  },
  close: {
    paddingHorizontal: 12,
    marginTop: 4,
    fontFamily: "SFProDisplay-Medium",
    marginBottom: 24,
    color: blueColor,
    textAlign: "right",
  },
});

export default NoteItem;
