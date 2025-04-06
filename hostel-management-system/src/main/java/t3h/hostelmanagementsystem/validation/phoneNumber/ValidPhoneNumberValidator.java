package t3h.hostelmanagementsystem.validation.phoneNumber;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidPhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        if (phone == null || phone.trim().isEmpty()) {
            return false; // Để @NotBlank xử lý trường hợp này
        }
        return ValidPhoneNumberClass.isValidPhoneNumber(phone);
    }
}