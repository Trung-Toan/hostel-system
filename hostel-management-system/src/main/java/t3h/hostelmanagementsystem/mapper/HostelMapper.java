package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.entity.User;

@Mapper(componentModel = "spring")
public interface HostelMapper {
    HostelDTO toHostelDTO(Hostel hostel);

    @InheritInverseConfiguration
    Hostel toHostel(HostelDTO hostelDTO);

    RoomDTO toRoomDTO(Room room);

    @InheritInverseConfiguration
    Room toRoom(RoomDTO roomDTO);

    UserDTO toUserDTO(User user);

    @InheritInverseConfiguration
    User toUser(UserDTO userDTO);
}
