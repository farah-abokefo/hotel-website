package com.hotel.resource;

import com.hotel.dao.ReservationDAO;
import com.hotel.dao.StaffDAO;
import com.hotel.entity.Reservation;
import com.hotel.entity.Staff;
import com.hotel.util.JwtUtil;
import com.hotel.util.ResponseUtil;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/staff")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class StaffResource {
    
    @Context
    private SecurityContext securityContext;
    
    @Context
    private HttpHeaders httpHeaders;
    
    private StaffDAO staffDAO = new StaffDAO();
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
            
            Staff staff = staffDAO.findBySsn(ssn);
            if (staff == null) {
                return ResponseUtil.notFound("Staff not found");
            }
            return ResponseUtil.success(staff);
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
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("tasksCompleted", 48);
            stats.put("pendingTasks", 12);
            stats.put("reservationsHandled", 156);
            stats.put("activeReservations", 8);
            stats.put("customerSatisfaction", 94);
            return ResponseUtil.success(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/recent")
    public Response getRecentReservations() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> reservations = reservationDAO.findAll();
            List<Reservation> recent = reservations.stream().limit(10).toList();
            return ResponseUtil.success(recent);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/checkins/today")
    public Response getTodayCheckins() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> reservations = reservationDAO.findAll();
            List<Reservation> todayCheckins = reservations.stream()
                .filter(r -> "confirmed".equals(r.getStatus()) && 
                       r.getCheckInDate() != null && r.getCheckInDate().equals(LocalDate.now()))
                .toList();
            return ResponseUtil.success(todayCheckins);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/checkouts/today")
    public Response getTodayCheckouts() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Reservation> reservations = reservationDAO.findAll();
            List<Reservation> todayCheckouts = reservations.stream()
                .filter(r -> "checked-in".equals(r.getStatus()) && 
                       r.getCheckOutDate() != null && r.getCheckOutDate().equals(LocalDate.now()))
                .toList();
            return ResponseUtil.success(todayCheckouts);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/reservations/{id}/checkin")
    public Response processCheckin(@PathParam("id") Integer id) {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            reservationDAO.updateStatus(id, "checked-in");
            return ResponseUtil.success("Check-in successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/reservations/{id}/checkout")
    public Response processCheckout(@PathParam("id") Integer id) {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            reservationDAO.updateStatus(id, "checked-out");
            return ResponseUtil.success("Check-out successful");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/activities/recent")
    public Response getRecentActivities() {
        try {
            String ssn = getCurrentUserSsn();
            if (ssn == null) {
                return ResponseUtil.unauthorized("User not authenticated");
            }
            
            List<Map<String, Object>> activities = List.of(
                Map.of("type", "checkin", "title", "Guest checked into Room 304", "time", "10 minutes ago"),
                Map.of("type", "booking", "title", "New reservation #RES-1004 created", "time", "1 hour ago"),
                Map.of("type", "service", "title", "Room service delivered to Room 205", "time", "2 hours ago"),
                Map.of("type", "payment", "title", "Payment received $450 from Room 412", "time", "3 hours ago")
            );
            return ResponseUtil.success(activities);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseUtil.internalError(e.getMessage());
        }
    }
}