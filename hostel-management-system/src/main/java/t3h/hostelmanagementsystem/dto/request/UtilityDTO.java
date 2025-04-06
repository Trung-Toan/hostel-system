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
public class UtilityDTO {
    private Long id;

    @NotBlank(message = "UTILITY_NAME_BLANK")
    @Size(max = 255, message = "UTILITY_NAME_SIZE")
    private String name;

    @Size(max = 1000, message = "UTILITY_DESCRIPTION_SIZE")
    private String description;

    @NotNull(message = "UTILITY_PRICE_NULL")
    @Min(value = 0, message = "UTILITY_PRICE_NON_NEGATIVE")
    private Double price;

    @NotNull(message = "UTILITY_STATUS_NULL")
    private Integer status;

    private LocalDateTime createdAt; // Không validate
    private LocalDateTime updatedAt; // Không validate
}