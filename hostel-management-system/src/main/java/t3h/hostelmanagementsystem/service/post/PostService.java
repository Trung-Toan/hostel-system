package t3h.hostelmanagementsystem.service.post;

import t3h.hostelmanagementsystem.dto.request.PostDTO;

import java.util.List;

public interface PostService {
    List<PostDTO> getAllPort();

    PostDTO createPort(PostDTO postDTO);

    PostDTO updatePort(PostDTO postDTO);

    void deletePort(Long id);

    PostDTO getPostById(Long id);
}
