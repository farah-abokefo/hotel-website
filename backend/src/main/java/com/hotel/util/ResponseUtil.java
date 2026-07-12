package com.hotel.util;

import jakarta.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

public class ResponseUtil {
    
    public static Response success(Object data) {
        return Response.ok(data).build();
    }
    
    public static Response success(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return Response.ok(response).build();
    }
    
    public static Response error(String message, int status) {
        Map<String, String> response = new HashMap<>();
        response.put("error", message);
        return Response.status(status).entity(response).build();
    }
    
    public static Response notFound(String message) {
        return error(message, Response.Status.NOT_FOUND.getStatusCode());
    }
    
    public static Response badRequest(String message) {
        return error(message, Response.Status.BAD_REQUEST.getStatusCode());
    }
    
    public static Response unauthorized(String message) {
    return Response.status(Response.Status.UNAUTHORIZED)
            .entity(Map.of("error", message))
            .build();
    }
    
    public static Response forbidden(String message) {
        return error(message, Response.Status.FORBIDDEN.getStatusCode());
    }
    
    public static Response internalError(String message) {
        return error(message, Response.Status.INTERNAL_SERVER_ERROR.getStatusCode());
    }
}