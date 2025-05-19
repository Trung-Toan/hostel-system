package t3h.hostelmanagementsystem.controller.user;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
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
    public ApiResponse<PagedModel<UserDTO>> getAllUserByRole(
            @PathVariable String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "id") String sort,
            @RequestParam(required = false, defaultValue = "ASC") String direction
    ) {
        Sort.Direction sortDirection = Sort.Direction.fromString(direction.toUpperCase());
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);

        ApiResponse<PagedModel<UserDTO>> apiResponse = new ApiResponse<>();
        Page<UserDTO> pageResult = userService.getAllUserByRoleByPage(role, search, pageable);
        PagedModel<UserDTO> pagedModel = new PagedModel<>(pageResult);
        apiResponse.setResult(pagedModel);
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

    @PutMapping("/ban-account/{userId}")
    public ApiResponse<UserDTO> banAccount(@PathVariable Long userId) {
        ApiResponse<UserDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.banAccount(userId));
        return apiResponse;
    }

    @PutMapping("/unban-account/{userId}")
    public ApiResponse<UserDTO> unBanAccount(@PathVariable Long userId) {
        ApiResponse<UserDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.unBanAccount(userId));
        return apiResponse;
    }
}
