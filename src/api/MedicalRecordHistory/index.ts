import instance from "../instance";

export const getMedicalRecordHistory = async (params: {
  type: number;
  userId: number;
  medicalRecordId: number;
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const res = await instance.get("/medical-record-history", {
      params: { ...params, orderBy: "Id desc" },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addMedicalRecordHistory = async (params) => {
  try {
    const res = await instance.post("/medical-record-history", { ...params });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editMedicalRecordHistory = async (params) => {
  try {
    const res = await instance.put("/medical-record-history", { ...params });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeMedicalRecordHisory = async (params: number[]) => {
  try {
    const res = await instance.delete("/medical-record-history", {
      data: params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
