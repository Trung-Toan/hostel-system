package t3h.hostelmanagementsystem.controller.utility;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.UtilityDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.utility.UtilityService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/manager")
public class UtilityController {
    private final UtilityService utilityService;
    public UtilityController(UtilityService utilityService) {
        this.utilityService = utilityService;
    }

    @GetMapping("/get-all-utility")
    public ApiResponse<List<UtilityDTO>> getAllUtility(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "name") String sort,
            @RequestParam(required = false, defaultValue = "ASC") String direction
    ) {
        // Optional: Implement sorting and searching logic here if needed
        Sort.Direction sortDirection = Sort.Direction.fromString(direction.toUpperCase());
        Sort sortBy = Sort.by(sortDirection, sort);
        // Implement sorting and searching logic here if needed
        ApiResponse<List<UtilityDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.getAllUtility(search, sortBy));
        return apiResponse;
    }

    @GetMapping("/get-utility-by-status/{status}")
    public ApiResponse<List<UtilityDTO>> getUtilityByStatus(@PathVariable Integer status) {
        ApiResponse<List<UtilityDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.getUtilityByStatus(status));
        return apiResponse;
    }

    @PostMapping("/create-utility")
    public ApiResponse<UtilityDTO> createUtility(@RequestBody UtilityDTO utilityDTO) {
        ApiResponse<UtilityDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.addUtility(utilityDTO));
        return apiResponse;
    }

    @PutMapping("/update-utility/{utilityId}")
    public ApiResponse<UtilityDTO> updateUtility(@PathVariable Long utilityId, @RequestBody UtilityDTO utilityDTO) {
        ApiResponse<UtilityDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.updateUtility(utilityId, utilityDTO));
        return apiResponse;
    }

    @GetMapping("/get-utility-by-id/{utilityId}")
    public ApiResponse<UtilityDTO> getUtilityById(@PathVariable Long utilityId) {
        ApiResponse<UtilityDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.getUtilityById(utilityId));
        return apiResponse;
    }
}
