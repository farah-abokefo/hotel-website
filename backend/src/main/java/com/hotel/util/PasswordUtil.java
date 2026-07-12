package com.hotel.util;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordUtil {
    
    /**
     * Hash password using BCrypt
     * @param plainPassword the plain text password
     * @return hashed password
     */
    public static String hashPassword(String plainPassword) {
        if (plainPassword == null || plainPassword.isEmpty()) {
            return null;
        }
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt());
    }
    
    /**
     * Verify password against stored hash
     * @param plainPassword the plain text password to check
     * @param storedPassword the stored password
     * @return true if password matches
     */
    public static boolean verifyPassword(String plainPassword, String storedPassword) {
        if (plainPassword == null || storedPassword == null) {
            return false;
        }
        
        // Check if stored password is BCrypt hash
        if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2y$")) {
            return BCrypt.checkpw(plainPassword, storedPassword);
        }
        
        // Plain text comparison (for demo)
        return plainPassword.equals(storedPassword);
    }
    
    /**
     * Check if password meets minimum requirements
     * @param password the password to check
     * @return true if password is at least 6 characters
     */
    public static boolean isPasswordStrong(String password) {
        return password != null && password.length() >= 6;
    }
    
    /**
     * Compare plain text passwords (for demo only)
     * @param plainPassword entered password
     * @param storedPassword stored password
     * @return true if they match
     */
    public static boolean checkPlainPassword(String plainPassword, String storedPassword) {
        if (plainPassword == null || storedPassword == null) {
            return false;
        }
        return plainPassword.equals(storedPassword);
    }
}