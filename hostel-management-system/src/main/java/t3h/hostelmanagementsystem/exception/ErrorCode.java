package t3h.hostelmanagementsystem.exception;

public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(99999, "Uncategorized Exception"),
    USER_LOGIN(40000, "Invalid username or password"),
    USER_EXISTED(40001, "User already existed"),
    USER_NOT_FOUND(40002, "User not found"),
    FORGOT_PASSWORD_USERID_NOT_NULL(40003, "Forgot Password User Id Not Null"),
    PASSWORD_NOT_MATCH_REPASSWORD(40004, "Password not math RePassword"),

    // valid error
    INVALID_KEY(50000, "Invalid key"),

    //category errors
    CATEGORY_NAME_BLANK(50101, "Category name cannot be blank"),
    CATEGORY_NAME_SIZE(50102, "Category name cannot exceed 255 characters"),
    CATEGORY_DESCRIPTION_SIZE(50103, "Category description cannot exceed 1000 characters"),
    CATEGORY_STATUS(50104, "Status cannot be null"),

    // customer room errors
    START_DATE_BLANK(50201, "Start date cannot be null"),
    START_DATE_PAST_OR_PRESENT(50202, "Start date must be in the past or present"),
    END_DATE_FUTURE_OR_PRESENT(50203, "End date must be in the present or future"),
    CUSTOMER_ID_NULL(50204, "Customer ID cannot be null"),
    ROOM_ID_NULL(50205, "Room ID cannot be null"),
    CUSTOMER_NULL(50206, "Customer cannot be null"),
    ROOM_NULL(50207, "Room cannot be null"),
    STATUS_NULL(50208, "Status cannot be null"),

    // HostelDTO errors
    HOSTEL_NOT_FOUND(50301, "Hotel not found"),
    HOSTEL_NAME_BLANK(50302, "Name cannot be blank"),
    HOSTEL_NAME_SIZE(50303, "Name cannot exceed 255 characters"),
    HOSTEL_ADDRESS_BLANK(50304, "Address cannot be blank"),
    HOSTEL_ADDRESS_SIZE(50305, "Address cannot exceed 500 characters"),
    HOSTEL_DESCRIPTION_SIZE(50306, "Description cannot exceed 1000 characters"),
    HOSTEL_OWNER_NULL(50307, "Owner cannot be null"),
    HOSTEL_STATUS_NULL(50308, "Status cannot be null"),
    HOSTEL_EXISTED(50309, "Hostel name already exists"),

    // InvoiceDTO errors
    INVOICE_ROOM_NULL(50402, "Room cannot be null"),
    INVOICE_CUSTOMER_NULL(50403, "Customer cannot be null"),
    INVOICE_MONTH_BLANK(50404, "Month cannot be blank"),
    INVOICE_MONTH_FORMAT(50405, "Month must be in format 'YYYY-MM'"),
    INVOICE_ROOM_PRICE_NULL(50406, "Room price cannot be null"),
    INVOICE_ROOM_PRICE_NON_NEGATIVE(50407, "Room price must be non-negative"),
    INVOICE_ELECTRICITY_USAGE_NULL(50408, "Electricity usage cannot be null"),
    INVOICE_ELECTRICITY_USAGE_NON_NEGATIVE(50409, "Electricity usage cannot be negative"),
    INVOICE_ELECTRICITY_PRICE_NULL(50410, "Electricity price cannot be null"),
    INVOICE_ELECTRICITY_PRICE_NON_NEGATIVE(50411, "Electricity price must be non-negative"),
    INVOICE_WATER_USAGE_NULL(50412, "Water usage cannot be null"),
    INVOICE_WATER_USAGE_NON_NEGATIVE(50413, "Water usage cannot be negative"),
    INVOICE_WATER_PRICE_NULL(50414, "Water price cannot be null"),
    INVOICE_WATER_PRICE_NON_NEGATIVE(50415, "Water price must be non-negative"),
    INVOICE_UTILITY_FEE_NULL(50416, "Utility fee cannot be null"),
    INVOICE_UTILITY_FEE_NON_NEGATIVE(50417, "Utility fee must be non-negative"),
    INVOICE_TOTAL_AMOUNT_NULL(50418, "Total amount cannot be null"),
    INVOICE_TOTAL_AMOUNT_NON_NEGATIVE(50419, "Total amount must be non-negative"),
    INVOICE_STATUS_NULL(50420, "Status cannot be null"),

    // LoginRequestDTO errors
    LOGIN_BLANK(50502, "Username or email cannot be blank"),
    LOGIN_SIZE(50503, "Username or email must be between 3 and 255 characters"),
    LOGIN_PASSWORD_BLANK(50504, "Password cannot be blank"),
    LOGIN_PASSWORD_SIZE(50505, "Password must be between 6 and 100 characters"),

    // PostDTO errors
    POST_ID_NULL(50600, "PostId cannot be null"),
    POST_NOT_FOUND(50601, "Post is not found"),
    POST_USER_NULL(50602, "User cannot be null"),
    POST_HOSTEL_NULL(50603, "Hostel cannot be null"),
    POST_TITLE_BLANK(50604, "Title cannot be blank"),
    POST_TITLE_SIZE(50605, "Title cannot exceed 255 characters"),
    POST_CONTENT_BLANK(50606, "Content cannot be blank"),
    POST_CONTENT_SIZE(50607, "Content cannot exceed 5000 characters"),
    POST_STATUS_NULL(50608, "Status cannot be null"),

    // RoomDTO errors
    ROOM_CATEGORY_NULL(50702, "Category cannot be null"),
    ROOM_NAME_BLANK(50703, "Name cannot be blank"),
    ROOM_NAME_SIZE(50704, "Name cannot exceed 255 characters"),
    ROOM_PRICE_NULL(50705, "Price cannot be null"),
    ROOM_PRICE_NON_NEGATIVE(50706, "Price must be non-negative"),
    ROOM_AREA_NULL(50707, "Area cannot be null"),
    ROOM_AREA_MIN(50708, "Area must be greater than 0"),
    ROOM_MAX_OCCUPANTS_NULL(50709, "Max occupants cannot be null"),
    ROOM_MAX_OCCUPANTS_MIN(50710, "Max occupants must be at least 1"),
    ROOM_CURRENT_OCCUPANTS_NULL(50711, "Current occupants cannot be null"),
    ROOM_CURRENT_OCCUPANTS_NON_NEGATIVE(50712, "Current occupants cannot be negative"),
    ROOM_DESCRIPTION_SIZE(50713, "Description cannot exceed 1000 characters"),
    ROOM_STATUS_NULL(50714, "Status cannot be null"),

    // RoomUtilityDTO errors
    ROOM_UTILITY_ROOM_ID_NULL(50802, "Room ID cannot be null"),
    ROOM_UTILITY_UTILITY_ID_NULL(50803, "Utility ID cannot be null"),
    ROOM_UTILITY_ROOM_NULL(50804, "Room cannot be null"),
    ROOM_UTILITY_UTILITY_NULL(50805, "Utility cannot be null"),
    ROOM_EXISTED(50806, "Room name already existed"),
    ROOM_NOT_FOUND(50807, "Room is not found"),

    // UserDTO errors
    USER_FULL_NAME_SIZE(50902, "Full name cannot exceed 255 characters"),
    USER_USERNAME_BLANK(50903, "Username cannot be blank"),
    USER_USERNAME_SIZE(50904, "Username must be between 3 and 50 characters"),
    USER_EMAIL_BLANK(50905, "Email cannot be blank"),
    USER_EMAIL_VALID_DOMAINS(50906, "Email must be valid and from allowed domains (gmail.com, yahoo.com, outlook.com, example.vn)"),
    USER_EMAIL_VALID(50907, "Email must be valid"),
    USER_PHONE_NUMBER_BLANK(50908, "Phone number cannot be blank"),
    USER_PHONE_NUMBER_VALID(50909, "Phone number must be a valid Vietnamese format (e.g., +84123456789)"),
    USER_PASSWORD_BLANK(50910, "Password cannot be blank"),
    USER_PASSWORD_SIZE(50911, "Password must be at least 6 characters"),
    USER_DOB_NULL(50912, "Date of birth cannot be null"),
    USER_DOB_PAST(50913, "Date of birth must be in the past"),
    USER_DOB_MIN_AGE(50914, "User must be at least 16 years old"),
    USER_ADDRESS_SIZE(50915, "Address cannot exceed 500 characters"),
    USER_AVATAR_SIZE(50916, "Avatar URL cannot exceed 255 characters"),
    USER_ROLE_BLANK(50917, "Role cannot be blank"),
    USER_ROLE_INVALID(50918, "Role must be 'customer', 'manager', or 'owner'"),
    USER_STATUS_NULL(50919, "Status cannot be null"),

    // UtilityDTO errors
    UTILITY_NAME_BLANK(51002, "Name cannot be blank"),
    UTILITY_NAME_SIZE(51003, "Name cannot exceed 255 characters"),
    UTILITY_DESCRIPTION_SIZE(51004, "Description cannot exceed 1000 characters"),
    UTILITY_PRICE_NULL(51005, "Price cannot be null"),
    UTILITY_PRICE_NON_NEGATIVE(51006, "Price must be non-negative"),
    UTILITY_STATUS_NULL(51007, "Status cannot be null"),

    ;
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
