package com.hotel.dao;

import com.hotel.entity.Customer;
import com.hotel.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CustomerDAO {
    
    public List<Customer> findAll() throws SQLException {
        List<Customer> customers = new ArrayList<>();
        String sql = "SELECT * FROM CUSTOMER";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                customers.add(mapResultSetToCustomer(rs));
            }
        }
        return customers;
    }
    
    public Customer findBySsn(String ssn) throws SQLException {
        String sql = "SELECT * FROM CUSTOMER WHERE ssn_CUST = ?";
        System.out.println("CustomerDAO.findBySsn: Looking for ssn_CUST = " + ssn);
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                System.out.println("Customer found!");
                return mapResultSetToCustomer(rs);
            } else {
                System.out.println("No customer found with ssn_CUST: " + ssn);
            }
        } catch (SQLException e) {
            System.err.println("SQL Error in findBySsn: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
        return null;
    }
    
    public Customer findByUsername(String username) throws SQLException {
        String sql = "SELECT * FROM CUSTOMER WHERE ssn_CUST = ? OR email = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, username);
            stmt.setString(2, username);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToCustomer(rs);
            }
        }
        return null;
    }
    
    public void update(Customer customer) throws SQLException {
        String sql = "UPDATE CUSTOMER SET first_name=?, last_name=?, nationality=?, phone=?, sex=?, email=?, address=? WHERE ssn_CUST=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, customer.getFirstName());
            stmt.setString(2, customer.getLastName());
            stmt.setString(3, customer.getNationality());
            stmt.setString(4, customer.getPhone());
            stmt.setString(5, customer.getSex());
            stmt.setString(6, customer.getEmail());
            stmt.setString(7, customer.getAddress());
            stmt.setString(8, customer.getSsnCust());
            stmt.executeUpdate();
        }
    }
    
    public void create(Customer customer) throws SQLException {
        String sql = "INSERT INTO CUSTOMER (ssn_CUST, first_name, last_name, nationality, phone, sex, email, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, customer.getSsnCust());
            stmt.setString(2, customer.getFirstName());
            stmt.setString(3, customer.getLastName());
            stmt.setString(4, customer.getNationality());
            stmt.setString(5, customer.getPhone());
            stmt.setString(6, customer.getSex());
            stmt.setString(7, customer.getEmail());
            stmt.setString(8, customer.getAddress());
            stmt.executeUpdate();
        }
    }
    
    public void delete(String ssn) throws SQLException {
        String sql = "DELETE FROM CUSTOMER WHERE ssn_CUST = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, ssn);
            stmt.executeUpdate();
        }
    }
    
    public int count() throws SQLException {
        String sql = "SELECT COUNT(*) FROM CUSTOMER";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            if (rs.next()) {
                return rs.getInt(1);
            }
        }
        return 0;
    }
    
    private Customer mapResultSetToCustomer(ResultSet rs) throws SQLException {
        Customer customer = new Customer();
        customer.setSsnCust(rs.getString("ssn_CUST"));
        customer.setFirstName(rs.getString("first_name"));
        customer.setLastName(rs.getString("last_name"));
        customer.setNationality(rs.getString("nationality"));
        customer.setPhone(rs.getString("phone"));
        customer.setSex(rs.getString("sex"));
        customer.setEmail(rs.getString("email"));
        customer.setAddress(rs.getString("address"));
        return customer;
    }
}
