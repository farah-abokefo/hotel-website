package com.hotel.resource;

import com.hotel.dto.DashboardStatsDTO;
import com.hotel.entity.*;
import com.hotel.service.AdminService;
import com.hotel.util.ResponseUtil;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminResource {
    
    private AdminService adminService = new AdminService();
    
    // ==================== CUSTOMERS ====================
    
    @GET
    @Path("/customers")
    public Response getAllCustomers() {
        try {
            List<Customer> customers = adminService.getAllCustomers();
            return ResponseUtil.success(customers);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/customers/count")
    public Response getCustomerCount() {
        try {
            long count = adminService.getCustomerCount();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/customers/{ssn}")
    public Response getCustomer(@PathParam("ssn") String ssn) {
        try {
            Customer customer = adminService.getCustomer(ssn);
            if (customer == null) {
                return ResponseUtil.notFound("Customer not found");
            }
            return ResponseUtil.success(customer);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @POST
    @Path("/customers")
    public Response createCustomer(Customer customer) {
        try {
            Customer created = adminService.createCustomer(customer);
            return ResponseUtil.success(created);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/customers/{ssn}")
    public Response updateCustomer(@PathParam("ssn") String ssn, Customer customer) {
        try {
            customer.setSsnCust(ssn);
            Customer updated = adminService.updateCustomer(customer);
            return ResponseUtil.success(updated);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @DELETE
    @Path("/customers/{ssn}")
    public Response deleteCustomer(@PathParam("ssn") String ssn) {
        try {
            adminService.deleteCustomer(ssn);
            return ResponseUtil.success("Customer deleted successfully");
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    // ==================== ROOMS ====================
    
    @GET
    @Path("/rooms")
    public Response getAllRooms() {
        try {
            List<Room> rooms = adminService.getAllRooms();
            return ResponseUtil.success(rooms);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/rooms/{number}")
    public Response getRoom(@PathParam("number") Integer roomNumber) {
        try {
            Room room = adminService.getRoom(roomNumber);
            if (room == null) {
                return ResponseUtil.notFound("Room not found");
            }
            return ResponseUtil.success(room);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @POST
    @Path("/rooms")
    public Response createRoom(Room room) {
        try {
            Room created = adminService.createRoom(room);
            return ResponseUtil.success(created);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/rooms/{number}")
    public Response updateRoom(@PathParam("number") Integer roomNumber, Room room) {
        try {
            room.setRoomNumber(roomNumber);
            Room updated = adminService.updateRoom(room);
            return ResponseUtil.success(updated);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @DELETE
    @Path("/rooms/{number}")
    public Response deleteRoom(@PathParam("number") Integer roomNumber) {
        try {
            adminService.deleteRoom(roomNumber);
            return ResponseUtil.success("Room deleted successfully");
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    // ==================== RESERVATIONS ====================
    
    @GET
    @Path("/reservations")
    public Response getAllReservations() {
        try {
            List<Reservation> reservations = adminService.getAllReservations();
            return ResponseUtil.success(reservations);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/count")
    public Response getReservationCount() {
        try {
            long count = adminService.getReservationCount();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/today-checkins")
    public Response getTodayCheckins() {
        try {
            long count = adminService.getTodayCheckins();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/reservations/today-checkouts")
    public Response getTodayCheckouts() {
        try {
            long count = adminService.getTodayCheckouts();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/reservations/{id}/status")
    public Response updateReservationStatus(@PathParam("id") Integer id, Map<String, String> request) {
        try {
            String status = request.get("status");
            Reservation updated = adminService.updateReservationStatus(id, status);
            return ResponseUtil.success(updated);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    // ==================== STAFF ====================
    
    @GET
    @Path("/staff")
    public Response getAllStaff() {
        try {
            List<Staff> staff = adminService.getAllStaff();
            return ResponseUtil.success(staff);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @GET
    @Path("/staff/count")
    public Response getStaffCount() {
        try {
            long count = adminService.getStaffCount();
            Map<String, Long> response = new HashMap<>();
            response.put("count", count);
            return ResponseUtil.success(response);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @POST
    @Path("/staff")
    public Response createStaff(Staff staff) {
        try {
            Staff created = adminService.createStaff(staff);
            return ResponseUtil.success(created);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @PUT
    @Path("/staff/{ssn}")
    public Response updateStaff(@PathParam("ssn") String ssn, Staff staff) {
        try {
            staff.setSsnStaff(ssn);
            Staff updated = adminService.updateStaff(staff);
            return ResponseUtil.success(updated);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    @DELETE
    @Path("/staff/{ssn}")
    public Response deleteStaff(@PathParam("ssn") String ssn) {
        try {
            adminService.deleteStaff(ssn);
            return ResponseUtil.success("Staff deleted successfully");
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
    
    // ==================== DASHBOARD ====================
    
    @GET
    @Path("/dashboard/stats")
    public Response getDashboardStats() {
        try {
            DashboardStatsDTO stats = adminService.getDashboardStats();
            return ResponseUtil.success(stats);
        } catch (Exception e) {
            return ResponseUtil.internalError(e.getMessage());
        }
    }
}