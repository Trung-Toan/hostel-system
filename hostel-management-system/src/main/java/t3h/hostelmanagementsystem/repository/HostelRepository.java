package t3h.hostelmanagementsystem.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.Hostel;

import java.util.List;
import java.util.Optional;

@Repository
public interface HostelRepository extends JpaRepository<Hostel, Long> {

    boolean existsByName(String name);

    @EntityGraph(value = "Hostel.rooms")
    Optional<Hostel> findById(Long id);

    @EntityGraph(value = "Hostel.rooms")
    List<Hostel> findAll();

    boolean existsByNameAndIdNot(String name, Long id);

    @Query("SELECT h FROM Hostel h WHERE LOWER(h.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(h.address) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(h.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Hostel> searchHostels(String search, Pageable pageable);
}