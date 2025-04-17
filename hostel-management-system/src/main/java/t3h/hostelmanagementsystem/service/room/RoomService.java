package t3h.hostelmanagementsystem.service.room;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.RoomMapper;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.RoomRepository;

import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final HostelRepository hostelRepository;
    private final RoomMapper roomMapper;

    public RoomService(RoomRepository roomRepository, HostelRepository hostelRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.hostelRepository = hostelRepository;
        this.roomMapper = roomMapper;
    }

    @Transactional
    public RoomDTO createRoom(Long hostelId, RoomDTO roomDTO) {
        Hostel hostel = hostelRepository.findById(hostelId) .orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
        if (roomRepository.existsByHostelIdAndName(hostelId, roomDTO.getName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }
        Room room = roomMapper.toRoomEntity(roomDTO);
        room.setHostel(hostel);
        room = roomRepository.save(room);
        return roomMapper.toRoomDTO(room);
    }

    @Transactional(readOnly = true)
    public RoomDTO getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId) .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        return roomMapper.toRoomDTO(room);
    }

    @Transactional(readOnly = true)
    public List<RoomDTO> getAllRoomByHostelId(Long hostelId) {
        Hostel hostel = hostelRepository.findById(hostelId) .orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
        List<Room> roomList = hostel.getRooms();
        return roomList.stream().map(roomMapper::toRoomDTO).toList();
    }

}