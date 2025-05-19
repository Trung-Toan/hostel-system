package t3h.hostelmanagementsystem.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import t3h.hostelmanagementsystem.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query("select u from User u where u.role != :role")
    List<User> findAllUserExceptRole(User.Role role);

    @Query("select u from User u where u.role = :role")
    List<User> findAllUserByRole(User.Role role);

    boolean existsByUsernameAndIdNot(String username, Long id);

    @Query("SELECT u FROM User u WHERE u.role = :role")
    Page<User> findAllByRole(User.Role role, Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.role = :role AND (LOWER(u.fullName) LIKE LOWER(CONCAT('%', :search, '%'))" +
            " OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))" +
            " OR LOWER(u.phoneNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR str(u.id) LIKE LOWER(CONCAT('%', :search, '%') ) )")
    Page<User> findAllByRoleAndSearch(User.Role role, String search, Pageable pageable);

}