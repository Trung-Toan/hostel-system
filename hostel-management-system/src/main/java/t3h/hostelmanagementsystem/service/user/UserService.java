package t3h.hostelmanagementsystem.service.user;

import t3h.hostelmanagementsystem.dto.request.ForgotPasswordRequest;
import t3h.hostelmanagementsystem.dto.request.LoginRequestDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO loginByAccount(LoginRequestDTO loginRequest);

    UserDTO createUser(UserDTO userDTO);

    UserDTO findUserByEmail(String email);

    UserDTO forgotPassword(ForgotPasswordRequest request);

    List<UserDTO> getAllUserExceptRole(String role);

    List<UserDTO> getAllUserByRole(String role);

    UserDTO updateUser(Long userId, UserDTO userDTO);

    UserDTO getUserById(Long userId);
}