package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.entity.Post;

@Mapper(componentModel = "spring")
public interface PostMapper {

    PostDTO toPostDTO(Post post);

    Post toPost(PostDTO postDTO);
}
