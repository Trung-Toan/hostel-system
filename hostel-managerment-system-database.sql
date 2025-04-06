-- Tạo cơ sở dữ liệu
DROP DATABASE IF EXISTS hostel_management;

-- Tạo cơ sở dữ liệu
CREATE DATABASE IF NOT EXISTS hostel_management;
USE hostel_management;

-- 1. Bảng user (Người dùng)
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    password VARCHAR(255) NOT NULL, -- Mã hóa mật khẩu khi lưu
    dob DATE, -- Ngày sinh
    address TEXT,
    avatar VARCHAR(255), -- Đường dẫn ảnh đại diện
    role ENUM('customer', 'manager', 'owner') NOT NULL, -- 3 vai trò: khách thuê, quản lý, chủ sở hữu
    status TINYINT DEFAULT 1, -- 1: hoạt động, 0: khóa
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Bảng hostel (Nhà trọ)
CREATE TABLE hostel (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- Ví dụ: Nhà trọ A, Nhà trọ B
    address TEXT NOT NULL, -- Địa điểm: H, K, ...
    description TEXT,
    owner_id BIGINT NOT NULL, -- Chủ sở hữu của nhà trọ
    manager_id BIGINT, -- Quản lý của nhà trọ
    status TINYINT DEFAULT 1, -- 1: hoạt động, 0: không hoạt động
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES user(id) ON DELETE RESTRICT, -- Không xóa owner nếu đang sở hữu nhà trọ
    FOREIGN KEY (manager_id) REFERENCES user(id) ON DELETE SET NULL -- Manager có thể thay đổi
);

-- 3. Bảng category (Danh mục phòng)
CREATE TABLE category (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- Ví dụ: Phòng đơn, phòng đôi
    description TEXT,
    status TINYINT DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Bảng room (Phòng trọ)
CREATE TABLE room (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    hostel_id BIGINT NOT NULL,
    category_id BIGINT, -- Loại phòng (nếu cần phân loại)
    name VARCHAR(255) NOT NULL, -- Ví dụ: Phòng 101
    price DECIMAL(15, 2) NOT NULL, -- Giá thuê phòng
    area INT, -- Diện tích (m²)
    max_occupants INT DEFAULT 4, -- Số người tối đa
    current_occupants INT DEFAULT 0, -- Số người hiện tại
    description TEXT,
    status TINYINT DEFAULT 1, -- 1: trống, 0: đã thuê
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hostel_id) REFERENCES hostel(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

-- 5. Bảng customer_room (Quan hệ giữa khách thuê và phòng)
CREATE TABLE customer_room (
    customer_id BIGINT,
    room_id BIGINT,
    start_date DATE NOT NULL, -- Ngày bắt đầu thuê
    end_date DATE, -- Ngày kết thúc thuê (NULL nếu đang thuê)
    status TINYINT DEFAULT 1, -- 1: đang thuê, 0: đã rời
    PRIMARY KEY (customer_id, room_id),
    FOREIGN KEY (customer_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE
);

-- 6. Bảng utility (Tiện ích)
CREATE TABLE utility (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL, -- Ví dụ: Wifi, Điều hòa
    description TEXT,
    price DECIMAL(15, 2), -- Giá tiện ích (nếu tính phí riêng)
    status TINYINT DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Bảng room_utility (Tiện ích của phòng)
CREATE TABLE room_utility (
    room_id BIGINT,
    utility_id BIGINT,
    PRIMARY KEY (room_id, utility_id),
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE,
    FOREIGN KEY (utility_id) REFERENCES utility(id) ON DELETE CASCADE
);

-- 8. Bảng invoice (Hóa đơn)
CREATE TABLE invoice (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    customer_id BIGINT NOT NULL,
    month VARCHAR(7) NOT NULL, -- Định dạng: YYYY-MM
    room_price DECIMAL(15, 2) NOT NULL, -- Giá thuê phòng
    electricity_usage INT DEFAULT 0, -- Số điện tiêu thụ
    electricity_price DECIMAL(15, 2) DEFAULT 0, -- Giá điện
    water_usage INT DEFAULT 0, -- Số nước tiêu thụ
    water_price DECIMAL(15, 2) DEFAULT 0, -- Giá nước
    utility_fee DECIMAL(15, 2) DEFAULT 0, -- Phí tiện ích
    total_amount DECIMAL(15, 2) NOT NULL, -- Tổng tiền
    status TINYINT DEFAULT 0, -- 0: chưa thanh toán, 1: đã thanh toán
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES user(id) ON DELETE CASCADE
);

-- 9. Bảng post (Bài đăng)
CREATE TABLE post (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL, -- Người đăng (thường là owner hoặc manager)
    hostel_id BIGINT, -- Nhà trọ liên quan (nếu có)
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status TINYINT DEFAULT 1, -- 1: hiển thị, 0: ẩn
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (hostel_id) REFERENCES hostel(id) ON DELETE SET NULL
);

INSERT INTO user (full_name, username, email, phone_number, password, dob, address, avatar, role, status, created_at, updated_at) VALUES
-- 1. Customer
('Nguyễn Văn An', 'nguyenvanan', 'nguyenvanan@gmail.com', '+84321234567', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1995-03-15', '123 Đường Láng, Hà Nội', 'https://example.com/avatar1.jpg', 'customer', 1, '2025-01-01 10:00:00', '2025-01-01 10:00:00'),
-- 2. Manager
('Trần Thị Bình', 'tranthibinh', 'tranthibinh@yahoo.com', '0908765432', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1988-07-20', '45 Lê Lợi, TP.HCM', 'https://example.com/avatar2.jpg', 'manager', 1, '2025-01-02 14:30:00', '2025-01-02 14:30:00'),
-- 3. Owner
('Lê Hoàng Cường', 'lehoangcuong', 'lehoangcuong@outlook.com', '+84701234567', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1980-11-10', '78 Nguyễn Huệ, Huế', 'https://example.com/avatar3.jpg', 'owner', 1, '2025-01-03 09:15:00', '2025-01-03 09:15:00'),
-- 4. Customer
('Phạm Thị Duyên', 'phamthiduyen', 'phamthiduyen@gmail.com', '0987654321', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '2000-05-25', '12 Trần Phú, Đà Nẵng', NULL, 'customer', 1, '2025-01-04 16:45:00', '2025-01-04 16:45:00'),
-- 5. Manager
('Hoàng Văn Em', 'hoangvanem', 'hoangvanem@example.vn', '+84987654321', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1992-09-30', '56 Hùng Vương, Nha Trang', 'https://example.com/avatar5.jpg', 'manager', 1, '2025-01-05 11:20:00', '2025-01-05 11:20:00'),
-- 6. Customer
('Đỗ Thị Hồng', 'dothihong', 'dothihong@gmail.com', '0351234567', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1998-12-12', '89 Bạch Đằng, Hải Phòng', NULL, 'customer', 1, '2025-01-06 13:00:00', '2025-01-06 13:00:00'),
-- 7. Owner
('Vũ Minh Khang', 'vuminhkhang', 'vuminhkhang@yahoo.com', '+84761234567', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1985-02-18', '34 Lý Thường Kiệt, Cần Thơ', 'https://example.com/avatar7.jpg', 'owner', 1, '2025-01-07 08:30:00', '2025-01-07 08:30:00'),
-- 8. Customer
('Nguyễn Thị Lan', 'nguyenthilan', 'nguyenthilan@outlook.com', '0912345678', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '2002-06-05', '67 Nguyễn Trãi, Vinh', NULL, 'customer', 1, '2025-01-08 15:10:00', '2025-01-08 15:10:00'),
-- 9. Manager
('Trần Văn Minh', 'tranvanminh', 'tranvanminh@gmail.com', '+84591234567', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1990-04-22', '23 Phạm Ngũ Lão, Quy Nhơn', 'https://example.com/avatar9.jpg', 'manager', 1, '2025-01-09 17:25:00', '2025-01-09 17:25:00'),
-- 10. Customer
('Lê Thị Ngọc', 'lethingoc', 'lethingoc@example.vn', '0934567890', '$2a$10$zG7X8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K8eK8z9bL5Xj9fK8K', '1997-08-08', '90 Lê Đại Hành, Biên Hòa', NULL, 'customer', 1, '2025-01-10 12:00:00', '2025-01-10 12:00:00');