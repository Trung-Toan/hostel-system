package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import t3h.hostelmanagementsystem.dto.request.UtilityDTO;
import t3h.hostelmanagementsystem.entity.Utility;

@Mapper(componentModel = "spring")
public interface UtilityMapper {
    UtilityDTO toUtilityDTO(Utility utility);
    Utility toUtility(UtilityDTO utilityDTO);
}
