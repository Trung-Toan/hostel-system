package t3h.hostelmanagementsystem.service.hostel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.entity.Hostel;

import java.util.List;

public interface HostelService {
    HostelDTO getHostelById(Long id);

    List<HostelDTO> getAllHostel();

    HostelDTO createHostel(HostelDTO hostelDTO);


    HostelDTO updateHostel(HostelDTO hostelDTO);

    @Transactional
    Page<HostelDTO> getAllHostelPaged(Pageable pageable, String search);

    HostelDTO getHostelByUser(Long userId);

    List<HostelDTO> getAllHostelByStatus(int status);
}
