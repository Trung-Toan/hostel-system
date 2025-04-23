package t3h.hostelmanagementsystem.dto.request;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HostelDTO {
    private Long id;

    @NotBlank(message = "HOSTEL_NAME_BLANK")
    @Size(max = 255, message = "HOSTEL_NAME_SIZE")
    private String name;

    @NotBlank(message = "HOSTEL_ADDRESS_BLANK")
    @Size(max = 500, message = "HOSTEL_ADDRESS_SIZE")
    private String address;

    @Size(max = 1000, message = "HOSTEL_DESCRIPTION_SIZE")
    private String description;

    @NotNull(message = "HOSTEL_OWNER_NULL")
    private UserDTO owner;

    private UserDTO manager; // Manager có thể null

    private String image;

    @NotNull(message = "HOSTEL_STATUS_NULL")
    private Integer status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}