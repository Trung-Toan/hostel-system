import axios from "axios"
import { ROOM_UTILITY_API } from "../api/api"
import { useDataByUrl } from "../fetch/FetchData"

export const useGetUtilityUsedByRoom = (roomId) => {
  return useDataByUrl({
    url: ROOM_UTILITY_API.GET_UTILITY_USED_BY_ROOM(roomId),
    key: `utility_used_by_room_${roomId}`,
  })
}

export const getUtilityUsedByRoom = async(roomId) => {
    try {
        const response = await axios.get(ROOM_UTILITY_API.GET_UTILITY_USED_BY_ROOM(roomId));
        return response?.data;
    } catch (error) {
        throw error?.response?.data || "Error get utility used by room!";
    }
}