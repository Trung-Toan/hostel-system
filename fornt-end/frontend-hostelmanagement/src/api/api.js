const API_URL = "http://localhost:8383";

export const USER_API = {
  LOGIN: `${API_URL}/login`,
  FINDEMAIL: `${API_URL}/find_email`,
  FORGOTPASSWORD:`${API_URL}/forgot_password`,
};

export const POST_API = {
  VIEW: `${API_URL}/post`,
  CREATE: `${API_URL}/create_post`,
  UPDATE: `${API_URL}/update_post`,
  DELETE: `${API_URL}/delete_post`
};

