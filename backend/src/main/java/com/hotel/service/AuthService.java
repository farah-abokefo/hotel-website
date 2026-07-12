package com.hotel.service;

import com.hotel.dao.CustomerDAO;
import com.hotel.dao.StaffDAO;
import com.hotel.dao.UserDAO;
import com.hotel.dto.LoginResponse;
import com.hotel.dto.RegisterRequest;
import com.hotel.entity.Customer;
import com.hotel.entity.Staff;
import com.hotel.entity.User;
import com.hotel.util.SimpleTokenUtil;
import java.sql.SQLException;

public class AuthService {
    
    private UserDAO userDAO = new UserDAO();
    private CustomerDAO customerDAO = new CustomerDAO();
    private StaffDAO staffDAO = new StaffDAO();
    
    public LoginResponse login(String username, String password) throws SQLException {
        System.out.println("=== LOGIN ATTEMPT ===");
        System.out.println("Username: " + username);
        System.out.println("Password entered: " + password);
        
        if (username == null || password == null) {
            throw new RuntimeException("Username and password are required");
        }
        
        User user = userDAO.findBySsn(username);
        
        if (user == null) {
            System.out.println("User NOT found: " + username);
            throw new RuntimeException("Invalid credentials");
        }
        
        System.out.println("User found. Role: " + user.getRole());
        System.out.println("Stored password: " + user.getPassword());
        
        if (!password.equals(user.getPassword())) {
            System.out.println("Password mismatch!");
            throw new RuntimeException("Invalid credentials");
        }
        
        System.out.println("Password matched! Login successful.");
        
        String token = SimpleTokenUtil.generateToken(user.getSsn(), user.getRole());
        LoginResponse response = new LoginResponse(token, user.getRole(), "Login successful");
        
        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setSsn(user.getSsn());
        
        if ("customer".equals(user.getRole())) {
            Customer customer = customerDAO.findBySsn(user.getSsn());
            if (customer != null) {
                userInfo.setFirstName(customer.getFirstName());
                userInfo.setLastName(customer.getLastName());
                userInfo.setPhone(customer.getPhone());
            } else {
                userInfo.setFirstName("Customer");
                userInfo.setLastName("User");
                userInfo.setPhone("N/A");
            }
        } else if ("staff".equals(user.getRole())) {
            Staff staff = staffDAO.findBySsn(user.getSsn());
            if (staff != null) {
                userInfo.setFirstName(staff.getFirstName());
                userInfo.setLastName(staff.getLastName());
                userInfo.setPhone(staff.getContactNumber());
            } else {
                userInfo.setFirstName("Staff");
                userInfo.setLastName("Member");
                userInfo.setPhone("N/A");
            }
        } else if ("admin".equals(user.getRole())) {
            userInfo.setFirstName("Admin");
            userInfo.setLastName("User");
            userInfo.setPhone("N/A");
        }
        
        response.setUser(userInfo);
        return response;
    }
    
    public Customer register(RegisterRequest request) throws SQLException {
        if (request.getSsnCust() == null || request.getFirstName() == null || 
            request.getLastName() == null || request.getPassword() == null) {
            throw new RuntimeException("Required fields missing");
        }
        
        User existingUser = userDAO.findBySsn(request.getSsnCust());
        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }
        
        Customer customer = new Customer();
        customer.setSsnCust(request.getSsnCust());
        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setNationality(request.getNationality());
        customer.setPhone(request.getPhone());
        customer.setSex(request.getSex());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customerDAO.create(customer);
        
        User user = new User();
        user.setSsn(request.getSsnCust());
        user.setPassword(request.getPassword());
        user.setRole("customer");
        userDAO.create(user);
        
        return customer;
    }
    
    public boolean verifyToken(String token) {
        return SimpleTokenUtil.isTokenValid(token);
    }
}
