package t3h.hostelmanagementsystem.service.hostel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.User;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.HostelMapper;
import t3h.hostelmanagementsystem.repository.CustomerRoomRepository;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.UserRepository;

import java.util.List;

@Service
public class HostelServiceImpl implements HostelService {
    private final HostelRepository hostelRepository;
    private final HostelMapper hostelMapper;
    private final UserRepository userRepository;
    private final CustomerRoomRepository customerRoomRepository;

    public HostelServiceImpl(HostelRepository hostelRepository, HostelMapper hostelMapper,
                             UserRepository userRepository, CustomerRoomRepository customerRoomRepository) {
        this.hostelRepository = hostelRepository;
        this.hostelMapper = hostelMapper;
        this.userRepository = userRepository;
        this.customerRoomRepository = customerRoomRepository;
    }

    private Hostel getHostel(Long id) {
        return hostelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    @Override
    public HostelDTO getHostelById(Long id) {
        Hostel hostel = getHostel(id);
        return hostelMapper.toHostelDTO(hostel);
    }

    @Transactional(readOnly = true)
    @Override
    public List<HostelDTO> getAllHostel() {
        return hostelRepository.findAll().stream().map(hostelMapper::toHostelDTO).toList();
    }

    @Transactional
    @Override
    public HostelDTO createHostel(HostelDTO hostelDTO) {
        if (hostelRepository.existsByName(hostelDTO.getName())) {
            throw new AppException(ErrorCode.HOSTEL_EXISTED);
        }
        Hostel hostel = hostelMapper.toHostel(hostelDTO);
        hostel = hostelRepository.save(hostel);
        return hostelMapper.toHostelDTO(hostel);
    }

    @Override
    public HostelDTO updateHostel(HostelDTO hostelDTO) {
        Hostel hostel = hostelMapper.toHostel(hostelDTO);
        if (hostelRepository.existsByNameAndIdNot(hostel.getName(), hostel.getId())) {
            throw new AppException(ErrorCode.HOSTEL_EXISTED);
        }
        Hostel hostelUpdate = hostelRepository.save(hostel);
        return hostelMapper.toHostelDTO(hostelUpdate);
    }

    @Transactional
    @Override
    public Page<HostelDTO> getAllHostelPaged(Pageable pageable, String search) {
        if (search == null || search.trim().isEmpty()) {
            Page<Hostel> hostel = hostelRepository.findAll(pageable);
            return hostel.map(hostelMapper::toHostelDTO);
        }
        return hostelRepository.searchHostels(search, pageable).map(hostelMapper::toHostelDTO);
    }

    @Override
    public HostelDTO getHostelByUser(Long userId) {
        Hostel hostel;
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if (user.getRole() == User.Role.owner) {
            hostel = hostelRepository.findByOwnerId(userId);
        } else {
            hostel = customerRoomRepository.findHostelByCustomerId(userId);
        }
        return hostelMapper.toHostelDTO(hostel);
    }

    @Override
    public List<HostelDTO> getAllHostelByStatus(int status) {
        List<Hostel> hostels = hostelRepository.findAllByStatusAndAvailableRoom(status);
        if (hostels.isEmpty()) {
            throw new AppException(ErrorCode.HOSTEL_NOT_FOUND);
        }
        return hostels.stream().map(hostelMapper::toHostelDTO).toList();
    }
}
