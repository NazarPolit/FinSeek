import axios from "axios";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7002/api/";

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const confirmEmailAPI = async (userId: string, token: string) => {
  try {
    const response = await axios.post(
      api + `account/confirm-email?userId=${userId}&token=${encodeURIComponent(token)}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const resendConfirmationAPI = async (email: string) => {
  return await axios.post(api + `account/resend-confirmation?email=${encodeURIComponent(email)}`);
};