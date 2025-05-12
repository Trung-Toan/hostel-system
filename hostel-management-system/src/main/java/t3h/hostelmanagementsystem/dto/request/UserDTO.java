package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.*;
import t3h.hostelmanagementsystem.validation.email.ValidEmail;
import t3h.hostelmanagementsystem.validation.phoneNumber.ValidPhoneNumber;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;

    @Size(max = 255, message = "USER_FULL_NAME_SIZE")
    private String fullName;

    @NotBlank(message = "USER_USERNAME_BLANK")
    @Size(min = 3, max = 50, message = "USER_USERNAME_SIZE")
    private String username;

    @NotBlank(message = "USER_EMAIL_BLANK")
    @ValidEmail
    @Email(message = "USER_EMAIL_VALID")
    private String email;

    @NotBlank(message = "USER_PHONE_NUMBER_BLANK")
    @ValidPhoneNumber
    private String phoneNumber;

    @NotBlank(message = "USER_PASSWORD_BLANK")
    @Size(min = 6, message = "USER_PASSWORD_SIZE")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{6,}$",
            message = "USER_PASSWORD_WEAK"
    )
    private String password;

    @NotNull(message = "USER_DOB_NULL")
    @Past(message = "USER_DOB_PAST")
    private LocalDate dob;

    @AssertTrue(message = "USER_DOB_MIN_AGE")
    public boolean isDobValid() {
        return dob != null && LocalDate.now().minusYears(16).isAfter(dob);
    }

    @Size(max = 500, message = "USER_ADDRESS_SIZE")
    private String address;

    @Size(max = 255, message = "USER_AVATAR_SIZE")
    private String avatar;

    @NotBlank(message = "USER_ROLE_BLANK")
    @Pattern(regexp = "customer|manager|owner", message = "USER_ROLE_INVALID")
    private String role;

    @NotNull(message = "USER_STATUS_NULL")
    private Integer status;

    private Long hostelId;

    private Long roomId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}