import instance from "../instance";
import { uploadFile } from "../UploadFile";

export const getFolder = async (userId: number) => {
  try {
    const res = await instance.get("/user-folder/get-paged-folder", {
      params: { userId, pageIndex: 1, pageSize: 10000, orderBy: "Id desc" },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addFolder = async (params: any) => {
  try {
    const res = await instance.post("/user-folder/add-new-user-folder", {
      ...params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFileInFolder = async (
  folderId: number,
  pageIndex: number,
  pageSize: number
) => {
  try {
    const res = await instance.get("/user-folder/get-user-file", {
      params: { folderId, orderBy: "Id desc", pageIndex, pageSize },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFileInFolderExtension = async (
  folderId: number,
  filterType: 0 | 1 | null,
  pageIndex: number,
  pageSize: number
) => {
  try {
    const res = await instance.get("/user-folder/get-user-file-extension", {
      params: { folderId, filterType, pageIndex, pageSize },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFileInFolder = async (params) => {
  try {
    const { uri, userId, folderId } = params;
    const fileName = await uploadFile(uri);
    const newParams = {
      fileName: fileName.Data,
      fileType: 7,
      folderId,
      userId,
      description: "",
      medicalRecordDetailId: null,
      medicalRecordId: null,
    };
    console.log(params);
    console.log(newParams);
    const res = await instance.post("/user-folder/upload-user-file", [
      newParams,
    ]);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
