package com.hotel.dao;

import com.hotel.entity.User;
import com.hotel.util.DBUtil;
import java.sql.*;

public class UserDAO {
    
    public User findBySsn(String ssn) throws SQLException {
        String sql = "SELECT * FROM USERS WHERE ssn = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setSsn(rs.getString("ssn"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                return user;
            }
        }
        return null;
    }
    
    public void create(User user) throws SQLException {
        String sql = "INSERT INTO USERS (ssn, password, role) VALUES (?, ?, ?)";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getSsn());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getRole());
            stmt.executeUpdate();
        }
    }
    
    public void updatePassword(String ssn, String newPassword) throws SQLException {
        String sql = "UPDATE USERS SET password = ? WHERE ssn = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, newPassword);
            stmt.setString(2, ssn);
            stmt.executeUpdate();
        }
    }
    
    public void delete(String ssn) throws SQLException {
        String sql = "DELETE FROM USERS WHERE ssn = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            stmt.executeUpdate();
        }
    }
    public User findByUsername(String username) throws SQLException {
        String sql = "SELECT * FROM users WHERE ssn = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                User user = new User();
                user.setSsn(rs.getString("ssn"));
                user.setPassword(rs.getString("password"));
                user.setRole(rs.getString("role"));
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
        return null;
    }

}
