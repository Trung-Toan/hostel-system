package t3h.hostelmanagementsystem.service.hostel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.mapper.HostelMapper;
import t3h.hostelmanagementsystem.repository.HostelRepository;

import java.util.List;

@Service
public class HostelService {
    private final HostelRepository hostelRepository;
    private final HostelMapper hostelMapper;

    public HostelService(HostelRepository hostelRepository, HostelMapper hostelMapper) {
        this.hostelRepository = hostelRepository;
        this.hostelMapper = hostelMapper;
    }

    @Transactional(readOnly = true)
    public Hostel getHostelWithRooms(Long id) {
        return hostelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hostel not found"));
    }

    @Transactional(readOnly = true)
    public List<Hostel> getAllHostelsWithRooms() {
        return hostelRepository.findAll();
    }

    @Transactional
    public HostelDTO createHostel(HostelDTO hostelDTO) {
        if (hostelRepository.existsByName(hostelDTO.getName())) {
            throw new IllegalArgumentException("Hostel name already exists");
        }
        Hostel hostel = hostelMapper.toHostel(hostelDTO);
        hostel = hostelRepository.save(hostel);
        return hostelMapper.toHostelDTO(hostel);
    }
}
