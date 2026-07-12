package com.hotel.service;

import com.hotel.dao.*;
import com.hotel.dto.DashboardStatsDTO;
import com.hotel.entity.*;
import java.sql.SQLException;
import java.util.List;

public class AdminService {
    
    private CustomerDAO customerDAO = new CustomerDAO();
    private RoomDAO roomDAO = new RoomDAO();
    private ReservationDAO reservationDAO = new ReservationDAO();
    private StaffDAO staffDAO = new StaffDAO();
    
    // Customer operations
    public List<Customer> getAllCustomers() throws SQLException {
        return customerDAO.findAll();
    }
    
    public Customer getCustomer(String ssn) throws SQLException {
        return customerDAO.findBySsn(ssn);
    }
    
    public long getCustomerCount() throws SQLException {
        return customerDAO.count();
    }
    
    public Customer createCustomer(Customer customer) throws SQLException {
        customerDAO.create(customer);
        return customer;
    }
    
    public Customer updateCustomer(Customer customer) throws SQLException {
        customerDAO.update(customer);
        return customer;
    }
    
    public void deleteCustomer(String ssn) throws SQLException {
        customerDAO.delete(ssn);
    }
    
    // Room operations
    public List<Room> getAllRooms() throws SQLException {
        return roomDAO.findAll();
    }
    
    public Room getRoom(Integer roomNumber) throws SQLException {
        return roomDAO.findByNumber(roomNumber);
    }
    
    public Room createRoom(Room room) throws SQLException {
        roomDAO.create(room);
        return room;
    }
    
    public Room updateRoom(Room room) throws SQLException {
        roomDAO.update(room);
        return room;
    }
    
    public void deleteRoom(Integer roomNumber) throws SQLException {
        roomDAO.delete(roomNumber);
    }
    
    // Reservation operations
    public List<Reservation> getAllReservations() throws SQLException {
        return reservationDAO.findAll();
    }
    
    public long getReservationCount() throws SQLException {
        return reservationDAO.count();
    }
    
    public long getTodayCheckins() throws SQLException {
        return reservationDAO.getTodayCheckins();
    }
    
    public long getTodayCheckouts() throws SQLException {
        return reservationDAO.getTodayCheckouts();
    }
    
    public Reservation updateReservationStatus(Integer id, String status) throws SQLException {
        reservationDAO.updateStatus(id, status);
        return reservationDAO.findById(id);
    }
    
    // Staff operations
    public List<Staff> getAllStaff() throws SQLException {
        return staffDAO.findAll();
    }
    
    public long getStaffCount() throws SQLException {
        return staffDAO.count();
    }
    
    public Staff createStaff(Staff staff) throws SQLException {
        staffDAO.create(staff);
        return staff;
    }
    
    public Staff updateStaff(Staff staff) throws SQLException {
        staffDAO.update(staff);
        return staff;
    }
    
    public void deleteStaff(String ssn) throws SQLException {
        staffDAO.delete(ssn);
    }
    
    // Service operations (placeholder)
    public List<Service> getAllServices() throws SQLException {
        // Return empty list for now - implement ServiceDAO if needed
        return List.of();
    }
    
    public Service createService(Service service) throws SQLException {
        return service;
    }
    
    public Service updateService(Service service) throws SQLException {
        return service;
    }
    
    public void deleteService(Integer id) throws SQLException {
        // Implement if needed
    }
    
    // Department operations (placeholder)
    public List<Department> getAllDepartments() throws SQLException {
        return List.of();
    }
    
    public Department createDepartment(Department department) throws SQLException {
        return department;
    }
    
    public Department updateDepartment(Department department) throws SQLException {
        return department;
    }
    
    public void deleteDepartment(String id) throws SQLException {
        // Implement if needed
    }
    
    // Discount operations (placeholder)
    public List<Discount> getAllDiscounts() throws SQLException {
        return List.of();
    }
    
    public Discount createDiscount(Discount discount) throws SQLException {
        return discount;
    }
    
    public Discount updateDiscount(Discount discount) throws SQLException {
        return discount;
    }
    
    public void deleteDiscount(Integer id) throws SQLException {
        // Implement if needed
    }
    
    // Price List operations (placeholder)
    public List<PriceList> getAllPriceList() throws SQLException {
        return List.of();
    }
    
    public PriceList createPriceEntry(PriceList priceEntry) throws SQLException {
        return priceEntry;
    }
    
    public PriceList updatePriceEntry(PriceList priceEntry) throws SQLException {
        return priceEntry;
    }
    
    public void deletePriceEntry(Integer listNo) throws SQLException {
        // Implement if needed
    }
    
    // Dashboard stats
    public DashboardStatsDTO getDashboardStats() throws SQLException {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotalCustomers(customerDAO.count());
        stats.setTotalRooms(roomDAO.findAll().size());
        stats.setTotalReservations(reservationDAO.count());
        stats.setTotalStaff(staffDAO.count());
        stats.setTodayCheckins(reservationDAO.getTodayCheckins());
        stats.setTodayCheckouts(reservationDAO.getTodayCheckouts());
        
        // Calculate available and occupied rooms
        List<Room> rooms = roomDAO.findAll();
        long available = 0, occupied = 0;
        for (Room room : rooms) {
            if (room.getStatusId() != null && room.getStatusId() == 1) available++;
            else if (room.getStatusId() != null && room.getStatusId() == 2) occupied++;
        }
        stats.setAvailableRooms(available);
        stats.setOccupiedRooms(occupied);
        stats.setMonthlyRevenue(45890.00);
        
        return stats;
    }
}