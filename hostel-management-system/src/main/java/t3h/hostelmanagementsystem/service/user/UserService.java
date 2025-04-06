package t3h.hostelmanagementsystem.service.user;

import t3h.hostelmanagementsystem.dto.request.ForgotPasswordRequest;
import t3h.hostelmanagementsystem.dto.request.LoginRequestDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;

public interface UserService {
    UserDTO loginByAccount(LoginRequestDTO loginRequest);
    UserDTO createUser(UserDTO userDTO);
    UserDTO findUserByEmail(String email);
    UserDTO forgotPassword(ForgotPasswordRequest request);
}