package t3h.hostelmanagementsystem.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomUtilityDTO {
    @NotNull(message = "ROOM_UTILITY_ROOM_ID_NULL")
    private Long roomId;

    @NotNull(message = "ROOM_UTILITY_UTILITY_ID_NULL")
    private Long utilityId;

    @NotNull(message = "ROOM_UTILITY_ROOM_NULL")
    private RoomDTO room;

    @NotNull(message = "ROOM_UTILITY_UTILITY_NULL")
    private UtilityDTO utility;
}