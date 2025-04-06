package t3h.hostelmanagementsystem.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@Table(name = "room_utility")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomUtility {

    @EmbeddedId
    private RoomUtilityId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomId")
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("utilityId")
    @JoinColumn(name = "utility_id", nullable = false)
    private Utility utility;

    @Embeddable
    public static class RoomUtilityId implements java.io.Serializable {
        @Column(name = "room_id")
        private Long roomId;

        @Column(name = "utility_id")
        private Long utilityId;

        public RoomUtilityId() {}

        public RoomUtilityId(Long roomId, Long utilityId) {
            this.roomId = roomId;
            this.utilityId = utilityId;
        }

        // Getters, setters, equals, hashCode
        public Long getRoomId() { return roomId; }
        public void setRoomId(Long roomId) { this.roomId = roomId; }
        public Long getUtilityId() { return utilityId; }
        public void setUtilityId(Long utilityId) { this.utilityId = utilityId; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            RoomUtilityId that = (RoomUtilityId) o;
            return roomId.equals(that.roomId) && utilityId.equals(that.utilityId);
        }

        @Override
        public int hashCode() {
            return java.util.Objects.hash(roomId, utilityId);
        }
    }
}