package t3h.hostelmanagementsystem.service.room;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.dto.response.RoomDTOResponse;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.RoomMapper;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.RoomRepository;
import t3h.hostelmanagementsystem.service.RoomUtility.RoomUtilityService;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final RoomMapper roomMapper;
    private final RoomUtilityService roomUtilityService;

    public RoomServiceImpl(RoomRepository roomRepository, HostelRepository hostelRepository, RoomMapper roomMapper, RoomUtilityService roomUtilityService) {
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.roomMapper = roomMapper;
        this.roomUtilityService = roomUtilityService;
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

        roomUtilityService.addNew(utilityIdList, room);

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
        if (roomRepository.existsByHostelIdAndNameAndIdNot(roomDTO.getHostelId(), roomDTO.getName(), roomDTO.getId())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }
        Room room = roomMapper.toRoomEntity(roomDTO);
        Room updatedRoom = roomRepository.save(room);
        if(utilityIdList != null) {
            roomUtilityService.deleteRoomUtilityByRoomId(roomId);
            roomUtilityService.addNew(utilityIdList, updatedRoom);
        }
        return roomMapper.toRoomDTOResponse(updatedRoom);
    }

    @Override
    public Room findRoomById(Long roomId) {
        return roomRepository.findById(roomId) .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
    }

}