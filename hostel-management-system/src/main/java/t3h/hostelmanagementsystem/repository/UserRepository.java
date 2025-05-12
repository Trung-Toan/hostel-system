package t3h.hostelmanagementsystem.repository;

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
    List<User> findAllUserExceptRole(String role);

    @Query("select u from User u where u.role = :role")
    List<User> findAllUserByRole(String role);

    boolean existsByUsernameAndIdNot(String username, Long id);
}