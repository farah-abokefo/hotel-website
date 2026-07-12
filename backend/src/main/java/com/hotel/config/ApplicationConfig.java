package com.hotel.config;

import com.hotel.filter.AuthenticationFilter;
import com.hotel.resource.*;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        
        // Register resources
        resources.add(AuthResource.class);
        resources.add(CustomerResource.class);
        resources.add(StaffResource.class);
        resources.add(AdminResource.class);
        
        // Register authentication filter
        resources.add(AuthenticationFilter.class);
        
        return resources;
    }
}
