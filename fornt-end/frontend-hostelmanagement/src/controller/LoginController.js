import axios from "axios";
import { USER_API } from "../api/api";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(USER_API.LOGIN, {
      login: username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed!" };
  }
};

export const findEmail = async (email) => {
  try {
    const response = await axios.post(USER_API.FINDEMAIL, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Find email failed!" };
  }
};

export const forgotPassword = async (userId, password, rePassword) => {
  try {
    const response = await axios.put(USER_API.FORGOTPASSWORD, {
      userId,
      password,
      rePassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Find email failed!" };
  }
};


