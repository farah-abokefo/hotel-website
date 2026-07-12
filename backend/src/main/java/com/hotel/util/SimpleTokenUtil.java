package com.hotel.util;

import java.util.UUID;

public class SimpleTokenUtil {
    
    public static String generateToken(String ssn, String role) {
        // Simple token for testing
        return "token-" + ssn + "-" + UUID.randomUUID().toString();
    }
    
    public static String getSsnFromToken(String token) {
        if (token == null || !token.startsWith("token-")) {
            return null;
        }
        String[] parts = token.split("-");
        if (parts.length >= 2) {
            return parts[1];
        }
        return null;
    }
    
    public static String getRoleFromToken(String token) {
        // For simplicity, we can store role in token or just return based on prefix
        String ssn = getSsnFromToken(token);
        if (ssn == null) return null;
        if ("admin".equals(ssn)) return "admin";
        if ("staff".equals(ssn)) return "staff";
        return "customer";
    }
    
    public static boolean isTokenValid(String token) {
        return token != null && token.startsWith("token-");
    }
}
