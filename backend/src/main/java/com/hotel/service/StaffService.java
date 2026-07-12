package com.hotel.service;

import com.hotel.dao.ReservationDAO;
import com.hotel.dao.StaffDAO;
import com.hotel.entity.Reservation;
import com.hotel.entity.Staff;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StaffService {
    
    private StaffDAO staffDAO = new StaffDAO();
    private ReservationDAO reservationDAO = new ReservationDAO();
    
    public Staff getProfile(String ssn) throws SQLException {
        return staffDAO.findBySsn(ssn);
    }
    
    public Map<String, Object> getStats(String ssn) throws SQLException {
        Map<String, Object> stats = new HashMap<>();
        stats.put("tasksCompleted", 48);
        stats.put("pendingTasks", 12);
        stats.put("reservationsHandled", 156);
        stats.put("activeReservations", 8);
        stats.put("customerSatisfaction", 94);
        return stats;
    }
    
    public List<Reservation> getRecentReservations() throws SQLException {
        List<Reservation> reservations = reservationDAO.findAll();
        return reservations.stream().limit(10).toList();
    }
    
    public List<Reservation> getTodayCheckins() throws SQLException {
        List<Reservation> reservations = reservationDAO.findAll();
        return reservations.stream()
            .filter(r -> "confirmed".equals(r.getStatus()) && 
                   r.getCheckInDate() != null && r.getCheckInDate().equals(LocalDate.now()))
            .toList();
    }
    
    public List<Reservation> getTodayCheckouts() throws SQLException {
        List<Reservation> reservations = reservationDAO.findAll();
        return reservations.stream()
            .filter(r -> "checked-in".equals(r.getStatus()) && 
                   r.getCheckOutDate() != null && r.getCheckOutDate().equals(LocalDate.now()))
            .toList();
    }
    
    public Reservation processCheckin(Integer reservationId) throws SQLException {
        reservationDAO.updateStatus(reservationId, "checked-in");
        return reservationDAO.findById(reservationId);
    }
    
    public Reservation processCheckout(Integer reservationId) throws SQLException {
        reservationDAO.updateStatus(reservationId, "checked-out");
        return reservationDAO.findById(reservationId);
    }
    
    public List<Map<String, Object>> getRecentActivities() throws SQLException {
        return List.of(
            Map.of("type", "checkin", "title", "Guest checked into Room 304", "time", "10 minutes ago"),
            Map.of("type", "booking", "title", "New reservation #RES-1004 created", "time", "1 hour ago"),
            Map.of("type", "service", "title", "Room service delivered to Room 205", "time", "2 hours ago"),
            Map.of("type", "payment", "title", "Payment received $450 from Room 412", "time", "3 hours ago")
        );
    }
}