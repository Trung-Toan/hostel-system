package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.CustomerRoom;

@Repository
public interface CustomerRoomRepository extends JpaRepository<CustomerRoom, Long> {

}
