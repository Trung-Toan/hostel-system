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
public class PostDTO {
    private Long id;

    private Long userId;

    @NotBlank(message = "POST_TITLE_BLANK")
    @Size(max = 255, message = "POST_TITLE_SIZE")
    private String title;

    @NotBlank(message = "POST_CONTENT_BLANK")
    @Size(max = 5000, message = "POST_CONTENT_SIZE")
    private String content;

    private String image;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}