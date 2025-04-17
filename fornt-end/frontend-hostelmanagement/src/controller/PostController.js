import axios from "axios";
import { POST_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";


export const useGetPostById = (id) => {
  return useDataByUrl({
    url: POST_API.GETPOST(id),
    key: "post" + id,
  });
};


export const useGetPostList = () => {
  return useDataByUrl({
    url: POST_API.VIEW,
    key: "posts",
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

export const deletePost = async (id) => {
  if (!id) throw new Error("Post ID is required"); // Kiểm tra id trước khi gửi request
  try {
    const response = await axios.delete(POST_API.DELETE(id)); // Truyền id vào URL
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Delete post failed!" }; // Thông báo lỗi phù hợp
  }
};

export const updatePost = async (id, title, content, image, userId) => {
  try {
    const response = await axios.put(POST_API.UPDATE, {id, title, content, image, userId});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Update post failed!" };
  }
}

