import instance from "../instance";

export const getNewFeed = async (params: {
  pageIndex: number;
  pageSize: number;
}) => {
  try {
    const res = await instance.get("/new-feed", {
      params: { ...params, orderBy: "Id desc" },
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getNewFeedDetail = async (id: number) => {
  try {
    const res = await instance.get(`/new-feed/${id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
