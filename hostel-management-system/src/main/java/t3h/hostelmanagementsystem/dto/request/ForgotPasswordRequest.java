package t3h.hostelmanagementsystem.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordRequest {
    @NotNull(message = "FORGOT_PASSWORD_USERID_NOT_NULL")
    private Long userId;

    @NotBlank(message = "USER_PASSWORD_BLANK")
    @Size(min = 6, message = "USER_PASSWORD_SIZE")
    private String password;

    @NotBlank(message = "USER_PASSWORD_BLANK")
    @Size(min = 6, message = "USER_PASSWORD_SIZE")
    private String rePassword;
}
