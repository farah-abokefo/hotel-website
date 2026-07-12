package com.hotel.dao;

import com.hotel.entity.Staff;
import com.hotel.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StaffDAO {
    
    public List<Staff> findAll() throws SQLException {
        List<Staff> staffList = new ArrayList<>();
        String sql = "SELECT s.*, d.dep_name FROM STAFF s LEFT JOIN DEPARTMENT d ON s.dep_id = d.dep_id ORDER BY s.first_name";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Staff staff = mapResultSetToStaff(rs);
                staff.setDepartmentName(rs.getString("dep_name"));
                staffList.add(staff);
            }
        }
        return staffList;
    }
    
   
    public Staff findBySsn(String ssn) throws SQLException {
        String sql = "SELECT s.*, d.dep_name FROM staff s LEFT JOIN department d ON s.dep_id = d.dep_id WHERE s.ssn_staff = ?";
        System.out.println("StaffDAO.findBySsn: Looking for ssn_staff = " + ssn);
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Staff staff = mapResultSetToStaff(rs);
                try {
                    staff.setDepartmentName(rs.getString("dep_name"));
                } catch (SQLException e) {
                    // Department name might not exist
                }
                return staff;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
        return null;
    }
    
    public long count() throws SQLException {
        String sql = "SELECT COUNT(*) as count FROM STAFF";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            if (rs.next()) {
                return rs.getLong("count");
            }
        }
        return 0;
    }
    
    public void create(Staff staff) throws SQLException {
        String sql = "INSERT INTO STAFF (ssn_staff, first_name, last_name, contact_number, sex, birthdate, salary, dep_id, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, staff.getSsnStaff());
            stmt.setString(2, staff.getFirstName());
            stmt.setString(3, staff.getLastName());
            stmt.setString(4, staff.getContactNumber());
            stmt.setString(5, staff.getSex());
            stmt.setDate(6, staff.getBirthdate() != null ? Date.valueOf(staff.getBirthdate()) : null);
            stmt.setDouble(7, staff.getSalary());
            stmt.setString(8, staff.getDepId());
            stmt.setString(9, staff.getAddress());
            stmt.setString(10, staff.getRole());
            stmt.executeUpdate();
        }
    }
    
    public void update(Staff staff) throws SQLException {
        String sql = "UPDATE STAFF SET first_name=?, last_name=?, contact_number=?, sex=?, birthdate=?, salary=?, dep_id=?, address=?, role=? WHERE ssn_staff=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, staff.getFirstName());
            stmt.setString(2, staff.getLastName());
            stmt.setString(3, staff.getContactNumber());
            stmt.setString(4, staff.getSex());
            stmt.setDate(5, staff.getBirthdate() != null ? Date.valueOf(staff.getBirthdate()) : null);
            stmt.setDouble(6, staff.getSalary());
            stmt.setString(7, staff.getDepId());
            stmt.setString(8, staff.getAddress());
            stmt.setString(9, staff.getRole());
            stmt.setString(10, staff.getSsnStaff());
            stmt.executeUpdate();
        }
    }
    
    public void delete(String ssn) throws SQLException {
        String sql = "DELETE FROM STAFF WHERE ssn_staff = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            stmt.executeUpdate();
        }
    }
    
    private Staff mapResultSetToStaff(ResultSet rs) throws SQLException {
        Staff staff = new Staff();
        staff.setSsnStaff(rs.getString("ssn_staff"));
        staff.setFirstName(rs.getString("first_name"));
        staff.setLastName(rs.getString("last_name"));
        staff.setContactNumber(rs.getString("contact_number"));
        staff.setSex(rs.getString("sex"));
        staff.setBirthdate(rs.getDate("birthdate") != null ? rs.getDate("birthdate").toLocalDate() : null);
        staff.setSalary(rs.getDouble("salary"));
        staff.setDepId(rs.getString("dep_id"));
        staff.setAddress(rs.getString("address"));
        staff.setRole(rs.getString("role"));
        return staff;
    }
    
    public Staff findByUsername(String username) throws SQLException {
        String sql = "SELECT s.*, d.dep_name FROM staff s LEFT JOIN department d ON s.dep_id = d.dep_id WHERE s.ssn_staff = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Staff staff = mapResultSetToStaff(rs);
                try {
                    staff.setDepartmentName(rs.getString("dep_name"));
                } catch (SQLException e) {
                    // Department name might not exist
                }
                return staff;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }
        return null;
    }

}

