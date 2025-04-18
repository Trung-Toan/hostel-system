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
}