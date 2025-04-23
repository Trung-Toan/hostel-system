package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.Utility;

import java.util.List;

@Repository
public interface UtilityRepository extends JpaRepository<Utility, Long> {
    List<Utility> getUtilitiesByStatus(Integer status);
}
