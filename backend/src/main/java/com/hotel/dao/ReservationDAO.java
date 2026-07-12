package com.hotel.dao;

import com.hotel.entity.Reservation;
import com.hotel.util.DBUtil;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ReservationDAO {
    
    // Find all reservations
    public List<Reservation> findAll() throws SQLException {
        List<Reservation> reservations = new ArrayList<>();
        String sql = "SELECT r.*, c.first_name, c.last_name, c.phone, rt.room_type " +
                     "FROM RESERVATION r " +
                     "LEFT JOIN CUSTOMER c ON r.ssn_CUST = c.ssn_CUST " +
                     "LEFT JOIN ROOM rm ON r.room_number = rm.room_number " +
                     "LEFT JOIN ROOM_TYPE rt ON rm.room_type_id = rt.room_type_id " +
                     "ORDER BY r.reservation_id DESC";
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            
            while (rs.next()) {
                Reservation reservation = new Reservation();
                reservation.setReservationId(rs.getInt("reservation_id"));
                reservation.setSsnCust(rs.getString("ssn_CUST"));
                reservation.setRoomNumber(rs.getInt("room_number"));
                reservation.setCheckInDate(rs.getDate("check_in_date") != null ? rs.getDate("check_in_date").toLocalDate() : null);
                reservation.setCheckOutDate(rs.getDate("check_out_date") != null ? rs.getDate("check_out_date").toLocalDate() : null);
                reservation.setStatus(rs.getString("status"));
                reservation.setSpecialRequests(rs.getString("special_requests"));
                reservation.setTotalAmount(rs.getDouble("total_amount"));
                reservation.setCustomerFirstName(rs.getString("first_name"));
                reservation.setCustomerLastName(rs.getString("last_name"));
                reservation.setCustomerPhone(rs.getString("phone"));
                reservation.setRoomType(rs.getString("room_type"));
                reservations.add(reservation);
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return reservations;
    }
    
    // Find reservations by customer SSN
    public List<Reservation> findByCustomerSsn(String ssn) throws SQLException {
        List<Reservation> reservations = new ArrayList<>();
        String sql = "SELECT r.*, c.first_name, c.last_name, c.phone, rt.room_type " +
                     "FROM RESERVATION r " +
                     "LEFT JOIN CUSTOMER c ON r.ssn_CUST = c.ssn_CUST " +
                     "LEFT JOIN ROOM rm ON r.room_number = rm.room_number " +
                     "LEFT JOIN ROOM_TYPE rt ON rm.room_type_id = rt.room_type_id " +
                     "WHERE r.ssn_CUST = ? " +
                     "ORDER BY r.reservation_id DESC";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, ssn);
            rs = stmt.executeQuery();
            
            while (rs.next()) {
                Reservation reservation = new Reservation();
                reservation.setReservationId(rs.getInt("reservation_id"));
                reservation.setSsnCust(rs.getString("ssn_CUST"));
                reservation.setRoomNumber(rs.getInt("room_number"));
                reservation.setCheckInDate(rs.getDate("check_in_date") != null ? rs.getDate("check_in_date").toLocalDate() : null);
                reservation.setCheckOutDate(rs.getDate("check_out_date") != null ? rs.getDate("check_out_date").toLocalDate() : null);
                reservation.setStatus(rs.getString("status"));
                reservation.setSpecialRequests(rs.getString("special_requests"));
                reservation.setTotalAmount(rs.getDouble("total_amount"));
                reservation.setCustomerFirstName(rs.getString("first_name"));
                reservation.setCustomerLastName(rs.getString("last_name"));
                reservation.setCustomerPhone(rs.getString("phone"));
                reservation.setRoomType(rs.getString("room_type"));
                reservations.add(reservation);
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return reservations;
    }
    
    // Find reservation by ID
    public Reservation findById(Integer id) throws SQLException {
        String sql = "SELECT r.*, c.first_name, c.last_name, c.phone, rt.room_type " +
                     "FROM RESERVATION r " +
                     "LEFT JOIN CUSTOMER c ON r.ssn_CUST = c.ssn_CUST " +
                     "LEFT JOIN ROOM rm ON r.room_number = rm.room_number " +
                     "LEFT JOIN ROOM_TYPE rt ON rm.room_type_id = rt.room_type_id " +
                     "WHERE r.reservation_id = ?";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            rs = stmt.executeQuery();
            
            if (rs.next()) {
                Reservation reservation = new Reservation();
                reservation.setReservationId(rs.getInt("reservation_id"));
                reservation.setSsnCust(rs.getString("ssn_CUST"));
                reservation.setRoomNumber(rs.getInt("room_number"));
                reservation.setCheckInDate(rs.getDate("check_in_date") != null ? rs.getDate("check_in_date").toLocalDate() : null);
                reservation.setCheckOutDate(rs.getDate("check_out_date") != null ? rs.getDate("check_out_date").toLocalDate() : null);
                reservation.setStatus(rs.getString("status"));
                reservation.setSpecialRequests(rs.getString("special_requests"));
                reservation.setTotalAmount(rs.getDouble("total_amount"));
                reservation.setCustomerFirstName(rs.getString("first_name"));
                reservation.setCustomerLastName(rs.getString("last_name"));
                reservation.setCustomerPhone(rs.getString("phone"));
                reservation.setRoomType(rs.getString("room_type"));
                return reservation;
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return null;
    }
    
    // Count all reservations
    public long count() throws SQLException {
        String sql = "SELECT COUNT(*) as count FROM RESERVATION";
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                return rs.getLong("count");
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return 0;
    }
    
    // Get today's check-ins
    public long getTodayCheckins() throws SQLException {
        String sql = "SELECT COUNT(*) as count FROM RESERVATION WHERE DATE(check_in_date) = CURDATE() AND status = 'confirmed'";
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                return rs.getLong("count");
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return 0;
    }
    
    // Get today's check-outs
    public long getTodayCheckouts() throws SQLException {
        String sql = "SELECT COUNT(*) as count FROM RESERVATION WHERE DATE(check_out_date) = CURDATE() AND status = 'checked-in'";
        
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            if (rs.next()) {
                return rs.getLong("count");
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
        
        return 0;
    }
    
    // Create new reservation
    public void create(Reservation reservation) throws SQLException {
        String sql = "INSERT INTO RESERVATION (ssn_CUST, room_number, check_in_date, check_out_date, status, special_requests, total_amount, created_at, updated_at) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            
            stmt.setString(1, reservation.getSsnCust());
            stmt.setInt(2, reservation.getRoomNumber());
            stmt.setDate(3, Date.valueOf(reservation.getCheckInDate()));
            stmt.setDate(4, Date.valueOf(reservation.getCheckOutDate()));
            stmt.setString(5, reservation.getStatus() != null ? reservation.getStatus() : "confirmed");
            stmt.setString(6, reservation.getSpecialRequests());
            stmt.setDouble(7, reservation.getTotalAmount() != null ? reservation.getTotalAmount() : 0.0);
            stmt.setTimestamp(8, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setTimestamp(9, Timestamp.valueOf(LocalDateTime.now()));
            
            stmt.executeUpdate();
            
            rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                reservation.setReservationId(rs.getInt(1));
            }
        } finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
    }
    
    // Update reservation status
    public void updateStatus(Integer reservationId, String status) throws SQLException {
        String sql = "UPDATE RESERVATION SET status = ?, updated_at = ? WHERE reservation_id = ?";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, status);
            stmt.setTimestamp(2, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(3, reservationId);
            stmt.executeUpdate();
        } finally {
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
    }
    
    // Update full reservation
    public void update(Reservation reservation) throws SQLException {
        String sql = "UPDATE RESERVATION SET ssn_CUST = ?, room_number = ?, check_in_date = ?, check_out_date = ?, " +
                     "status = ?, special_requests = ?, total_amount = ?, updated_at = ? WHERE reservation_id = ?";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql);
            
            stmt.setString(1, reservation.getSsnCust());
            stmt.setInt(2, reservation.getRoomNumber());
            stmt.setDate(3, Date.valueOf(reservation.getCheckInDate()));
            stmt.setDate(4, Date.valueOf(reservation.getCheckOutDate()));
            stmt.setString(5, reservation.getStatus());
            stmt.setString(6, reservation.getSpecialRequests());
            stmt.setDouble(7, reservation.getTotalAmount());
            stmt.setTimestamp(8, Timestamp.valueOf(LocalDateTime.now()));
            stmt.setInt(9, reservation.getReservationId());
            
            stmt.executeUpdate();
        } finally {
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
    }
    
    // Delete reservation
    public void delete(Integer reservationId) throws SQLException {
        String sql = "DELETE FROM RESERVATION WHERE reservation_id = ?";
        
        Connection conn = null;
        PreparedStatement stmt = null;
        
        try {
            conn = DBUtil.getConnection();
            stmt = conn.prepareStatement(sql);
            stmt.setInt(1, reservationId);
            stmt.executeUpdate();
        } finally {
            if (stmt != null) try { stmt.close(); } catch(Exception e) {}
            if (conn != null) try { conn.close(); } catch(Exception e) {}
        }
    }
}