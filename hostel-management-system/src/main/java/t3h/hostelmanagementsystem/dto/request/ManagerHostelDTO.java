package t3h.hostelmanagementsystem.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerHostelDTO {
    @NotNull(message = "MANAGER_ID_NULL")
    private Long managerId;

    @NotNull(message = "HOSTEL_ID_NULL")
    private Long hostelId;

    @NotNull(message = "START_DATE_BLANK")
    @PastOrPresent(message = "START_DATE_PAST_OR_PRESENT")
    private LocalDate startDate;

    @FutureOrPresent(message = "END_DATE_FUTURE_OR_PRESENT")
    private LocalDate endDate;
}
