package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import t3h.hostelmanagementsystem.dto.request.RoomUtilityDTO;
import t3h.hostelmanagementsystem.entity.RoomUtility;

@Mapper(componentModel = "spring")
public interface RoomUtilityMapper {
    RoomUtilityDTO toDto(RoomUtility roomUtility);

    RoomUtility toEntity(RoomUtilityDTO roomUtilityDTO);
}
