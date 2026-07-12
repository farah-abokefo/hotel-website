<!-- markdownlint-disable MD033 -->
<p align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Jakarta_EE-10-007396?style=for-the-badge&logo=java&logoColor=white" alt="Jakarta EE 10"/>
  <img src="https://img.shields.io/badge/Tomcat-10-F8DC75?style=for-the-badge&logo=apache-tomcat&logoColor=black" alt="Apache Tomcat 10"/>
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL 8.0"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License"/>
</p>

<h1 align="center">🏨 Hotel Management System</h1>

<p align="center">
  <strong>A comprehensive Hotel Management System built with Java EE and MySQL</strong><br>
  <strong>Role-based access control for Administrators, Staff, and Customers</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-technologies-used">Tech Stack</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-user-roles--credentials">Credentials</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-authors">Authors</a>
</p>

---

## 📖 Table of Contents

<details>
<summary>Click to expand</summary>

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [User Roles & Credentials](#-user-roles--credentials)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Authors](#-authors)

</details>

---

## 📖 Overview

The **Hotel Management System** is a web-based application designed to streamline hotel operations including room reservations, customer management, staff management, service booking, and payment processing. The system provides three distinct user interfaces tailored for Administrators, Hotel Staff, and Customers.

### 🎯 Key Objectives

| Objective | Description |
|-----------|-------------|
| **Automate Booking** | Allow customers to book rooms online 24/7 |
| **Prevent Double Bookings** | Real-time room availability checking |
| **Centralize Data** | All hotel operations in one system |
| **Role-Based Access** | Admin, Staff, and Customer portals |
| **Real-time Reports** | Instant analytics for managers |
| **Improve Experience** | Self-service portal for guests |

---

## ✨ Features

### 👑 Admin Module

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Real-time statistics (customers, rooms, reservations, revenue) |
| 👥 **Customer Management** | Add, edit, view, and delete customers |
| 🛏️ **Room Management** | CRUD operations for rooms, types, and status |
| 📅 **Reservation Management** | View and manage all reservations |
| 👨‍💼 **Staff Management** | Add, edit, and manage staff members |
| 🏢 **Department Management** | Manage hotel departments |
| ⚙️ **Service Management** | Add and manage hotel services |
| 🏷️ **Discount Management** | Create and manage discount offers |
| 💰 **Price List Management** | Set and update room prices |

### 👤 Customer Module

| Feature | Description |
|---------|-------------|
| 🔐 **User Registration & Login** | Secure account creation and authentication |
| 🔍 **Room Browsing** | View available rooms with filters (type, price, status) |
| 📝 **Room Booking** | Select dates, choose rooms, and confirm reservations |
| 📋 **Booking History** | View past and upcoming reservations |
| 👤 **Profile Management** | Update personal information |
| ⚙️ **Service Booking** | Add services to existing reservations |
| 💳 **Payment History** | View payment records |

### 👨‍💼 Staff Module

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | View assigned tasks and statistics |
| ✅ **Task Management** | View, start, and complete assigned tasks |
| 🚪 **Check-in/Check-out** | Process guest check-ins and check-outs |
| 📋 **Reservation Management** | View and manage reservations |
| ⚙️ **Service Management** | View department services |

### 🔒 Security Features

| Feature | Description |
|---------|-------------|
| 🔑 **JWT Authentication** | Secure token-based authentication |
| 🛡️ **Role-Based Access Control** | Admin, Staff, Customer roles |
| 🔐 **Password Encryption** | BCrypt password hashing |
| ⏰ **Session Management** | Token expiration (2 hours) |
| 🌐 **CORS Protection** | Cross-origin resource sharing configuration |

---

## 🛠️ Technologies Used

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 21 | Core programming language |
| **Jakarta EE** | 10 | Enterprise Java framework |
| **Apache Tomcat** | 10.1.54 | Servlet container |
| **MySQL** | 8.0+ | Relational database |
| **JWT** | 0.11.5 | Authentication tokens |
| **BCrypt** | 0.4 | Password hashing |
| **Gson** | 2.10.1 | JSON processing |

### Frontend

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure |
| **CSS3** | Styling |
| **JavaScript** | Client-side logic |
| **Fetch API** | HTTP requests |

### Development Tools

| Tool | Purpose |
|------|---------|
| **VS Code / IntelliJ IDEA** | IDE |
| **Maven** | Build tool |
| **Git** | Version control |
| **MySQL Workbench** | Database management |
| **Postman** | API testing |

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Browser - HTML/CSS/JS] -->|HTTP Request| B[Apache Tomcat]
    B --> C[AuthFilter & CorsFilter]
    C --> D[Servlet Controller]
    D --> E[DAO Layer]
    E --> F[MySQL Database]
    
    style A fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#f093fb,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#4facfe,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#43e97b,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#fa709a,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#f6d365,stroke:#333,stroke-width:2px,color:#fff

    ┌─────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Admin UI  │  │ Customer UI │  │  Staff UI   │             │
│  │ (HTML/CSS/JS)│  │ (HTML/CSS/JS)│  │ (HTML/CSS/JS)│             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                     │
│         └────────────────┼────────────────┘                     │
│                          ▼                                      │
│                   HTTP Requests (REST API)                       │
├─────────────────────────────────────────────────────────────────┤
│                         APPLICATION LAYER                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Servlet Container (Tomcat)           │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │    │
│  │  │ AuthFilter  │  │   Auth      │  │   Admin     │    │    │
│  │  │ CorsFilter  │  │   Servlet   │  │   Servlet   │    │    │
│  │  │             │  │             │  │             │    │    │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │    │
│  │         │                │                │            │    │
│  │         └────────────────┼────────────────┘            │    │
│  │                          ▼                             │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │                    DAO Layer                    │   │    │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │   │    │
│  │  │  │ Customer │ │  Room    │ │Reservation│       │   │    │
│  │  │  │   DAO    │ │   DAO    │ │   DAO    │       │   │    │
│  │  │  └──────────┘ └──────────┘ └──────────┘       │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                           DATA LAYER                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    MySQL Database                       │    │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐         │    │
│  │  │ USERS  │ │CUSTOMER│ │  ROOM  │ │RESERV- │         │    │
│  │  │        │ │        │ │        │ │ ATION  │         │    │
│  │  └────────┘ └────────┘ └────────┘ └────────┘         │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

🗄️ Database Schema
Core Tables
Table	Description
USERS	Authentication (ssn, password, role)
CUSTOMER	Customer information
STAFF	Staff information
DEPARTMENT	Hotel departments
ROOM	Room details
ROOM_TYPE	Room categories (Standard, Deluxe, Suite, etc.)
ROOM_STATUS_TYPE	Status (Available, Occupied, Maintenance, Reserved)
RESERVATION	Booking records
SERVICE	Hotel services
PAYMENT	Payment transactions
DISCOUNT	Discount offers
PRICE_LIST	Room pricing
New Tables Added
Table	Purpose
STAFF_TASKS	Task management for staff
STAFF_SCHEDULE	Staff work schedules
STAFF_REVIEWS	Staff performance reviews
RESERVATION_SERVICE	Services linked to reservations
ER Diagram
text
┌─────────────────────────────────────────────────────────────────┐
│                    HOTEL MANAGEMENT SYSTEM ERD                   │
└─────────────────────────────────────────────────────────────────┘

MEMBERSHIP (1) ──────── (N) CUSTOMER (1) ──────── (N) RESERVATION
                                         │
                                         │
                                         │ (N)
                                         │
                                         ▼
                                    STAFF_RESERVATION (N)
                                         │
                                         │
ROOM (1) ──────── (N) RESERVATION ───────┘
    │
    │
    ▼
ROOM_TYPE (1) ──────── (N) PRICE_LIST

STAFF (1) ──────── (N) STAFF_TASKS
    │
    │
    ▼
DEPARTMENT (1) ──────── (N) STAFF

CUSTOMER (1) ──────── (N) PAYMENT
    │
    │
    ▼
SERVICE (1) ──────── (N) RESERVATION_SERVICE
📥 Installation & Setup
Prerequisites
Software	Version	Download Link
Java JDK	17+	Adoptium
Apache Tomcat	10+	Tomcat
MySQL	8.0+	MySQL
Maven	3.9+	Maven
Step 1: Clone the Repository
bash
git clone https://github.com/yourusername/hotel-management-system.git
cd hotel-management-system
Step 2: Setup Database
Open MySQL Workbench and run:

sql
-- Create database
CREATE DATABASE IF NOT EXISTS hoteldb;
USE hoteldb;

-- Run the schema file
source schema.sql;

-- Insert test data
source fake_mysql_data.sql;

-- Verify
SHOW TABLES;
SELECT * FROM USERS;
Step 3: Update Database Configuration
Edit src/main/java/com/hotel/config/DatabaseConfig.java:

java
package com.hotel.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConfig {
    private static final String URL = "jdbc:mysql://localhost:3306/hoteldb?useSSL=false&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "your_password"; // Change this!
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
Step 4: Build the Project
bash
# Using Maven
mvn clean package

# Or using Maven wrapper
./mvnw.cmd clean package   # Windows
./mvnw clean package       # Linux/Mac
Step 5: Deploy to Tomcat
bash
# Copy WAR file to Tomcat
cp target/hotel-system-1.0-SNAPSHOT.war C:\apache-tomcat-10.1.54\webapps\hotel-system.war

# Or copy files directly
xcopy src\main\webapp C:\apache-tomcat-10.1.54\webapps\hotel-system /E /I /Y
Step 6: Start Tomcat
bash
cd C:\apache-tomcat-10.1.54\bin
./startup.bat   # Windows
./startup.sh    # Linux/Mac
🚀 Running the Application
Access the Application
Open your browser and go to:

text
http://localhost:8080/hotel-system/login.html
Quick Deployment Script
<details> <summary><b>Windows (deploy.ps1)</b></summary>
powershell
# deploy.ps1
Write-Host "Stopping Tomcat..." -ForegroundColor Yellow
cd C:\apache-tomcat-10.1.54\bin
.\shutdown.bat
Start-Sleep -Seconds 5

Write-Host "Deploying..." -ForegroundColor Yellow
Copy-Item -Path "target\hotel-system-1.0-SNAPSHOT.war" -Destination "C:\apache-tomcat-10.1.54\webapps\hotel-system.war" -Force

Write-Host "Starting Tomcat..." -ForegroundColor Yellow
.\startup.bat

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Access: http://localhost:8080/hotel-system/" -ForegroundColor Cyan
</details><details> <summary><b>Linux/Mac (deploy.sh)</b></summary>
bash
#!/bin/bash
echo "Stopping Tomcat..."
/opt/tomcat/bin/shutdown.sh
sleep 5

echo "Deploying..."
cp target/hotel-system-1.0-SNAPSHOT.war /opt/tomcat/webapps/hotel-system.war

echo "Starting Tomcat..."
/opt/tomcat/bin/startup.sh

echo "Deployment complete!"
echo "Access: http://localhost:8080/hotel-system/"
</details>
👤 User Roles & Credentials
Default Credentials
Role	Username	Password
👑 Admin	admin	admin123
👤 Customer	(Any SSN from CUSTOMER table)	customer123
👨‍💼 Staff	(Any SSN from STAFF table)	staff123
Find Customer/Staff SSNs
sql
-- Get customer SSNs
SELECT ssn_CUST, first_name, last_name FROM CUSTOMER LIMIT 5;

-- Get staff SSNs
SELECT ssn_staff, first_name, last_name FROM STAFF LIMIT 5;
Insert a New User
sql
-- Insert admin user
INSERT INTO USERS (ssn, password, role) VALUES ('admin', 'admin123', 'admin');

-- Insert customer user (replace 'C001' with actual SSN)
INSERT INTO USERS (ssn, password, role) VALUES ('C001', 'customer123', 'customer');

-- Insert staff user (replace 'S001' with actual SSN)
INSERT INTO USERS (ssn, password, role) VALUES ('S001', 'staff123', 'staff');
🔌 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/login	User login
POST	/api/auth/register	Customer registration
GET	/api/auth/verify	Verify JWT token
Admin APIs
Method	Endpoint	Description
GET	/api/admin/customers	Get all customers
POST	/api/admin/customers	Create customer
PUT	/api/admin/customers/{ssn}	Update customer
DELETE	/api/admin/customers/{ssn}	Delete customer
GET	/api/admin/rooms	Get all rooms
POST	/api/admin/rooms	Create room
PUT	/api/admin/rooms/{number}	Update room
DELETE	/api/admin/rooms/{number}	Delete room
GET	/api/admin/reservations	Get all reservations
POST	/api/admin/reservations	Create reservation
PUT	/api/admin/reservations/{id}/status	Update reservation status
GET	/api/admin/dashboard/stats	Get dashboard statistics
Customer APIs
Method	Endpoint	Description
GET	/api/customer/profile	Get customer profile
PUT	/api/customer/profile	Update customer profile
GET	/api/customer/reservations	Get customer reservations
POST	/api/customer/reservations	Create reservation
DELETE	/api/customer/reservations/{id}	Cancel reservation
GET	/api/customer/stats	Get customer statistics
Staff APIs
Method	Endpoint	Description
GET	/api/staff/profile	Get staff profile
GET	/api/staff/tasks	Get assigned tasks
PUT	/api/staff/tasks/{id}/start	Start a task
PUT	/api/staff/tasks/{id}/complete	Complete a task
GET	/api/staff/reservations	Get handled reservations
GET	/api/staff/checkins/today	Get today's check-ins
GET	/api/staff/checkouts/today	Get today's check-outs
📁 Project Structure
text
hotel-system/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── hotel/
│       │           ├── config/
│       │           │   └── DatabaseConfig.java
│       │           ├── dao/
│       │           │   ├── UserDAO.java
│       │           │   ├── CustomerDAO.java
│       │           │   ├── RoomDAO.java
│       │           │   └── ReservationDAO.java
│       │           ├── model/
│       │           │   ├── User.java
│       │           │   ├── Customer.java
│       │           │   ├── Room.java
│       │           │   └── Reservation.java
│       │           ├── servlet/
│       │           │   ├── AuthServlet.java
│       │           │   ├── AdminServlet.java
│       │           │   ├── CustomerServlet.java
│       │           │   └── StaffServlet.java
│       │           ├── filter/
│       │           │   ├── AuthFilter.java
│       │           │   └── CorsFilter.java
│       │           └── util/
│       │               ├── JWTUtil.java
│       │               └── PasswordUtil.java
│       └── webapp/
│           ├── admin/
│           │   ├── dashboard.html
│           │   ├── customers.html
│           │   ├── rooms.html
│           │   ├── reservations.html
│           │   ├── services.html
│           │   ├── staff.html
│           │   └── departments.html
│           ├── customer/
│           │   ├── home.html
│           │   ├── profile.html
│           │   ├── reservation.html
│           │   ├── rooms.html
│           │   └── services.html
│           ├── staff/
│           │   ├── dashboard.html
│           │   └── services.html
│           ├── css/
│           │   └── styles.css
│           ├── js/
│           │   └── app.js
│           ├── WEB-INF/
│           │   └── web.xml
│           └── login.html
├── pom.xml
├── schema.sql
├── fake_mysql_data.sql
└── README.md
🧪 Testing
Test Login API
bash
curl -X POST http://localhost:8080/hotel-system/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
Expected Response
json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "role": "admin",
  "message": "Login successful"
}
Test Admin API (with token)
bash
curl -X GET http://localhost:8080/hotel-system/api/admin/customers \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
Test Room Booking
bash
curl -X POST http://localhost:8080/hotel-system/api/customer/reservations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "ssn_CUST": "C001",
    "room_number": 101,
    "check_in_date": "2024-12-01",
    "check_out_date": "2024-12-05",
    "status": "confirmed"
  }'
Expected Response
json
{
  "success": true,
  "message": "Reservation created successfully",
  "reservation_id": 1001
}
📊 System Diagrams
For detailed system diagrams:

Diagram	Description	Link
📊 Activity Diagrams	Flow of activities for each use case	View
🔄 Sequence Diagrams	Interaction between objects over time	View
🗄️ ERD Diagram	Database structure and relationships	View
📐 Class Diagram	System classes and their relationships	View
🧩 Component Diagram	System components and dependencies	View
🤝 Contributing
Fork the repository

Create your feature branch:

bash
git checkout -b feature/amazing-feature
Commit your changes:

bash
git commit -m 'Add amazing feature'
Push to the branch:

bash
git push origin feature/amazing-feature
Open a Pull Request

Contribution Guidelines
Follow the existing code style

Add comments for complex logic

Update documentation for new features

Write meaningful commit messages

Test your changes before submitting

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

text
MIT License

Copyright (c) 2024 Nada & Farah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
👩‍💻 Authors
<div align="center">
Name	Role	GitHub
Farah	Full Stack Developer	@farah-github
</div>
🙏 Acknowledgments
Special thanks to our instructors for guidance

Apache Tomcat team for the excellent servlet container

MySQL community for the reliable database

All contributors and testers

📞 Support & Contact
<div align="center">
Method	Details
📧 Email	support@hotelrms.com
🐛 Issues	GitHub Issues
📖 Documentation	Wiki
</div>
🎯 Future Enhancements
Email Notifications - Booking confirmations and reminders

PDF Invoice Generation - Downloadable invoices

Online Payment Integration - Stripe/PayPal

Mobile App - React Native or Flutter

Multi-language Support - Arabic, English, etc.

Advanced Reporting - Custom report builder

Real-time Calendar - Visual room availability

Chat Support - Live chat for customers

Reviews & Ratings - Customer feedback system

Analytics Dashboard - Interactive charts and graphs

<div align="center">
⭐ Star Us on GitHub
If you find this project useful, please give it a star!

https://img.shields.io/github/stars/yourusername/hotel-management-system?style=social
https://img.shields.io/github/forks/yourusername/hotel-management-system?style=social

Built with ❤️ by  Farah

</div> ```
How to Use
Copy the entire content above

Create a file named README.md in your project root

Paste the content

Replace yourusername with your actual GitHub username

Add your actual email addresses

Commit and push to GitHub