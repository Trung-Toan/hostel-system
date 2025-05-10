package t3h.hostelmanagementsystem.service.RoomUtility;

import t3h.hostelmanagementsystem.dto.request.RoomUtilityDTO;
import t3h.hostelmanagementsystem.entity.Room;

import java.util.List;

public interface RoomUtilityService {

    /**
     * add new room utility
     * @param utilityIdList list id utility
     * @param room room use utilityIdList
     * @return list RoomUtility after add success else return null
     */
    List<RoomUtilityDTO> addNew(List<Long> utilityIdList, Room room);

    /**
     * remove all RoomUtility by roomId
     * @param roomId roomId need to remove
     */
    void deleteRoomUtilityByRoomId(Long roomId);

    List<Long> getUtilityUsedByRoom(Long roomId);
}
