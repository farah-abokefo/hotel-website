package com.hotel.filter;

import com.hotel.util.JwtUtil;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;

@Provider
public class AuthenticationFilter implements ContainerRequestFilter {
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String path = requestContext.getUriInfo().getPath();
        
        // Skip authentication for login endpoint
        if (path.equals("auth/login")) {
            return;
        }
        
        // Get Authorization header
        String authHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            
            if (JwtUtil.isTokenValid(token)) {
                String ssn = JwtUtil.getSsnFromToken(token);
                String role = JwtUtil.getRoleFromToken(token);
                
                // Set security context
                final SecurityContext originalContext = requestContext.getSecurityContext();
                requestContext.setSecurityContext(new SecurityContext() {
                    @Override
                    public Principal getUserPrincipal() {
                        return () -> ssn;
                    }
                    
                    @Override
                    public boolean isUserInRole(String roleName) {
                        return role.equals(roleName);
                    }
                    
                    @Override
                    public boolean isSecure() {
                        return originalContext.isSecure();
                    }
                    
                    @Override
                    public String getAuthenticationScheme() {
                        return "Bearer";
                    }
                });
                return;
            }
        }
        
        // If no valid token, return unauthorized
        requestContext.abortWith(
            Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"Unauthorized - Invalid or missing token\"}")
                    .build()
        );
    }
}
