package t3h.hostelmanagementsystem.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "customer_room")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRoom {
    /*
    * khi một entity có khóa chính tổng hợp, bạn cần một cách để biểu diễn khóa chính đó dưới dạng một đối tượng duy nhất
    *
    * Trong CustomerRoom, bảng customer_room có khóa chính là sự kết hợp của customer_id và room_id.
    * Vì vậy, chúng ta tạo một inner class CustomerRoomId để chứa hai trường này:
    * */
    @EmbeddedId // chỉ định rằng một entity sử dụng khóa chính tổng hợp
    private CustomerRoomId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomId")
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "status")
    private Byte status = 1;

    @Embeddable // khi một entity có khóa chính tổng hợp, bạn cần một cách để biểu diễn khóa chính đó dưới dạng một đối tượng duy nhất
    public static class CustomerRoomId implements java.io.Serializable {
        @Column(name = "customer_id")
        private Long customerId;

        @Column(name = "room_id")
        private Long roomId;

        public CustomerRoomId() {}

        public CustomerRoomId(Long customerId, Long roomId) {
            this.customerId = customerId;
            this.roomId = roomId;
        }

        // Getters, setters, equals, hashCode
        public Long getCustomerId() { return customerId; }
        public void setCustomerId(Long customerId) { this.customerId = customerId; }
        public Long getRoomId() { return roomId; }
        public void setRoomId(Long roomId) { this.roomId = roomId; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            CustomerRoomId that = (CustomerRoomId) o;
            return customerId.equals(that.customerId) && roomId.equals(that.roomId);
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(customerId, roomId);
        }
    }
}