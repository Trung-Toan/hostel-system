import { UTILITY_API } from "../api/api"
import { useDataByUrl } from "../fetch/FetchData"

export const useGetAllUtility = () => {
    return useDataByUrl({
        url: UTILITY_API.GET_ALL,
        key: "utilities"
    })
}

export const useGetAllUtilityByStatus = (status) => {
    return useDataByUrl({
        url: UTILITY_API.GET_UTILITY_BY_STATUS(status),
        key: `utilities_status${status}`
    })
}