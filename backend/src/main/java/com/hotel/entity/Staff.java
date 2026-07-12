package com.hotel.entity;

import java.time.LocalDate;

public class Staff {
    
    private String ssnStaff;
    private String firstName;
    private String lastName;
    private String contactNumber;
    private String sex;
    private LocalDate birthdate;
    private Double salary;
    private String depId;
    private String address;
    private String role;
    private String departmentName;
    
    // Getters and Setters
    public String getSsnStaff() { return ssnStaff; }
    public void setSsnStaff(String ssnStaff) { this.ssnStaff = ssnStaff; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    
    public LocalDate getBirthdate() { return birthdate; }
    public void setBirthdate(LocalDate birthdate) { this.birthdate = birthdate; }
    
    public Double getSalary() { return salary; }
    public void setSalary(Double salary) { this.salary = salary; }
    
    public String getDepId() { return depId; }
    public void setDepId(String depId) { this.depId = depId; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
}
