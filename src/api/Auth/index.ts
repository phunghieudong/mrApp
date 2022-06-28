import { RegisterData, SignInData } from "@/types/Auth";
import instance from "../instance";

export const signIn = async (data: SignInData) => {
  try {
    const res = await instance.post("/authenticate/login", data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registerUser = async (data: RegisterData) => {
  try {
    const res = await instance.post("/authenticate/app-register", { ...data });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async () => {
  try {
    const res = await instance.get("/medical-record/get-medical-record-info");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOTPEmail = async (email: string) => {
  try {
    const res = await instance.get(`/authenticate/get-otp-code-email/${email}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOTPPhone = async (phoneNumber: string) => {
  try {
    const res = await instance.get(`/authenticate/get-otp-code/${phoneNumber}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkOTPEmail = async (email: string, otpValue: string) => {
  try {
    const res = await instance.post(
      `/authenticate/send-otp-email-forget-password/${email}/${otpValue}`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkOTPPhone = async (phoneNumber: string, otpValue: string) => {
  try {
    const res = await instance.post(
      `/authenticate/send-otp-forget-password/${phoneNumber}/${otpValue}`
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createNewPassword = async (
  newPassword: string,
  confirmPassword
) => {
  try {
    const res = await instance.post(
      "/authenticate/change-password-by-confirm-otp",
      { newPassword, confirmPassword }
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
