package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.RoomUtility;

import java.util.List;

@Repository
public interface RoomUtilityRepository extends JpaRepository<RoomUtility, Long> {
    void deleteByRoomId(Long roomId);

    List<RoomUtility> findByRoomId(Long roomId);
}
