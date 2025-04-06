package t3h.hostelmanagementsystem.controller.user;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.service.user.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class Register {
    private final UserService userService;

    public Register(UserService userService) {
        this.userService = userService;
    }


}
