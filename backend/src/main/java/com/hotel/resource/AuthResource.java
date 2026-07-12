package com.hotel.resource;

import com.hotel.dto.LoginRequest;
import com.hotel.dto.LoginResponse;
import com.hotel.dto.RegisterRequest;
import com.hotel.entity.Customer;
import com.hotel.entity.Staff;
import com.hotel.entity.User;
import com.hotel.service.AuthService;
import com.hotel.util.ResponseUtil;
import com.hotel.util.JwtUtil;
import com.hotel.dto.UserLogin;
import com.hotel.dao.UserDAO;
import com.hotel.dao.StaffDAO;
import com.hotel.dao.CustomerDAO;
import com.hotel.util.DBUtil;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.List;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    
    private AuthService authService = new AuthService();
    private UserDAO userDAO = new UserDAO();
    private StaffDAO staffDAO = new StaffDAO();
    private CustomerDAO customerDAO = new CustomerDAO();
    
    @POST
@Path("/login")
public Response login(UserLogin login) {
    System.out.println("=== AuthResource.login() called ===");
    System.out.println("Username: " + login.getUsername());
    System.out.println("Password: " + login.getPassword());
    
    try {
        User user = userDAO.findByUsername(login.getUsername());
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED)
                          .entity("{\"error\":\"Invalid credentials\"}")
                          .build();
        }
        
        if (user.getPassword().equals(login.getPassword())) {
            // Get the actual SSN from the respective table
            String actualSsn = login.getUsername(); // Default to username
            
            if ("customer".equals(user.getRole())) {
                Customer customer = customerDAO.findByUsername(login.getUsername());
                if (customer != null) {
                    actualSsn = customer.getSsnCust();
                }
            } else if ("staff".equals(user.getRole())) {
                Staff staff = staffDAO.findByUsername(login.getUsername());
                if (staff != null) {
                    actualSsn = staff.getSsnStaff();
                }
            }
            
            String token = JwtUtil.generateToken(actualSsn, user.getRole());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("message", "Login successful");
            
            // Add user details
            Map<String, String> userInfo = new HashMap<>();
            userInfo.put("ssn", actualSsn);
            userInfo.put("username", login.getUsername());
            response.put("user", userInfo);
            
            return Response.ok(response).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                          .entity("{\"error\":\"Invalid credentials\"}")
                          .build();
        }
    } catch (Exception e) {
        e.printStackTrace();
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                      .entity("{\"error\":\"" + e.getMessage() + "\"}")
                      .build();
    }
}
    @POST
    @Path("/register")
    public Response register(RegisterRequest request) {
        try {
            Customer customer = authService.register(request);
            return ResponseUtil.success("Registration successful");
        } catch (Exception e) {
            return ResponseUtil.badRequest(e.getMessage());
        }
    }
    
    @GET
    @Path("/verify")
    public Response verifyToken(@HeaderParam("Authorization") String authHeader) {
        try {
            String token = authHeader.substring("Bearer ".length());
            boolean isValid = authService.verifyToken(token);
            Map<String, Object> response = new HashMap<>();
            response.put("valid", isValid);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.success(Map.of("valid", false));
        }
    }
    
    @POST
    @Path("/logout")
    public Response logout() {
        return ResponseUtil.success("Logout successful");
    }
    
    // ========== DIAGNOSTIC ENDPOINTS ==========
    
    @GET
    @Path("/debug/users")
    public Response debugUsers() {
        try {
            List<Map<String, String>> users = new ArrayList<>();
            Connection conn = DBUtil.getConnection();
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT ssn, password, role FROM USERS");
            while (rs.next()) {
                Map<String, String> user = new HashMap<>();
                user.put("ssn", rs.getString("ssn"));
                user.put("password", rs.getString("password"));
                user.put("role", rs.getString("role"));
                users.add(user);
            }
            rs.close();
            stmt.close();
            conn.close();
            return Response.ok(users).build();
        } catch (Exception e) {
            return Response.status(500).entity(Map.of("error", e.getMessage())).build();
        }
    }
    
    @GET
    @Path("/debug/staff/{ssn}")
    public Response debugStaff(@PathParam("ssn") String ssn) {
        try {
            Staff staff = staffDAO.findBySsn(ssn);
            if (staff == null) {
                return Response.ok(Map.of("exists", false, "message", "Staff not found in STAFF table for SSN: " + ssn)).build();
            }
            Map<String, Object> result = new HashMap<>();
            result.put("exists", true);
            result.put("ssn_staff", staff.getSsnStaff());
            result.put("first_name", staff.getFirstName());
            result.put("last_name", staff.getLastName());
            result.put("contact_number", staff.getContactNumber());
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(500).entity(Map.of("error", e.getMessage())).build();
        }
    }
    
    @GET
    @Path("/debug/customer/{ssn}")
    public Response debugCustomer(@PathParam("ssn") String ssn) {
        try {
            Customer customer = customerDAO.findBySsn(ssn);
            if (customer == null) {
                return Response.ok(Map.of("exists", false, "message", "Customer not found in CUSTOMER table for SSN: " + ssn)).build();
            }
            Map<String, Object> result = new HashMap<>();
            result.put("exists", true);
            result.put("ssn_CUST", customer.getSsnCust());
            result.put("first_name", customer.getFirstName());
            result.put("last_name", customer.getLastName());
            result.put("phone", customer.getPhone());
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(500).entity(Map.of("error", e.getMessage())).build();
        }
    }
    
    @GET
    @Path("/debug/login-test")
    public Response debugLoginTest(@QueryParam("username") String username, @QueryParam("password") String password) {
        try {
            Map<String, Object> result = new HashMap<>();
            
            // Check USERS table
            User user = userDAO.findBySsn(username);
            if (user == null) {
                result.put("step1_users_table", "FAILED - User not found");
                result.put("success", false);
                return Response.ok(result).build();
            }
            result.put("step1_users_table", "PASSED - User found");
            result.put("user_role", user.getRole());
            result.put("stored_password", user.getPassword());
            result.put("entered_password", password);
            result.put("password_match", password.equals(user.getPassword()));
            
            if (!password.equals(user.getPassword())) {
                result.put("success", false);
                result.put("failure_reason", "Password mismatch");
                return Response.ok(result).build();
            }
            
            // Check STAFF table if role is staff
            if ("staff".equals(user.getRole())) {
                Staff staff = staffDAO.findBySsn(username);
                if (staff == null) {
                    result.put("step2_staff_table", "FAILED - Staff not found in STAFF table");
                    result.put("success", false);
                    result.put("failure_reason", "Staff record missing in STAFF table");
                    return Response.ok(result).build();
                }
                result.put("step2_staff_table", "PASSED - Staff found");
                result.put("staff_name", staff.getFirstName() + " " + staff.getLastName());
            }
            
            // Check CUSTOMER table if role is customer
            if ("customer".equals(user.getRole())) {
                Customer customer = customerDAO.findBySsn(username);
                if (customer == null) {
                    result.put("step2_customer_table", "FAILED - Customer not found in CUSTOMER table");
                    result.put("success", false);
                    result.put("failure_reason", "Customer record missing in CUSTOMER table");
                    return Response.ok(result).build();
                }
                result.put("step2_customer_table", "PASSED - Customer found");
                result.put("customer_name", customer.getFirstName() + " " + customer.getLastName());
            }
            
            result.put("success", true);
            result.put("message", "Login would be successful!");
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(500).entity(Map.of("error", e.getMessage())).build();
        }
    }
}


