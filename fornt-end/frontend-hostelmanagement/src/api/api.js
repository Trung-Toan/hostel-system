const API_URL = "http://localhost:8383";


// api for user
export const USER_API = {
  LOGIN: `${API_URL}/login`,
  FINDEMAIL: `${API_URL}/find_email`,
  FORGOTPASSWORD:`${API_URL}/forgot_password`,
};

// api for manager

export const POST_API = {
  VIEW: `${API_URL}/manager/post`,
  CREATE: `${API_URL}/manager/create-post`,
  UPDATE: `${API_URL}/update-post`,
  DELETE: (id) => `${API_URL}/manager/delete-post/${id}`,
  GETPOST: (id) => `${API_URL}/manager/get-post-by-id/${id}`,
}

// api for owner
export const HOSTEL_API = {
  VIEW: (page, size, search, sort, direction) => `${API_URL}/owner/get-all-hostel-paged?page=${page}&size=${size}&search=${search}&sort=${sort}&direction=${direction}`,
  CREATE: `${API_URL}/owner/create-hostel`,
  UPDATE: `${API_URL}/owner/update-hostel`,
  GETHOSTEL: (id) => `${API_URL}/owner/get-hostel-by-id/${id}`,
  GETALL: `${API_URL}/owner/get-all-hostel`,
}

export const ROOM_API = {
  VIEW_ROOM_BY_HOSTEL_ID: (hostelId) => `${API_URL}/owner/view-room-by-hostel-id/${hostelId}`,
  CREATE_ROOM: (hostelId) => `${API_URL}/owner/create-room/${hostelId}`,
  UPDATE: (roomId) => `${API_URL}/owner/update-room/${roomId}`,
}

// api for owner and manager
export const UTILITY_API = {
  GET_ALL: (search, sort, direction) => `${API_URL}/manager/get-all-utility?search=${search}&sort=${sort}&direction=${direction}`,
  GET_UTILITY_BY_STATUS: (status) => `${API_URL}/manager/get-utility-by-status/${status}`,
  CREATE_UTILITY: `${API_URL}/manager/create-utility`,
  UPDATE_UTILITY: (utilityId) => `${API_URL}/manager/update-utility/${utilityId}`,
  GET_UTILITY_BY_ID: (utilityId) => `${API_URL}/manager/get-utility-by-id/${utilityId}`,
}

export const ROOM_UTILITY_API = {
  GET_UTILITY_USED_BY_ROOM: (roomId) => `${API_URL}/owner/get-room-utility/used-by-room/${roomId}`,
} 

export const ACCOUNT_API = {
  GET_ALL_USER_EXCEPT_ROLE: (page, size, search, sort, direction, role) => `${API_URL}/owner/get-all-user/except-role/${role}?page=${page}&size=${size}&search=${search}&sort=${sort}&direction=${direction}`,
  GET_ALL_USER_BY_ROLE: (page, size, search, sort, direction, role) => `${API_URL}/owner/get-all-user/by-role/${role}?page=${page}&size=${size}&search=${search}&sort=${sort}&direction=${direction}`,
  CREATE: `${API_URL}/owner/create-account`,
  UPDATE: (accountId) => `${API_URL}/owner/update-user/${accountId}`,
  GET_ACCOUNT_BY_ID: (userId) => `${API_URL}/owner/get-user-by-id/${userId}`,
  BAN_ACCOUNT: (accountId) => `${API_URL}/owner/ban-account/${accountId}`,
  UNBAN_ACCOUNT: (accountId) => `${API_URL}/owner/unban-account/${accountId}`,
}