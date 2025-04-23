package t3h.hostelmanagementsystem.controller.utility;

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
    public ApiResponse<List<UtilityDTO>> getAllUtility() {
        ApiResponse<List<UtilityDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(utilityService.getAllUtility());
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
}
