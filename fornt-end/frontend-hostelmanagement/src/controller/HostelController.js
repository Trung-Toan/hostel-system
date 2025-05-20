import axios from "axios";
import { HOSTEL_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";

export const useGetHostelList = (page, size, search, sort, direction) => {
  return useDataByUrl({
    url: HOSTEL_API.VIEW(page, size, search, sort, direction),
    key: `hostels_${page}_${size}_${search}_${sort}_${direction}`,
  });
};

export const useGetAllHostel = () => {
  return useDataByUrl({
    url: HOSTEL_API.GETALL,
    key: `hostel`,
  });
}

export const useGetAllHostelByStatus = (status) => {
  return useDataByUrl({
    url: HOSTEL_API.GETALLBYSTATUS(status),
    key: `hostel_status_${status}`,
  });
}

export const useGetHostelById = (id) => {
  return useDataByUrl({
    url: HOSTEL_API.GETHOSTEL(id),
    key: `hostel_${id}`,
  });
};

export const createHostel = async (hostel) => {
  try {
    const response = await axios.post(HOSTEL_API.CREATE, {...hostel});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Create hostel failed!" };
  }
};

export const updateHostel = async (hostel) => {
  try {
    const response = await axios.put(HOSTEL_API.UPDATE, {...hostel});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Update hostel failed!" };
  }
};
