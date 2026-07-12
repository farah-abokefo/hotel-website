package com.hotel.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseService {
    
    private static String getDbHost() {
        String host = System.getenv().getOrDefault("DB_HOST", "localhost");
        if ("docker".equals(System.getenv("RUN_ENV"))) {
            host = "host.docker.internal";
        }
        return host;
    }
    
    private static String getDbPort() {
        return System.getenv().getOrDefault("DB_PORT", "3306");
    }
    
    private static String getDbName() {
        return System.getenv().getOrDefault("DB_NAME", "hoteldb");
    }
    
    private static String getDbUser() {
        return System.getenv().getOrDefault("DB_USER", "root");
    }
    
    private static String getDbPassword() {
        return System.getenv().getOrDefault("DB_PASSWORD", "farah12012005");
    }
    
    private static String getJdbcUrl() {
        return String.format("jdbc:mysql://%s:%s/%s?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
                getDbHost(), getDbPort(), getDbName());
    }
    
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(getJdbcUrl(), getDbUser(), getDbPassword());
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found!", e);
        }
    }
    
    public static boolean testConnection() {
        try (Connection conn = getConnection()) {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            System.err.println("Database connection test failed: " + e.getMessage());
            return false;
        }
    }
    
    public static void close(ResultSet rs, PreparedStatement ps, Connection conn) {
        try { if (rs != null) rs.close(); } catch (SQLException e) { }
        try { if (ps != null) ps.close(); } catch (SQLException e) { }
        try { if (conn != null) conn.close(); } catch (SQLException e) { }
    }
    
    public static void close(PreparedStatement ps, Connection conn) {
        close(null, ps, conn);
    }
}
