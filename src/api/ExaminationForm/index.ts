import instance from "../instance";

export const getTechniques = async (hospitalId: number) => {
  try {
    const res = await instance.get(
      `/examination-form/get-specialist-type-by-date/${hospitalId}`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getExaminationSchedules = async (
  hospitalId: number,
  doctorId: number | undefined,
  specialistTypeId: number | undefined,
  examinationDate: Date | undefined,
  orderBy: string = "Id desc",
  pageIndex: number = 1,
  pageSize: number = 1000
) => {
  try {
    const res = await instance.get(
      "/examination-form/get-all-examination-schedules",
      {
        params: {
          hospitalId,
          doctorId,
          specialistTypeId,
          examinationDate,
          pageIndex,
          pageSize,
          orderBy,
        },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTimeSchedules = async (
  hospitalId: number,
  doctorId: number,
  examinationDate: Date
) => {
  try {
    const res = await instance.get(
      "/examination-form/get-config-time-examination-by-specialist-type",
      {
        params: {
          hospitalId,
          doctorId,
          examinationDate,
        },
      }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const schedule = async (params) => {
  try {
    const res = await instance.post("/examination-form", params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePayment = async (params) => {
  try {
    const res = await instance.post(
      "/examination-form/update-examination-status",
      params
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removePayment = async (id: number) => {
  try {
    const res = await instance.delete(`/examination-form/${id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getFee = async (params) => {
  try {
    const res = await instance.get(
      "/examination-form/get-caculate-fee-response",
      { params }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDoctors = async (
  pageIndex: number,
  pageSize: number,
  hospitalId: number,
  specialistTypeId: number,
  gender?: number,
  degreeTypeId?: number,
  searchContent?: string
) => {
  try {
    const res = await instance.get("/examination-form/get-doctor-examination", {
      params: {
        hospitalId,
        specialistTypeId,
        pageIndex,
        pageSize,
        gender,
        degreeTypeId,
        searchContent,
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getLastestExamination = async () => {
  try {
    const res = await instance.get(
      "/examination-form/get-latest-user-examination"
    );
    return res.data;
  } catch (error) {
    return Promise.reject();
  }
};

export const getExaminationFormHistory = async (params: {
  hospitalId?: number;
  examinationDate?: Date;
  statusIds: number;
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const res = await instance.get(
      "/examination-form/get-examination-form-history",
      { params: { ...params, orderBy: "Id desc" } }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
