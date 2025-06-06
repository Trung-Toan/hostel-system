package t3h.hostelmanagementsystem.service.room;

import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.entity.Room;

import java.util.List;

public interface RoomService {
    RoomDTOResponse createRoom(Long hostelId, RoomDTO roomDTO);

    RoomDTO getRoomById(Long roomId);

    Room findRoomById(Long roomId);

    List<RoomDTOResponse> getAllRoomByHostelId(Long hostelId);

    RoomDTOResponse updateRoom(Long roomId, RoomDTO roomDTO);
}
