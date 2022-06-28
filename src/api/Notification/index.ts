import instance from "../instance";

export const getNotifications = async () => {
  try {
    const res = await instance.get("/notifications/get-current-notifications");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTotalNotifications = async () => {
  try {
    const res = await instance.get(
      "/notifications/get-total-notification-count"
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
