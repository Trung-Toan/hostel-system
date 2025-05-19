import axios from "axios";
import { ACCOUNT_API } from "../api/api";
import { useDataByUrl } from "../fetch/FetchData";

export const useGetAllUserExceptRole = (page, size, search, sort, direction, role) => {
    return useDataByUrl({
        url: ACCOUNT_API.GET_ALL_USER_EXCEPT_ROLE(page, size, search, sort, direction, role),
        key: `user_except_role_${page}_${size}_${search}_${sort}_${direction}_${role}`,
    });
}

export const useGetAllUserByRole = (page, size, search, sort, direction, role) => {
    return useDataByUrl({
        url: ACCOUNT_API.GET_ALL_USER_BY_ROLE(page, size, search, sort, direction, role),
        key: `user_by_role_${page}_${size}_${search}_${sort}_${direction}_${role}`,
    });
}

export const useGetAccountById = (userId) => {
    return useDataByUrl({
        url: ACCOUNT_API.GET_ACCOUNT_BY_ID(userId),
        key: `user_${userId}`,
    });
}

export const createAccount = async (account) => {
    try {
        const response = await axios.post(ACCOUNT_API.CREATE, { ...account });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Create account failed!" };
    }
}

export const updateAccount = async (accountId, account) => {
    try {
        const response = await axios.put(ACCOUNT_API.UPDATE(accountId), { ...account });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Update account failed!" };
    }
}

export const banAccount = async (accountId) => {
    try {
        const response = await axios.put(ACCOUNT_API.BAN_ACCOUNT(accountId));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Ban account failed!" };
    }
}

export const unbanAccount = async (accountId) => {
    try {
        const response = await axios.put(ACCOUNT_API.UNBAN_ACCOUNT(accountId));
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Unban account failed!" };
    }
}
