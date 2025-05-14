package t3h.hostelmanagementsystem.controller.user;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/owner")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/get-all-user/except-role/{role}")
    public ApiResponse<List<UserDTO>> getAllUserExceptRole(@PathVariable String role) {
        ApiResponse<List<UserDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getAllUserExceptRole(role));
        return apiResponse;
    }

    @GetMapping("/get-all-user/by-role/{role}")
    public ApiResponse<List<UserDTO>> getAllUserByRole(
            @PathVariable String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "name") String sort,
            @RequestParam(required = false, defaultValue = "ASC") String direction
    ) {
        ApiResponse<List<UserDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getAllUserByRole(role));
        return apiResponse;
    }

    @PostMapping("/create-account")
    public ApiResponse<UserDTO> createUser(@RequestBody @Valid UserDTO userDTO) {
        ApiResponse<UserDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(userDTO));
        return apiResponse;
    }

    @PutMapping("/update-user/{userId}")
    public ApiResponse<UserDTO> updateUser(@PathVariable Long userId, @RequestBody @Valid UserDTO userDTO) {
        ApiResponse<UserDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateUser(userId, userDTO));
        return apiResponse;
    }

    @GetMapping("/get-user-by-id/{userId}")
    public ApiResponse<UserDTO> getUserById(@PathVariable Long userId) {
        ApiResponse<UserDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUserById(userId));
        return apiResponse;
    }
}
