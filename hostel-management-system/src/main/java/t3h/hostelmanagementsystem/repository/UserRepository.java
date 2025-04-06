package t3h.hostelmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import t3h.hostelmanagementsystem.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username, String email);
}