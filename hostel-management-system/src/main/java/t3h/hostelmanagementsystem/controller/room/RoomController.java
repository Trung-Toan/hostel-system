package t3h.hostelmanagementsystem.controller.room;

import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.service.room.RoomService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/owner")
public class RoomController {
    private final RoomService roomService;
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/view-room-by-hostel-id/{hostelId}")
    public ApiResponse<List<RoomDTOResponse>> getAllRoomByHostelId(@PathVariable Long hostelId) {
        ApiResponse<List<RoomDTOResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(roomService.getAllRoomByHostelId(hostelId));
        return apiResponse;
    }

    @PostMapping("/create-room/{hostelId}")
    public ApiResponse<RoomDTOResponse> createRoom(@PathVariable Long hostelId , @RequestBody RoomDTO roomDTO) {
        ApiResponse<RoomDTOResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(roomService.createRoom(hostelId, roomDTO));
        return apiResponse;
    }

    @PutMapping("/update-room/{roomId}")
    public ApiResponse<RoomDTOResponse> updateRoom(@PathVariable Long roomId , @RequestBody RoomDTO roomDTO) {
        ApiResponse<RoomDTOResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(roomService.updateRoom(roomId, roomDTO));
        return apiResponse;
    }
}
