package t3h.hostelmanagementsystem.validation.phoneNumber;

public class ValidPhoneNumberClass {
    public static boolean isValidPhoneNumber(String phone) {
        String regex = "^(?:\\+84|84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])\\d{7}$";

        // Kiểm tra regex
        if (!phone.matches(regex)) {
            return false;
        }

        // Chặn các số quá đơn giản
        String[] invalidNumbers = {
                "0123456789", "1234567890", "0000000000", "1111111111", "2222222222",
                "3333333333", "4444444444", "5555555555", "6666666666", "7777777777",
                "8888888888", "9999999999"
        };

        for (String invalid : invalidNumbers) {
            if (phone.endsWith(invalid)) {
                return false;
            }
        }

        return true;
    }

}
