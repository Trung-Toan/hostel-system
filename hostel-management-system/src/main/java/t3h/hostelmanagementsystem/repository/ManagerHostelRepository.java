package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.entity.ManagerHostel;

import java.util.List;

public interface ManagerHostelRepository extends JpaRepository<ManagerHostel, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE ManagerHostel mh SET mh.endDate = CURRENT_DATE WHERE mh.endDate IS NULL AND mh.manager.id = :managerId")
    int updateEndDateByUserId(Long managerId);

    @Query("SELECT mh FROM ManagerHostel mh WHERE mh.manager.id = :managerId AND mh.endDate = CURRENT_DATE")
    List<ManagerHostel> findUpdatedManagerHostelsByUserId(Long managerId);
}