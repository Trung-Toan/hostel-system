package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.entity.Room;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "utilities", ignore = true)
    RoomDTO toRoomDTO(Room room);

    @Mapping(target = "hostel", ignore = true)
    Room toRoomEntity(RoomDTO roomDTO);

    RoomDTOResponse toRoomDTOResponse(Room room);
}