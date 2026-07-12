package com.hotel.dao;

import com.hotel.entity.RoomType;
import com.hotel.util.DBUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RoomTypeDAO {
    
    public List<RoomType> findAll() throws SQLException {
        List<RoomType> roomTypes = new ArrayList<>();
        String sql = "SELECT * FROM ROOM_TYPE ORDER BY room_type";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                roomTypes.add(mapResultSetToRoomType(rs));
            }
        }
        return roomTypes;
    }
    
    public RoomType findById(Integer id) throws SQLException {
        String sql = "SELECT * FROM ROOM_TYPE WHERE room_type_id = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToRoomType(rs);
            }
        }
        return null;
    }
    
    private RoomType mapResultSetToRoomType(ResultSet rs) throws SQLException {
        RoomType roomType = new RoomType();
        roomType.setRoomTypeId(rs.getInt("room_type_id"));
        roomType.setRoomType(rs.getString("room_type"));
        roomType.setDescription(rs.getString("description"));
        roomType.setCapacity(rs.getInt("capacity"));
        roomType.setBedType(rs.getString("bed_type"));
        return roomType;
    }
}