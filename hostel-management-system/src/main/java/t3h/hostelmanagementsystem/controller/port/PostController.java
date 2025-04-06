package t3h.hostelmanagementsystem.controller.port;

import org.springframework.web.bind.annotation.*;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.dto.response.ApiResponse;
import t3h.hostelmanagementsystem.service.post.PostService;

@RestController
@RequestMapping("/post")
@CrossOrigin("*")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ApiResponse<PostDTO> getPostList() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResult(postService.getAllPort());
        return apiResponse;
    }

}
