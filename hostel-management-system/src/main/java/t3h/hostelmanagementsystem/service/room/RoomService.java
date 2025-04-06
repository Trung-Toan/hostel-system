package t3h.hostelmanagementsystem.service.room;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.RoomDTO;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.Room;
import t3h.hostelmanagementsystem.mapper.RoomMapper;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.RoomRepository;

import jakarta.validation.Valid;

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
    public RoomDTO createRoom(Long hostelId, @Valid RoomDTO roomDTO) {
        if (roomRepository.existsByHostelIdAndName(hostelId, roomDTO.getName())) {
            throw new IllegalArgumentException("Room name already exists in this hostel");
        }

        Hostel hostel = hostelRepository.findById(hostelId)
                .orElseThrow(() -> new IllegalArgumentException("Hostel not found"));
        Room room = roomMapper.toRoomEntity(roomDTO);
        room.setHostel(hostel); // Set hostel thủ công vì RoomDTO không có HostelDTO
        room = roomRepository.save(room);
        return roomMapper.toRoomDTO(room);
    }

    @Transactional(readOnly = true)
    public RoomDTO getRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        return roomMapper.toRoomDTO(room);
    }
}