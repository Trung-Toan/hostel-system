import axios from "axios";
import { ROOM_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";

export const useGetRoomByHostelId = (hostelId) => {
    return useDataByUrl({
        url: ROOM_API.VIEW_ROOM_BY_HOSTEL_ID(hostelId),
        key: `rooms_hid${hostelId}`,
    })
}

export const createNewRoomAtHostelId = async(hostelId, data) => {
    try{
        const response = await axios.post(ROOM_API.CREATE_ROOM(hostelId), {...data});
        console.log("sucess" + response.data);
    return response.data;
    } catch (error) {
        throw error?.response?.data || "Error add new room!";
    }
}

export const updateRoom = async (roomId, data) => {
    try {
        const response = await axios.put(ROOM_API.UPDATE(roomId), { ...data });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Error updating room!";
    }
}