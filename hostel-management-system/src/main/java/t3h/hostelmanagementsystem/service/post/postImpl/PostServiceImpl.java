package t3h.hostelmanagementsystem.service.post.postImpl;

import org.springframework.stereotype.Service;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.entity.Post;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.PostMapper;
import t3h.hostelmanagementsystem.repository.PostRepository;
import t3h.hostelmanagementsystem.service.post.PostService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public PostServiceImpl(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Override
    public List<PostDTO> getAllPort() {
        List<Post> postList = postRepository.findAllByOrderByCreatedAtDesc();
        return postList.stream().map(postMapper::toPostDTO).collect(Collectors.toList());
    }

    @Override
    public PostDTO createPort(PostDTO postDTO) {
        Post post = postMapper.toPost(postDTO);
        Post postSave = postRepository.save(post);
        return postMapper.toPostDTO(postSave);
    }

    @Override
    public PostDTO updatePort(PostDTO postDTO) {
        postRepository.findById(postDTO.getId()).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        Post postUpdate = postRepository.save(postMapper.toPost(postDTO));
        return postMapper.toPostDTO(postUpdate);
    }

    @Override
    public void deletePort(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        postRepository.delete(post);
    }

    @Override
    public PostDTO getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POST_NOT_FOUND));
        return postMapper.toPostDTO(post);
    }
}
