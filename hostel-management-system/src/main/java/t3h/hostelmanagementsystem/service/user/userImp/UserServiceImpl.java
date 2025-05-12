package t3h.hostelmanagementsystem.service.user.userImp;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import t3h.hostelmanagementsystem.dto.request.ForgotPasswordRequest;
import t3h.hostelmanagementsystem.dto.request.LoginRequestDTO;
import t3h.hostelmanagementsystem.dto.request.UserDTO;
import t3h.hostelmanagementsystem.entity.CustomerRoom;
import t3h.hostelmanagementsystem.entity.Hostel;
import t3h.hostelmanagementsystem.entity.User;
import t3h.hostelmanagementsystem.exception.AppException;
import t3h.hostelmanagementsystem.exception.ErrorCode;
import t3h.hostelmanagementsystem.mapper.UserMapper;
import t3h.hostelmanagementsystem.repository.CustomerRoomRepository;
import t3h.hostelmanagementsystem.repository.HostelRepository;
import t3h.hostelmanagementsystem.repository.RoomRepository;
import t3h.hostelmanagementsystem.repository.UserRepository;
import t3h.hostelmanagementsystem.service.user.UserService;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final HostelRepository hostelRepository;
    private final RoomRepository roomRepository;
    private final CustomerRoomRepository roomCustomerRoomRepository;
    private final CustomerRoomRepository customerRoomRepository;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper,
                           HostelRepository hostelRepository, RoomRepository roomRepository,
                           CustomerRoomRepository roomCustomerRoomRepository, CustomerRoomRepository customerRoomRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.hostelRepository = hostelRepository;
        this.roomRepository = roomRepository;
        this.roomCustomerRoomRepository = roomCustomerRoomRepository;
        this.customerRoomRepository = customerRoomRepository;
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
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        // Kiểm tra xem username đã tồn tại chưa
        Optional<User> existingUserByUsername = userRepository.findByUsername(userDTO.getUsername());
        if (existingUserByUsername.isPresent()) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Chuyển từ UserDTO sang User entity
        User user = userMapper.toEntity(userDTO);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        // Lưu user vào database
        User savedUser = userRepository.save(user);

        if (userDTO.getRole().equalsIgnoreCase("manager")) {
            Hostel hostel = hostelRepository.findById(userDTO.getHostelId()).orElseThrow(() -> new AppException(ErrorCode.HOSTEL_NOT_FOUND));
            hostel.setManager(savedUser);
            hostelRepository.save(hostel);
        } else {
            Long customerId = savedUser.getId();
            Long roomId = userDTO.getRoomId();
            LocalDate startDate = LocalDate.now();
            CustomerRoom.CustomerRoomId customerRoomId = new CustomerRoom.CustomerRoomId(customerId, roomId);

            CustomerRoom customerRoom = new CustomerRoom();
            customerRoom.setId(customerRoomId);
            customerRoom.setStartDate(startDate);

            customerRoomRepository.save(customerRoom);
        }

        // Chuyển từ User entity đã lưu sang UserDTO và trả về
        return userMapper.toDto(savedUser);
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    @Override
    @Transactional
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

    @Override
    public List<UserDTO> getAllUserExceptRole(String role) {
        List<User> userList = userRepository.findAllUserExceptRole(role);
        return userList.stream().map(userMapper :: toDto).toList();
    }

    @Override
    public List<UserDTO> getAllUserByRole(String role) {
        List<User> userList = userRepository.findAllUserByRole(role);
        return userList.stream().map(userMapper :: toDto).toList();
    }

    @Override
    @Transactional
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        findById(userId);
        User user = userMapper.toEntity(userDTO);
        user.setId(userId);
        if (userRepository.existsByUsernameAndIdNot(user.getUsername(), userId)) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User userUpdate = userRepository.save(user);
        return userMapper.toDto(userUpdate);
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = findById(userId);
        return userMapper.toDto(user);
    }

    private User findById (Long idUser) {
        return userRepository.findById(idUser).orElseThrow(() ->new AppException(ErrorCode.USER_NOT_FOUND));
    }
}