package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private Long id;

    @NotNull(message = "INVOICE_ROOM_NULL")
    private RoomDTO room;

    @NotNull(message = "INVOICE_CUSTOMER_NULL")
    private UserDTO customer;

    @NotBlank(message = "INVOICE_MONTH_BLANK")
    @Size(min = 7, max = 7, message = "INVOICE_MONTH_FORMAT")
    private String month;

    @NotNull(message = "INVOICE_ROOM_PRICE_NULL")
    @Min(value = 0, message = "INVOICE_ROOM_PRICE_NON_NEGATIVE")
    private Double roomPrice;

    @NotNull(message = "INVOICE_ELECTRICITY_USAGE_NULL")
    @Min(value = 0, message = "INVOICE_ELECTRICITY_USAGE_NON_NEGATIVE")
    private Integer electricityUsage;

    @NotNull(message = "INVOICE_ELECTRICITY_PRICE_NULL")
    @Min(value = 0, message = "INVOICE_ELECTRICITY_PRICE_NON_NEGATIVE")
    private Double electricityPrice;

    @NotNull(message = "INVOICE_WATER_USAGE_NULL")
    @Min(value = 0, message = "INVOICE_WATER_USAGE_NON_NEGATIVE")
    private Integer waterUsage;

    @NotNull(message = "INVOICE_WATER_PRICE_NULL")
    @Min(value = 0, message = "INVOICE_WATER_PRICE_NON_NEGATIVE")
    private Double waterPrice;

    @NotNull(message = "INVOICE_UTILITY_FEE_NULL")
    @Min(value = 0, message = "INVOICE_UTILITY_FEE_NON_NEGATIVE")
    private Double utilityFee;

    @NotNull(message = "INVOICE_TOTAL_AMOUNT_NULL")
    @Min(value = 0, message = "INVOICE_TOTAL_AMOUNT_NON_NEGATIVE")
    private Double totalAmount;

    @NotNull(message = "INVOICE_STATUS_NULL")
    private Integer status;

    private LocalDateTime createdAt; // Không validate
    private LocalDateTime updatedAt; // Không validate
}