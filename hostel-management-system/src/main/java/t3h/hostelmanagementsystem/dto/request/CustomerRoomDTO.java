package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRoomDTO {
    @NotNull(message = "CUSTOMER_ID_NULL")
    private Long customerId;

    @NotNull(message = "ROOM_ID_NULL")
    private Long roomId;

    @NotNull(message = "CUSTOMER_NULL")
    private UserDTO customer;

    @NotNull(message = "ROOM_NULL")
    private RoomDTO room;

    @NotNull(message = "START_DATE_BLANK")
    @PastOrPresent(message = "START_DATE_PAST_OR_PRESENT")
    private LocalDate startDate;

    @FutureOrPresent(message = "END_DATE_FUTURE_OR_PRESENT")
    private LocalDate endDate;

    @NotNull(message = "STATUS_NULL")
    private Integer status;
}