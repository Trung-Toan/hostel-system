package t3h.hostelmanagementsystem.service.room;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.entity.RoomUtility;
import t3h.hostelmanagementsystem.entity.Utility;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.RoomMapper;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.RoomRepository;
import t3h.hostelmanagementsystem.repository.RoomUtilityRepository;
import t3h.hostelmanagementsystem.repository.UtilityRepository;
import t3h.hostelmanagementsystem.service.utility.UtilityService;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final RoomMapper roomMapper;
    private final UtilityRepository utilityRepository;
    private final RoomUtilityRepository roomUtilityRepository;

    public RoomServiceImpl(RoomRepository roomRepository, HostelRepository hostelRepository, RoomMapper roomMapper,
                           UtilityRepository utilityRepository, RoomUtilityRepository roomUtilityRepository) {
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.roomMapper = roomMapper;
        this.utilityRepository = utilityRepository;
        this.roomUtilityRepository = roomUtilityRepository;
    }

    @Transactional
    public RoomDTOResponse createRoom(Long hostelId, RoomDTO roomDTO) {
        List<Long> utilityIdList = roomDTO.getUtilities();
        Hostel hostel = hostelRepository.findById(hostelId) .orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
        if (roomRepository.existsByHostelIdAndName(hostelId, roomDTO.getName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }
        Room room = roomMapper.toRoomEntity(roomDTO);
        room.setHostel(hostel);
        room = roomRepository.save(room);

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
            roomUtilityRepository.saveAll(roomUtilities);
        }
        return roomMapper.toRoomDTOResponse(room);
    }

    @Transactional(readOnly = true)
    public RoomDTO getRoomById(Long roomId) {
        Room room = findRoomById(roomId);
        return roomMapper.toRoomDTO(room);
    }

    @Transactional(readOnly = true)
    public List<RoomDTOResponse> getAllRoomByHostelId(Long hostelId) {
        Hostel hostel = hostelRepository.findById(hostelId) .orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
        List<Room> roomList = hostel.getRooms();
        return roomList.stream().map(roomMapper::toRoomDTOResponse).toList();
    }

    @Override
    @Transactional
    public RoomDTOResponse updateRoom(Long roomId, RoomDTO roomDTO) {
        List<Long> utilityIdList = roomDTO.getUtilities();
        findRoomById(roomId);
        Room room = roomMapper.toRoomEntity(roomDTO);
        Room updatedRoom = roomRepository.save(room);

        return roomMapper.toRoomDTOResponse(updatedRoom);
    }

    private Room findRoomById(Long roomId) {
        return roomRepository.findById(roomId) .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
    }

}