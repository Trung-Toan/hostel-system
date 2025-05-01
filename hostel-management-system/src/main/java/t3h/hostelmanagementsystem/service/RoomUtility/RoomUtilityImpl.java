package t3h.hostelmanagementsystem.service.RoomUtility;

import org.springframework.stereotype.Service;
import t3h.hostelmanagementsystem.dto.request.RoomUtilityDTO;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.entity.RoomUtility;
import t3h.hostelmanagementsystem.entity.Utility;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.RoomUtilityMapper;
import t3h.hostelmanagementsystem.repository.RoomUtilityRepository;
import t3h.hostelmanagementsystem.repository.UtilityRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomUtilityImpl implements RoomUtilityService{

    private final UtilityRepository utilityRepository;
    private final RoomUtilityRepository roomUtilityRepository;
    private final RoomUtilityMapper roomUtilityMapper;

    public RoomUtilityImpl(UtilityRepository utilityRepository, RoomUtilityRepository roomUtilityRepository, RoomUtilityMapper roomUtilityMapper) {
        this.utilityRepository = utilityRepository;
        this.roomUtilityRepository = roomUtilityRepository;
        this.roomUtilityMapper = roomUtilityMapper;
    }


    @Override
    public List<RoomUtilityDTO> addNew(List<Long> utilityIdList, Room room) {
        if (utilityIdList != null && !utilityIdList.isEmpty()) {
            List<RoomUtility> roomUtilities = new ArrayList<>();
            for (Long utilityId : utilityIdList) {
                // find utility by id
                Utility utility = utilityRepository.findById(utilityId).orElseThrow(() -> new AppException(ErrorCode.UTILITY_NOT_FOUND));
                // add roomUtilityId by new id room and id utility
                RoomUtility.RoomUtilityId roomUtilityId = new RoomUtility.RoomUtilityId(room.getId(), utility.getId());
                // create new roomUtility with id is roomUtilityId and object new room and object utility finding
                RoomUtility roomUtility = new RoomUtility();
                roomUtility.setId(roomUtilityId);
                roomUtility.setRoom(room);
                roomUtility.setUtility(utility);
                // add to list
                roomUtilities.add(roomUtility);
            }
            // save all to database
            List<RoomUtility> roomListSaved = roomUtilityRepository.saveAll(roomUtilities);
            return roomListSaved.stream().map(roomUtilityMapper::toDto).toList();
        }
        return null;
    }

    @Override
    public void deleteRoomUtilityByRoomId(Long roomId) {
        roomUtilityRepository.deleteByRoomId(roomId);
    }

    @Override
    public List<RoomUtilityDTO> getUtilityUsedByRoom(Long roomId) {
        List<RoomUtility> roomUtilityList = roomUtilityRepository.findByRoomId(roomId);
        return null;
    }


}
