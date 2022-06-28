import instance from "../instance";

export const getAllergyNote = async (params: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const res = await instance.get("/user-allergy", {
      params: { ...params, orderBy: "Id desc" },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addNewAllergy = async (params: {
  description: string;
  allergyTypeId: number;
  allergyTypeName: string;
  fromDate?: Date;
  toDate?: Date;
}) => {
  try {
    const res = await instance.post("/user-allergy", params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeAllergys = async (params: number[]) => {
  try {
    const res = await instance.delete("/user-allergy/delete-multiples", {
      data: params,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editAllergy = async (
  id: number,
  params: {
    description: string;
    allergyTypeId: number;
    allergyTypeName: string;
    fromDate?: Date;
    toDate?: Date;
  }
) => {
  try {
    const res = await instance.put(`/user-allergy/${id}`, params);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
