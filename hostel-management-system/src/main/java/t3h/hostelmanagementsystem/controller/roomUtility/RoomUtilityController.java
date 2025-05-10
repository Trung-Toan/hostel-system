package t3h.hostelmanagementsystem.controller.roomUtility;

import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.RoomUtilityDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.RoomUtility.RoomUtilityService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/owner")
public class RoomUtilityController {
    private final RoomUtilityService roomUtilityService;
    public RoomUtilityController(RoomUtilityService roomUtilityService) {
        this.roomUtilityService = roomUtilityService;
    }

    @GetMapping("/get-room-utility/used-by-room/{roomId}")
    public ApiResponse<List<Long>> getUtilityUsedByRoom(@PathVariable Long roomId) {
        ApiResponse<List<Long>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(roomUtilityService.getUtilityUsedByRoom(roomId));
        return apiResponse;
    }
}
