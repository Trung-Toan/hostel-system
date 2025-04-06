package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {
    @NotBlank(message = "LOGIN_BLANK")
    @Size(min = 3, max = 255, message = "LOGIN_SIZE")
    private String login; // Có thể là username hoặc email

    @NotBlank(message = "LOGIN_PASSWORD_BLANK")
    @Size(min = 6, max = 100, message = "LOGIN_PASSWORD_SIZE")
    private String password;
}