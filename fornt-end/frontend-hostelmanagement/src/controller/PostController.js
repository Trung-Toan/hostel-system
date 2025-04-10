import axios from "axios";
import { POST_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";

export const useGetPostList = () => {
  return useDataByUrl({
    url: POST_API.VIEW,
    key: "ports",
  });
};


export const createPost = async (userId, title, content, image) => {
  try {
    const response = await axios.post(POST_API.CREATE, {userId, title, content, image});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Create post failed!" };
  }
};

