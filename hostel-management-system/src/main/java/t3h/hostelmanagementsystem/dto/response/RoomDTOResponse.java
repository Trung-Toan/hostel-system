package t3h.hostelmanagementsystem.dto.response;

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
public class RoomDTOResponse {
    private Long id;
    private String name;
    private Double price;
    private Integer area;
    private Integer maxOccupants;
    private Integer currentOccupants;
    private String description;
    private String image;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

