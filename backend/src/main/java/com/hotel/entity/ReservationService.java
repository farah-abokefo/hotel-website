package com.hotel.entity;
import java.time.LocalDateTime;
public class ReservationService {
    private Integer id;
    private Integer reservationId;
    private Integer serviceId;
    private Integer quantity;
    private Double priceAtTime;
    private LocalDateTime addedDate;
    protected void onCreate() {
        addedDate = LocalDateTime.now();
        if (quantity == null) quantity = 1;
    }
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getReservationId() { return reservationId; }
    public void setReservationId(Integer reservationId) { this.reservationId = reservationId; }
    public Integer getServiceId() { return serviceId; }
    public void setServiceId(Integer serviceId) { this.serviceId = serviceId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public Double getPriceAtTime() { return priceAtTime; }
    public void setPriceAtTime(Double priceAtTime) { this.priceAtTime = priceAtTime; }
    public LocalDateTime getAddedDate() { return addedDate; }
    public void setAddedDate(LocalDateTime addedDate) { this.addedDate = addedDate; }
}