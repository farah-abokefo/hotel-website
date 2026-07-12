package com.hotel.dto;

public class DashboardStatsDTO {
    private long totalCustomers;
    private long totalRooms;
    private long totalReservations;
    private long totalStaff;
    private long availableRooms;
    private long occupiedRooms;
    private long todayCheckins;
    private long todayCheckouts;
    private double monthlyRevenue;
    
    // Getters and Setters
    public long getTotalCustomers() { return totalCustomers; }
    public void setTotalCustomers(long totalCustomers) { this.totalCustomers = totalCustomers; }
    public long getTotalRooms() { return totalRooms; }
    public void setTotalRooms(long totalRooms) { this.totalRooms = totalRooms; }
    public long getTotalReservations() { return totalReservations; }
    public void setTotalReservations(long totalReservations) { this.totalReservations = totalReservations; }
    public long getTotalStaff() { return totalStaff; }
    public void setTotalStaff(long totalStaff) { this.totalStaff = totalStaff; }
    public long getAvailableRooms() { return availableRooms; }
    public void setAvailableRooms(long availableRooms) { this.availableRooms = availableRooms; }
    public long getOccupiedRooms() { return occupiedRooms; }
    public void setOccupiedRooms(long occupiedRooms) { this.occupiedRooms = occupiedRooms; }
    public long getTodayCheckins() { return todayCheckins; }
    public void setTodayCheckins(long todayCheckins) { this.todayCheckins = todayCheckins; }
    public long getTodayCheckouts() { return todayCheckouts; }
    public void setTodayCheckouts(long todayCheckouts) { this.todayCheckouts = todayCheckouts; }
    public double getMonthlyRevenue() { return monthlyRevenue; }
    public void setMonthlyRevenue(double monthlyRevenue) { this.monthlyRevenue = monthlyRevenue; }
}