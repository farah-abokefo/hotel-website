package com.hotel.entity;
public class Service {
    private Integer serviceId;
    private String serviceName;
    private String description;
    private Double price;
    private String category;
    private Integer duration;
    private String status;
    private String depId;
    private String imageUrl;
    protected void onCreate() {
        if (status == null) status = "active";
        if (price == null) price = 0.0;
    }
    // Getters and Setters
    public Integer getServiceId() { return serviceId; }
    public void setServiceId(Integer serviceId) { this.serviceId = serviceId; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDepId() { return depId; }
    public void setDepId(String depId) { this.depId = depId; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}