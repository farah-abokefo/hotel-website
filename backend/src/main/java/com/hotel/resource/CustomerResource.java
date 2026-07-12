package com.hotel.resource;

import com.hotel.dao.CustomerDAO;
import com.hotel.dao.ReservationDAO;
import com.hotel.entity.Customer;
import com.hotel.entity.Reservation;
import com.hotel.util.JwtUtil;
import com.hotel.util.ResponseUtil;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/customer")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerResource {
    
    @Context
    private SecurityContext securityContext;
    
    @Context
    private HttpHeaders httpHeaders;
    
    private CustomerDAO customerDAO = new CustomerDAO();
    private ReservationDAO reservationDAO = new ReservationDAO();
    
    private String getCurrentUserSsn() {
        // Try to get from security context first
        if (securityContext != null && securityContext.getUserPrincipal() != null) {
            return securityContext.getUserPrincipal().getName();
        }
        
        // Fallback: extract from Authorization header
        if (httpHeaders != null) {
            String authHeader = httpHeaders.getHeaderString("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                return JwtUtil.getSsnFromToken(token);
            }
        }
        
        return null;
    }
    
    @GET
    @Path("/profile")
    public Response getProfile() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            Customer customer = customerDAO.findBySsn(ssn);
            if (customer == null) {
                return ResponseUtil.notFound("Customer not found");
            }
            return ResponseUtil.success(customer);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/profile")
    public Response updateProfile(Customer customerData) {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            Customer customer = customerDAO.findBySsn(ssn);
            if (customer == null) {
                return ResponseUtil.notFound("Customer not found");
            }
            
            // Update only the fields that are provided
            if (customerData.getFirstName() != null) {
                customer.setFirstName(customerData.getFirstName());
            }
            if (customerData.getLastName() != null) {
                customer.setLastName(customerData.getLastName());
            }
            if (customerData.getNationality() != null) {
                customer.setNationality(customerData.getNationality());
            }
            if (customerData.getPhone() != null) {
                customer.setPhone(customerData.getPhone());
            }
            if (customerData.getSex() != null) {
                customer.setSex(customerData.getSex());
            }
            if (customerData.getEmail() != null) {
                customer.setEmail(customerData.getEmail());
            }
            if (customerData.getAddress() != null) {
                customer.setAddress(customerData.getAddress());
            }
            
            customerDAO.update(customer);
            return ResponseUtil.success("Profile updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/stats")
    public Response getStats() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> reservations = reservationDAO.findByCustomerSsn(ssn);
            
            long totalBookings = reservations.size();
            long activeBookings = reservations.stream()
                .filter(r -> "confirmed".equals(r.getStatus()) || "checked-in".equals(r.getStatus()))
                .count();
            long completedBookings = reservations.stream()
                .filter(r -> "checked-out".equals(r.getStatus()))
                .count();
            double totalSpent = reservations.stream()
                .mapToDouble(r -> r.getTotalAmount() != null ? r.getTotalAmount() : 0)
                .sum();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalBookings", totalBookings);
            stats.put("activeBookings", activeBookings);
            stats.put("completedBookings", completedBookings);
            stats.put("totalSpent", totalSpent);
            stats.put("pointsEarned", (long) totalSpent);
            
            return ResponseUtil.success(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations")
    public Response getReservations() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> reservations = reservationDAO.findByCustomerSsn(ssn);
            return ResponseUtil.success(reservations);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/upcoming")
    public Response getUpcomingReservations() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> allReservations = reservationDAO.findByCustomerSsn(ssn);
            List<Reservation> upcoming = allReservations.stream()
                .filter(r -> "confirmed".equals(r.getStatus()) && 
                       (r.getCheckInDate() != null && !r.getCheckInDate().isBefore(java.time.LocalDate.now())))
                .limit(5)
                .toList();
            return ResponseUtil.success(upcoming);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/history")
    public Response getReservationHistory() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> allReservations = reservationDAO.findByCustomerSsn(ssn);
            List<Reservation> history = allReservations.stream()
                .filter(r -> "checked-out".equals(r.getStatus()) || "cancelled".equals(r.getStatus()))
                .limit(10)
                .toList();
            return ResponseUtil.success(history);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
}
