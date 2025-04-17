package t3h.hostelmanagementsystem.controller.port;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.service.post.PostService;

import java.util.Map;

@RestController
@RequestMapping("/manager")
@CrossOrigin("*")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/post")
    public ApiResponse<PostDTO> getPostList() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(postService.getAllPort());
        return apiResponse;
    }

    @PostMapping("/create-post")
    public ApiResponse<PostDTO> createPost(@RequestBody @Valid PostDTO postDTO) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(postService.createPort(postDTO));
        return apiResponse;
    }

    @PutMapping("/update-post")
    public ApiResponse<PostDTO> updatePost(@RequestBody @Valid PostDTO postDTO) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(postService.updatePort(postDTO));
        return apiResponse;
    }

    @DeleteMapping("/delete-post/{id}")
    public void deletePost(@PathVariable Long id) {
        if (id == null) {
            throw new AppException(ErrorCode.POST_ID_NULL);
        }
        postService.deletePort(id);
    }

    @GetMapping("/get-post-by-id/{id}")
    public ApiResponse<PostDTO> getPostById(@PathVariable Long id) {
        ApiResponse apiResponse = new ApiResponse();
        if (id == null) {
            throw new AppException(ErrorCode.POST_ID_NULL);
        }
        apiResponse.setResult(postService.getPostById(id));
        return apiResponse;
    }

}
