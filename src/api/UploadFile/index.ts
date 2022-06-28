import { EditUserData, UserData } from "@/types/User";
import { Platform } from "react-native";
import instance from "../instance";
import FormData from "form-data";

export const uploadUserInfo = async (
  data: EditUserData,
  user: UserData,
  FileName?: string
) => {
  try {
    let newUser = user;
    let array: any = user.UserFiles;
    if (FileName) {
      if (!array) {
        array = [{ FileName, FileType: 0 }];
      } else {
        array = [...array, { FileName, FileType: 0 }];
      }
    }
    const params = { ...newUser, ...data, UserFiles: array };
    const res = await instance.put(`/medical-record/${user.Id}`, params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: string) => {
  try {
    if (file) {
      const fileSplit = file.split("/");
      let frmData = new FormData();
      frmData.append("file", {
        name: fileSplit[fileSplit.length - 1],
        uri: Platform.OS === "ios" ? file.replace("file://", "") : file,
        type: "image/jpeg",
      });
      const res = await instance.post("/base-file/upload-file", frmData);
      return res.data;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadMultipleFiles = async (fileArray: any[]) => {
  try {
    let frmData = new FormData();
    fileArray.forEach(({ uri, type }) => {
      const fileSplit: string[] = uri.split("/");
      const file = {
        name: fileSplit[fileSplit.length - 1],
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        type: "image/jpeg",
      };
      frmData.append("files", file);
    });
    // console.log(newFileArray);
    const res = await instance.post(
      "/base-file/upload-multiple-files",
      frmData
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
