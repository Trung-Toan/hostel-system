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
public class RoomDTO {

    private Long id;

    @NotNull(message = "ROOM_CATEGORY_NULL")
    private CategoryDTO category;

    @NotBlank(message = "ROOM_NAME_BLANK")
    @Size(max = 255, message = "ROOM_NAME_SIZE")
    private String name; // Tên không trùng trong cùng hostel sẽ kiểm tra trong service

    @NotNull(message = "ROOM_PRICE_NULL")
    @Min(value = 0, message = "ROOM_PRICE_NON_NEGATIVE")
    private Double price;

    @NotNull(message = "ROOM_AREA_NULL")
    @Min(value = 1, message = "ROOM_AREA_MIN")
    private Integer area;

    @NotNull(message = "ROOM_MAX_OCCUPANTS_NULL")
    @Min(value = 1, message = "ROOM_MAX_OCCUPANTS_MIN")
    private Integer maxOccupants;

    @NotNull(message = "ROOM_CURRENT_OCCUPANTS_NULL")
    @Min(value = 0, message = "ROOM_CURRENT_OCCUPANTS_NON_NEGATIVE")
    private Integer currentOccupants;

    @Size(max = 1000, message = "ROOM_DESCRIPTION_SIZE")
    private String description;

    @NotNull(message = "ROOM_STATUS_NULL")
    private Integer status;

    private LocalDateTime createdAt; // Không validate
    private LocalDateTime updatedAt; // Không validate
}