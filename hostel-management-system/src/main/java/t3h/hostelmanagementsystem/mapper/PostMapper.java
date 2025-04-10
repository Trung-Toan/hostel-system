package t3h.hostelmanagementsystem.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import t3h.hostelmanagementsystem.dto.request.PostDTO;
import t3h.hostelmanagementsystem.entity.Post;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface PostMapper {
    @Mapping(source = "userId", target = "user")
    Post toPost(PostDTO postDTO);

    @Mapping(source = "user.id", target = "userId")
    PostDTO toPostDTO(Post post);
}

