package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import t3h.hostelmanagementsystem.entity.CustomerRoom;
import t3h.hostelmanagementsystem.entity.Hostel;

@Repository
public interface CustomerRoomRepository extends JpaRepository<CustomerRoom, Long> {

    @Query("select h from Hostel h " +
            "join CustomerRoom cr on h.id = cr.room.hostel.id " +
            "where cr.customer.id = :customerId and cr.endDate is null")
    Hostel findHostelByCustomerId(Long customerId);
}
