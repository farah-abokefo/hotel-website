# 🏨 Hotel Management System

A comprehensive Hotel Management System built with Java EE (Jakarta EE) and MySQL, featuring role-based access control for Administrators, Staff, and Customers.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [User Roles & Credentials](#user-roles--credentials)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)

---

## 📖 Overview

The **Hotel Management System** is a web-based application designed to streamline hotel operations including room reservations, customer management, staff management, service booking, and payment processing. The system provides three distinct user interfaces tailored for Administrators, Hotel Staff, and Customers.

### Key Objectives

- Automate the hotel booking process
- Prevent double bookings with real-time availability
- Centralize customer and reservation data
- Provide role-based access control
- Generate reports and analytics for management

---

## ✨ Features

### 👑 Admin Module
- **Dashboard**: Real-time statistics (total customers, rooms, reservations, revenue)
- **Customer Management**: Add, edit, view, and delete customers
- **Room Management**: CRUD operations for rooms, types, and status
- **Reservation Management**: View and manage all reservations
- **Staff Management**: Add, edit, and manage staff members
- **Department Management**: Manage hotel departments
- **Service Management**: Add and manage hotel services
- **Discount Management**: Create and manage discount offers
- **Price List Management**: Set and update room prices

### 👤 Customer Module
- **User Registration & Login**: Secure account creation and authentication
- **Room Browsing**: View available rooms with filters (type, price, status)
- **Room Booking**: Select dates, choose rooms, and confirm reservations
- **Booking History**: View past and upcoming reservations
- **Profile Management**: Update personal information
- **Service Booking**: Add services to existing reservations
- **Payment History**: View payment records

### 👨‍💼 Staff Module
- **Dashboard**: View assigned tasks and statistics
- **Task Management**: View, start, and complete assigned tasks
- **Check-in/Check-out**: Process guest check-ins and check-outs
- **Reservation Management**: View and manage reservations
- **Service Management**: View department services

### 🔒 Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, Staff, Customer roles
- **Password Encryption**: BCrypt password hashing
- **Session Management**: Token expiration (2 hours)
- **CORS Protection**: Cross-origin resource sharing configuration

---

## 🛠️ Technologies Used

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Core programming language |
| Jakarta EE | 10 | Enterprise Java framework |
| Apache Tomcat | 10.1.54 | Servlet container |
| MySQL | 8.0+ | Relational database |
| JWT | 0.11.5 | Authentication tokens |
| BCrypt | 0.4 | Password hashing |
| Gson | 2.10.1 | JSON processing |

### Frontend
| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript | Client-side logic |
| Fetch API | HTTP requests |

### Development Tools
| Tool | Purpose |
|------|---------|
| VS Code / IntelliJ IDEA | IDE |
| Maven | Build tool |
| Git | Version control |
| MySQL Workbench | Database management |
| Postman | API testing |

---

## 🏗️ System Architecture
