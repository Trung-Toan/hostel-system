package t3h.hostelmanagementsystem.service.utility;

import org.springframework.data.domain.Sort;
import t3h.hostelmanagementsystem.dto.request.UtilityDTO;

import java.util.List;

public interface UtilityService {
    List<UtilityDTO> getAllUtility(String search, Sort sort);

    List<UtilityDTO> getUtilityByStatus(Integer status);

    UtilityDTO updateUtility(Long idUtility, UtilityDTO utilityDTO);

    UtilityDTO addUtility(UtilityDTO utilityDTO);

    UtilityDTO getUtilityById(Long idUtility);
}
