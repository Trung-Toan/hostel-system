package t3h.hostelmanagementsystem.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "manager_hostel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManagerHostel {
    @EmbeddedId
    private ManagerHostelId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("managerId")
    @JoinColumn(name = "manager_id", nullable = false)
    private User manager;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("hostelId")
    @JoinColumn(name = "hostel_id", nullable = false)
    private Hostel hostel;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Embeddable
    public static class ManagerHostelId implements java.io.Serializable {
        private Long managerId;
        private Long hostelId;

        public ManagerHostelId() {}

        public ManagerHostelId(Long managerId, Long hostelId) {
            this.managerId = managerId;
            this.hostelId = hostelId;
        }

        public Long getManagerId() {
            return managerId;
        }
        public void setManagerId(Long managerId) {
            this.managerId = managerId;
        }
        public Long getHostelId() {
            return hostelId;
        }
        public void setHostelId(Long hostelId) {
            this.hostelId = hostelId;
        }
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            ManagerHostelId that = (ManagerHostelId) o;
            return managerId.equals(that.managerId) && hostelId.equals(that.hostelId);
        }
        @Override
        public int hashCode() {
            return java.util.Objects.hash(managerId, hostelId);
        }
    }
}
