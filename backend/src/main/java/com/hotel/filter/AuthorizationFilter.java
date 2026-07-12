package com.hotel.filter;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import java.io.IOException;

@Provider
public class AuthorizationFilter implements ContainerRequestFilter {
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        String path = requestContext.getUriInfo().getPath();
        String role = (String) requestContext.getProperty("user_role");
        
        if (path.startsWith("admin/") && !"admin".equals(role)) {
            requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Admin access required\"}")
                    .build());
            return;
        }
        
        if (path.startsWith("staff/") && !"admin".equals(role) && !"staff".equals(role)) {
            requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
                    .entity("{\"error\":\"Staff access required\"}")
                    .build());
            return;
        }
    }
}