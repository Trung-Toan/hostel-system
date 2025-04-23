package t3h.hostelmanagementsystem.service.utility;

import t3h.hostelmanagementsystem.dto.request.UtilityDTO;

import java.util.List;

public interface UtilityService {
    List<UtilityDTO> getAllUtility();

    List<UtilityDTO> getUtilityByStatus(Integer status);

    UtilityDTO updateUtility(Long idUtility, UtilityDTO utilityDTO);

    UtilityDTO addUtility(UtilityDTO utilityDTO);
}
