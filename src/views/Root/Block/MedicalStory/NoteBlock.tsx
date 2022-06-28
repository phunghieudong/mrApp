import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, Icon } from "native-base";
import { StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { settings } from "@/config";
import { _format } from "@/utils";

const { mainColorText, borderColor, orangeColor, blueColor } = settings.styles;

type Props = {
  id: number;
  text: string;
  remove: Dispatch<SetStateAction<boolean>>;
  removeStatus: boolean;
  checked?: true;
  handleItem: (id: number, status: "add" | "remove") => void;
  editNote: ((id: number, description: string) => Promise<void>) | undefined;
};

const NoteBlock = ({
  id,
  text,
  remove,
  removeStatus,
  handleItem,
  checked,
  editNote,
}: Props) => {
  // chức năng sửa
  const newText = useRef({ before: text, after: text });
  const input = useRef<TextInput>(null);
  const [edit, setEdit] = useState(false);

  const handleEditNote = () => {
    if (editNote) {
      const description = newText.current.after;
      editNote(id, description).then(
        () => (newText.current.before = description)
      );
    }
  };

  // xử lý chức năng xóa / sửa
  const handleDropdown = async (type: number) => {
    if (type === 1) {
      Promise.all([
        Promise.resolve(remove(true)),
        Promise.resolve(handleItem(id, "add")),
      ]);
    } else if (type === 0) {
      setEdit(true);
    }
  };

  useEffect(() => {
    if (edit) setTimeout(() => input.current?.focus(), 100);
  }, [edit]);

  return (
    <View style={styles.box}>
      {removeStatus && (
        <>
          {!checked && (
            <TouchableWithoutFeedback onPress={() => handleItem(id, "add")}>
              <Icon type="Feather" name="circle" style={styles.chkbox} />
            </TouchableWithoutFeedback>
          )}
          {checked && (
            <TouchableWithoutFeedback onPress={() => handleItem(id, "remove")}>
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
        {!edit && <Text style={styles.text}>{newText.current.before}</Text>}
        {edit && (
          <View style={{ width: "100%" }}>
            <View style={[styles.inputcontainer, { backgroundColor: "#fff" }]}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <TextInput
                  ref={input}
                  defaultValue={newText.current.before}
                  onChangeText={(val) => (newText.current.after = val)}
                  multiline
                  style={styles.input}
                />
                <TouchableWithoutFeedback onPress={handleEditNote}>
                  <Icon
                    type="Ionicons"
                    name="paper-plane-outline"
                    style={styles.submit}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <Text style={styles.close} onPress={() => setEdit(false)}>
              HỦY
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    marginTop: 10,
  },
  chkbox: {
    fontSize: 22,
    color: borderColor,
    marginRight: 8,
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
  inputcontainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 40,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  submit: {
    fontSize: 22,
    padding: 12,
    height: 52,
    color: orangeColor,
  },
  icon: {
    marginLeft: 6,
    left: 6,
    fontSize: 22,
    padding: 6,
    color: "rgba(0, 0, 0, .5)",
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "SFProDisplay-Semibold",
    color: mainColorText,
  },
  date: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: "SFProDisplay-Regular",
    color: "rgba(0, 0, 0, .4)",
  },
  close: {
    paddingHorizontal: 12,
    marginTop: 4,
    fontFamily: "SFProDisplay-Medium",
    color: blueColor,
    textAlign: "right",
  },
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
});

export default NoteBlock;
