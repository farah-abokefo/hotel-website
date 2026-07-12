package com.hotel.util;

import java.util.UUID;

public class JwtUtil {
    
    public static String generateToken(String ssn, String role) {
        // Simple token format: ssn|role|timestamp|random
        return ssn + "|" + role + "|" + System.currentTimeMillis() + "|" + UUID.randomUUID().toString();
    }
    
    public static boolean isTokenValid(String token) {
        if (token == null || token.isEmpty()) return false;
        
        try {
            String[] parts = token.split("\\|");
            if (parts.length >= 3) {
                long timestamp = Long.parseLong(parts[2]);
                long currentTime = System.currentTimeMillis();
                // Token expires after 24 hours
                return (currentTime - timestamp) < 86400000;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }
    
    public static String getSsnFromToken(String token) {
        try {
            String[] parts = token.split("\\|");
            return parts[0];
        } catch (Exception e) {
            return null;
        }
    }
    
    public static String getRoleFromToken(String token) {
        try {
            String[] parts = token.split("\\|");
            return parts[1];
        } catch (Exception e) {
            return null;
        }
    }
}