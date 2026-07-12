package com.hotel.service;

import com.hotel.dao.CustomerDAO;
import com.hotel.dao.ReservationDAO;
import com.hotel.entity.Customer;
import com.hotel.entity.Reservation;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomerService {
    
    private CustomerDAO customerDAO = new CustomerDAO();
    private ReservationDAO reservationDAO = new ReservationDAO();
    
    public Customer getProfile(String ssn) throws SQLException {
        return customerDAO.findBySsn(ssn);
    }
    
    public Customer updateProfile(String ssn, Customer customerData) throws SQLException {
        Customer customer = customerDAO.findBySsn(ssn);
        if (customer == null) {
            throw new RuntimeException("Customer not found");
        }
        
        customer.setFirstName(customerData.getFirstName());
        customer.setLastName(customerData.getLastName());
        customer.setNationality(customerData.getNationality());
        customer.setPhone(customerData.getPhone());
        customer.setSex(customerData.getSex());
        customer.setEmail(customerData.getEmail());
        customer.setAddress(customerData.getAddress());
        
        customerDAO.update(customer);
        return customer;
    }
    
    public Map<String, Object> getStats(String ssn) throws SQLException {
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
        
        return stats;
    }
    
    public List<Reservation> getReservations(String ssn) throws SQLException {
        return reservationDAO.findByCustomerSsn(ssn);
    }
    
    public List<Reservation> getUpcomingReservations(String ssn) throws SQLException {
        List<Reservation> allReservations = reservationDAO.findByCustomerSsn(ssn);
        return allReservations.stream()
            .filter(r -> "confirmed".equals(r.getStatus()) && 
                   (r.getCheckInDate() != null && !r.getCheckInDate().isBefore(LocalDate.now())))
            .limit(5)
            .toList();
    }
    
    public List<Reservation> getReservationHistory(String ssn) throws SQLException {
        List<Reservation> allReservations = reservationDAO.findByCustomerSsn(ssn);
        return allReservations.stream()
            .filter(r -> "checked-out".equals(r.getStatus()) || "cancelled".equals(r.getStatus()))
            .limit(10)
            .toList();
    }
}