package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByHostelIdAndName(Long hostelId, String name);
    boolean existsByHostelIdAndNameAndIdNot(Long hostelId, String name, Long id);
}
