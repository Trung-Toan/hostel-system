package t3h.hostelmanagementsystem.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.Utility;

import java.util.List;

@Repository
public interface UtilityRepository extends JpaRepository<Utility, Long> {
    List<Utility> getUtilitiesByStatus(Integer status);

    @Query("select u from Utility u where lower(u.name) like lower(concat('%', :search, '%'))")
    List<Utility> filterUtility(@Param("search") String search, Sort sort);

}
