package t3h.hostelmanagementsystem.controller.hostel;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.HostelDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.hostel.HostelService;

import java.util.List;

@RestController
@RequestMapping("/owner")
@CrossOrigin("*")
public class HostelController {
    private final HostelService hostelService;

    public HostelController(HostelService hostelService) {
        this.hostelService = hostelService;
    }

    @GetMapping("/get-all-hostel")
    public ApiResponse<List<HostelDTO>> getAllHostel() {
        ApiResponse<List<HostelDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.getAllHostel());
        return apiResponse;
    }

    @PostMapping("/create-hostel")
    public ApiResponse<HostelDTO> createHostel(@RequestBody @Valid HostelDTO hostelDTO) {
        ApiResponse<HostelDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.createHostel(hostelDTO));
        return apiResponse;
    }

    @GetMapping("/get-hostel-by-id/{id}")
    public ApiResponse<HostelDTO> getHostelById(@PathVariable Long id) {
        ApiResponse<HostelDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.getHostelById(id));
        return apiResponse;
    }

    @PutMapping("/update-hostel")
    public ApiResponse<HostelDTO> updateHostel(@RequestBody @Valid HostelDTO hostelDTO) {
        ApiResponse<HostelDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.updateHostel(hostelDTO));
        return apiResponse;
    }

    @GetMapping("/get-all-hostel-paged")
    public ApiResponse<PagedModel<HostelDTO>> getAllHostelPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "name") String sort,
            @RequestParam(required = false, defaultValue = "ASC") String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction.toUpperCase());
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);

        ApiResponse<PagedModel<HostelDTO>> apiResponse = new ApiResponse<>();
        Page<HostelDTO> pageResult = hostelService.getAllHostelPaged(pageable, search);
        PagedModel<HostelDTO> pagedModel = new PagedModel<>(pageResult);
        apiResponse.setResult(pagedModel);
        return apiResponse;
    }

    @GetMapping("/get-hostel-by-user/{userId}")
    public ApiResponse<HostelDTO> getHostelByUser(@PathVariable Long userId) {
        ApiResponse<HostelDTO> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.getHostelByUser(userId));
        return apiResponse;
    }

    @GetMapping("/get-all-hostel-by-status/{status}")
    public ApiResponse<List<HostelDTO>> getAllHostelByStatus(@PathVariable int status) {
        ApiResponse<List<HostelDTO>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(hostelService.getAllHostelByStatus(status));
        return apiResponse;
    }
}
