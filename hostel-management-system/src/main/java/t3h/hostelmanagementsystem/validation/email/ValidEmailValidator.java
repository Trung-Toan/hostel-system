package t3h.hostelmanagementsystem.validation.email;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidEmailValidator implements ConstraintValidator<ValidEmail, String> {
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.trim().isEmpty()) {
            return false; // Để @NotBlank xử lý trường hợp này
        }
        return ValidEmailClass.isValidEmail(email);
    }
}
