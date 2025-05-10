package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.Room;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    boolean existsByHostelIdAndName(Long hostelId, String name);
    boolean existsByHostelIdAndNameAndIdNot(Long hostelId, String name, Long id);
    @Query("SELECT r FROM Room r JOIN FETCH r.hostel WHERE r.id = :id")
    Optional<Room> findRoomWithHostelById(@Param("id") Long id);

    @Override
    @Query("SELECT r FROM Room r " +
            "JOIN FETCH r.hostel h " +
            "join fetch h.owner " +
            "left join fetch h.manager " +
            "WHERE r.id = :id")
    Optional<Room> findById(Long id);
}
