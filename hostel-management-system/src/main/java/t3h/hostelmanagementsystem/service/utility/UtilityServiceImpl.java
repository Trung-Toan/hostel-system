package t3h.hostelmanagementsystem.service.utility;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import t3h.hostelmanagementsystem.dto.request.UtilityDTO;
import t3h.hostelmanagementsystem.entity.Utility;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.UtilityMapper;
import t3h.hostelmanagementsystem.repository.UtilityRepository;
import java.util.List;

@Service
public class UtilityServiceImpl implements UtilityService{

    private final UtilityRepository utilityRepository;
    private final UtilityMapper utilityMapper;

    public UtilityServiceImpl(UtilityRepository utilityRepository, UtilityMapper utilityMapper) {
        this.utilityRepository = utilityRepository;
        this.utilityMapper = utilityMapper;
    }

    @Override
    public List<UtilityDTO> getAllUtility(String search, Sort sort) {
        List<Utility> utilities;
        if (search != null && !search.trim().isEmpty()) {
            utilities = utilityRepository.filterUtility(search.trim(), sort);
        } else {
            utilities = utilityRepository.findAll(sort);
        }
        return utilities.stream().map(utilityMapper::toUtilityDTO).toList();
    }


    @Override
    public List<UtilityDTO> getUtilityByStatus(Integer status) {
        List<Utility> utilityList = utilityRepository.getUtilitiesByStatus(status);
        return utilityList.stream().map(utilityMapper :: toUtilityDTO).toList();
    }

    @Override
    public UtilityDTO updateUtility(Long idUtility, UtilityDTO utilityDTO) {
        findById(idUtility);
        Utility utility = utilityMapper.toUtility(utilityDTO);
        utility.setId(idUtility);
        Utility updatedUtility = utilityRepository.save(utility);
        return utilityMapper.toUtilityDTO(updatedUtility);
    }

    @Override
    public UtilityDTO addUtility(UtilityDTO utilityDTO) {
        Utility utility = utilityMapper.toUtility(utilityDTO);
        Utility addNew = utilityRepository.save(utility);
        return utilityMapper.toUtilityDTO(addNew);
    }

    @Override
    public UtilityDTO getUtilityById(Long idUtility) {
        Utility utility = findById(idUtility);
        return utilityMapper.toUtilityDTO(utility);
    }

    private Utility findById (Long idUtility) {
        return utilityRepository.findById(idUtility).orElseThrow(() ->new AppException(ErrorCode.UTILITY_NOT_FOUND));
    }
}
