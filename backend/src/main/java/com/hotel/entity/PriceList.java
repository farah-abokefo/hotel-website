package com.hotel.entity;
import java.time.LocalDate;
public class PriceList {
    private Integer listNo;
    private Integer roomTypeId;
    private Double price;
    private LocalDate datee;
    private LocalDate expiryDate;
    private String notes;
    private String roomType;
    // Getters and Setters
    public Integer getListNo() { return listNo; }
    public void setListNo(Integer listNo) { this.listNo = listNo; }
    public Integer getRoomTypeId() { return roomTypeId; }
    public void setRoomTypeId(Integer roomTypeId) { this.roomTypeId = roomTypeId; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public LocalDate getDatee() { return datee; }
    public void setDatee(LocalDate datee) { this.datee = datee; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getRoomType() { return roomType; }
    public void setRoomType(String roomType) { this.roomType = roomType; }
}