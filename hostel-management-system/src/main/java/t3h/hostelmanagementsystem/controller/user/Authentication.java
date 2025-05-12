package t3h.hostelmanagementsystem.controller.user;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.ForgotPasswordRequest;
import t3h.hostelmanagementsystem.dto.request.LoginRequestDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.service.user.UserService;

import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class Authentication {
    private final UserService userService;

    public Authentication(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ApiResponse<UserDTO> login(@RequestBody @Valid LoginRequestDTO loginRequestDTO) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(userService.loginByAccount(loginRequestDTO));
        return apiResponse;
    }

    @PostMapping("/find_email")
    public ApiResponse<UserDTO> findUserByEmail(@RequestBody Map<String, String> request) {
        ApiResponse apiResponse = new ApiResponse();
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            throw new AppException(ErrorCode.USER_EMAIL_BLANK);
        }
        apiResponse.setResult(userService.findUserByEmail(email));
        return apiResponse;
    }

    @PutMapping("/forgot_password")
    public ApiResponse<UserDTO> forgotPassword(@RequestBody @Valid ForgotPasswordRequest request) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(userService.forgotPassword(request));
        return apiResponse;
    }
}
