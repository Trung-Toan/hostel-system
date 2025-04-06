package t3h.hostelmanagementsystem.validation.email;

public class ValidEmailClass {
    public static boolean isValidEmail(String email) {
        String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

        // Kiểm tra regex cơ bản
        if (!email.matches(regex)) {
            return false;
        }

        // Chỉ cho phép một số tên miền phổ biến
        String[] allowedDomains = { "gmail.com", "yahoo.com", "outlook.com", "example.vn" };
        String domain = email.substring(email.indexOf("@") + 1);

        for (String allowed : allowedDomains) {
            if (domain.equalsIgnoreCase(allowed)) {
                return true;
            }
        }

        return false;
    }
}
