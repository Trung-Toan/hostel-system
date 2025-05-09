package t3h.hostelmanagementsystem.controller.roomUtility;

import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.RoomUtilityDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.RoomUtility.RoomUtilityService;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/owner")
public class RoomUtilityController {
    private final RoomUtilityService roomUtilityService;
    public RoomUtilityController(RoomUtilityService roomUtilityService) {
        this.roomUtilityService = roomUtilityService;
    }

    @GetMapping("/room-utility/get-utility-used/{roomId}")
    public ApiResponse<List<RoomUtilityDTO>> getUtilityUsed(@PathVariable Long roomId) {
        ApiResponse<List<RoomUtilityDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(roomUtilityService.getUtilityUsedByRoom(roomId));
        return apiResponse;
    }
}
