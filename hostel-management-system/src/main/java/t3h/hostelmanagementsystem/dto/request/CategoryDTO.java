package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;

    @NotBlank(message = "CATEGORY_NAME_BLANK")
    @Size(max = 255, message = "CATEGORY_NAME_SIZE")
    private String name;

    @Size(max = 1000, message = "CATEGORY_DESCRIPTION_SIZE")
    private String description;

    @NotNull(message = "CATEGORY_STATUS")
    private Integer status;

    private LocalDateTime createdAt; // Không validate
    private LocalDateTime updatedAt; // Không validate
}