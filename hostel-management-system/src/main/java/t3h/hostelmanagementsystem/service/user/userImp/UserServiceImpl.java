package t3h.hostelmanagementsystem.service.user.userImp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import t3h.hostelmanagementsystem.dto.request.ForgotPasswordRequest;
import t3h.hostelmanagementsystem.dto.request.LoginRequestDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.entity.User;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.UserMapper;
import t3h.hostelmanagementsystem.repository.UserRepository;
import t3h.hostelmanagementsystem.service.user.UserService;


import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO loginByAccount(LoginRequestDTO loginRequest) {
        User user = userRepository.findByUsernameOrEmail(loginRequest.getLogin(), loginRequest.getLogin())
                .orElseThrow(() -> new AppException(ErrorCode.USER_LOGIN));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.USER_LOGIN);
        }
        return userMapper.toDto(user);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // Kiểm tra xem username đã tồn tại chưa
        Optional<User> existingUserByUsername = userRepository.findByUsername(userDTO.getUsername());
        if (existingUserByUsername.isPresent()) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Kiểm tra xem email đã tồn tại chưa
        Optional<User> existingUserByEmail = userRepository.findByEmail(userDTO.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Chuyển từ UserDTO sang User entity
        User user = userMapper.toEntity(userDTO);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Lưu user vào database
        User savedUser = userRepository.save(user);

        // Chuyển từ User entity đã lưu sang UserDTO và trả về
        return userMapper.toDto(savedUser);
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    @Override
    public UserDTO forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (!request.getRePassword().equals(request.getPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH_REPASSWORD);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User updatedUser = userRepository.save(user);

        return userMapper.toDto(updatedUser);
    }
}