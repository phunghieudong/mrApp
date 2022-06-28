import instance from "../instance";
import { uploadMultipleFiles } from "../UploadFile";

export const getMedicalBills = async (pageIndex: number, pageSize: number) => {
  try {
    const res = await instance.get(
      `/examination-form/get-paged-data?&statusIds=2&statusIds=4&pageIndex=${pageIndex}&pageSize=${pageSize}&orderBy=Id desc`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllMedicalRecord = async (
  userId: number,
  medicalRecordId: number,
  pageIndex: number,
  pageSize: number
) => {
  try {
    const res = await instance.get(
      "/medical-record-detail/get-paged-list-record-detail",
      { params: { userId, medicalRecordId, pageIndex, pageSize } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMedicalRecordDetail = async (recordDetailId: number) => {
  try {
    const res = await instance.get(
      `/medical-record-detail/get-record-detail-info/${recordDetailId}`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadMedicalRecordDetailMultipleFiles = async (
  medicalRecordDetailId: number,
  fileArray: any[]
) => {
  try {
    const { Data } = (await uploadMultipleFiles(fileArray)) as any;
    const newFileArray = fileArray.map(
      ({ fileType, userId, medicalRecordId, folderId }, index) => {
        return {
          fileType,
          userId,
          medicalRecordId,
          folderId,
          medicalRecordDetailId,
          fileName: Data[index],
        };
      }
    );
    console.log(newFileArray);
    const res = await instance.post(
      `/medical-record-detail/update-medical-record-detail-multiple-files/${medicalRecordDetailId}`,
      {
        medicalRecordDetailId,
        userFiles: newFileArray,
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateNote = async (
  medicalRecordDetailId: number,
  note: string
) => {
  try {
    const res = await instance.post("/medical-record-detail/update-note", {
      medicalRecordDetailId,
      note,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
