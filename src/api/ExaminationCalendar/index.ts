import instance from "../instance";

export const getExaminationCalendar = async (
  pageIndex: number,
  pageSize: number,
  serviceTypeId?: number,
  status?: number
) => {
  try {
    const res = await instance.get("/examination-form/get-paged-data", {
      params: {
        serviceTypeId,
        status,
        pageIndex,
        pageSize,
        orderBy: "Id desc",
      },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUpcomingExaminationCalendar = async (
  pageIndex: number,
  pageSize: number
) => {
  try {
    const res = await instance.get(
      `/examination-form/get-paged-data?statusIds=0&statusIds=1&statusIds=2&statusIds=5&pageIndex=${pageIndex}&pageSize=${pageSize}&orderBy=Id desc`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getVaccineCalendar = async (
  pageIndex: number,
  pageSize: number
) => {
  try {
    const res = await instance.get(
      `/examination-form/get-paged-data?statusIds=6&statusIds=2&statusIds=5&ServiceTypeId=6&pageIndex=${pageIndex}&pageSize=${pageSize}&orderBy=Id desc`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
