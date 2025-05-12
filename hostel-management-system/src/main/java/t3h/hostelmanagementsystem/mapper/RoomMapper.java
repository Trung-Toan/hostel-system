package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.entity.Room;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(source = "hostel.id", target = "hostelId") // Ánh xạ hostel.id sang hostelId
    RoomDTO toRoomDTO(Room room);

    @Mapping(source = "hostelId", target = "hostel.id") // Ánh xạ ngược hostelId sang hostel.id
    Room toRoomEntity(RoomDTO roomDTO);

    RoomDTOResponse toRoomDTOResponse(Room room);
}