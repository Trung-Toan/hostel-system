package t3h.hostelmanagementsystem.controller.port;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.post.PostService;

@RestController
@RequestMapping("/")
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

    @DeleteMapping("/delete=post")
    public void deletePost(@RequestBody Long id) {
        postService.deletePort(id);
    }

}
