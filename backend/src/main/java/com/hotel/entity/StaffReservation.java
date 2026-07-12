package com.hotel.entity;
import java.time.LocalDateTime;
public class StaffReservation {
    private Integer id;
    private String ssnStaff;
    private Integer reservationId;
    private LocalDateTime assignedDate;
    protected void onCreate() {
        assignedDate = LocalDateTime.now();
    }
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getSsnStaff() { return ssnStaff; }
    public void setSsnStaff(String ssnStaff) { this.ssnStaff = ssnStaff; }
    public Integer getReservationId() { return reservationId; }
    public void setReservationId(Integer reservationId) { this.reservationId = reservationId; }
    public LocalDateTime getAssignedDate() { return assignedDate; }
    public void setAssignedDate(LocalDateTime assignedDate) { this.assignedDate = assignedDate; }
}