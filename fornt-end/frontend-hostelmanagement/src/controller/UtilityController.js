import axios from "axios"
import { UTILITY_API } from "../api/api"
import { useDataByUrl } from "../fetch/FetchData"

export const useGetAllUtility = (filter) => {
    return useDataByUrl({
        url: UTILITY_API.GET_ALL(filter?.search.trim().replace(/\s+/g, ' '), filter?.sort, filter?.direction),
        key: `utilities_search${filter?.search}_sort${filter?.sort}_direction${filter?.direction}`
    })
}

export const useGetAllUtilityByStatus = (status) => {
    return useDataByUrl({
        url: UTILITY_API.GET_UTILITY_BY_STATUS(status),
        key: `utilities_status${status}`
    })
}

export const createUtility = async (data) => {
    try {
        const response = await axios.post(UTILITY_API.CREATE_UTILITY, { ...data });
        return response.data;
    } catch (error) {
        throw error?.response?.data || "Error create utility!";
    }
}

export const updateUtility = async (utilityId, data) => {
    try {
        const response = await axios.put(UTILITY_API.UPDATE_UTILITY(utilityId), { ...data });
        return response.data;
    } catch (error) {
        throw error?.response?.data || "Error update utility!";
    }
}
export const useGetUtilityById = (utilityId) => {
    const enabled = !!utilityId;
    return useDataByUrl({
        url: enabled ? UTILITY_API.GET_UTILITY_BY_ID(utilityId) : null,
        key: `utility_id${utilityId}`,
        enabled,
    })
}
