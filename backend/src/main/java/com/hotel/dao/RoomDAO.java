package com.hotel.dao;

import com.hotel.entity.Room;
import com.hotel.util.DBUtil;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class RoomDAO {
    
    public List<Room> findAll() throws SQLException {
        List<Room> rooms = new ArrayList<>();
        String sql = "SELECT r.*, rt.room_type, rst.status_name FROM ROOM r LEFT JOIN ROOM_TYPE rt ON r.room_type_id = rt.room_type_id LEFT JOIN ROOM_STATUS_TYPE rst ON r.status_id = rst.status_id ORDER BY r.room_number";
        try (Connection conn = DBUtil.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                rooms.add(mapResultSetToRoom(rs));
            }
        }
        return rooms;
    }
    
    public Room findByNumber(Integer roomNumber) throws SQLException {
        String sql = "SELECT r.*, rt.room_type, rst.status_name FROM ROOM r LEFT JOIN ROOM_TYPE rt ON r.room_type_id = rt.room_type_id LEFT JOIN ROOM_STATUS_TYPE rst ON r.status_id = rst.status_id WHERE r.room_number = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, roomNumber);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return mapResultSetToRoom(rs);
            }
        }
        return null;
    }
    
    public List<Room> findAvailableRooms(LocalDate checkIn, LocalDate checkOut) throws SQLException {
        List<Room> rooms = new ArrayList<>();
        String sql = "SELECT r.*, rt.room_type, rst.status_name, " +
                     "(SELECT price FROM PRICE_LIST WHERE room_type_id = r.room_type_id AND datee <= CURDATE() ORDER BY datee DESC LIMIT 1) as current_price " +
                     "FROM ROOM r " +
                     "LEFT JOIN ROOM_TYPE rt ON r.room_type_id = rt.room_type_id " +
                     "LEFT JOIN ROOM_STATUS_TYPE rst ON r.status_id = rst.status_id " +
                     "WHERE r.status_id = 1 " +
                     "AND r.room_number NOT IN (" +
                     "  SELECT room_number FROM RESERVATION " +
                     "  WHERE status IN ('confirmed', 'checked-in') " +
                     "  AND ((check_in_date <= ? AND check_out_date >= ?) " +
                     "  OR (check_in_date <= ? AND check_out_date >= ?) " +
                     "  OR (check_in_date >= ? AND check_out_date <= ?))" +
                     ") ORDER BY r.room_number";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setDate(1, Date.valueOf(checkOut));
            stmt.setDate(2, Date.valueOf(checkIn));
            stmt.setDate(3, Date.valueOf(checkOut));
            stmt.setDate(4, Date.valueOf(checkIn));
            stmt.setDate(5, Date.valueOf(checkIn));
            stmt.setDate(6, Date.valueOf(checkOut));
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Room room = mapResultSetToRoom(rs);
                room.setCurrentPrice(rs.getDouble("current_price"));
                rooms.add(room);
            }
        }
        return rooms;
    }
    
    public void create(Room room) throws SQLException {
        String sql = "INSERT INTO ROOM (room_number, floor_number, room_type_id, status_id) VALUES (?, ?, ?, ?)";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, room.getRoomNumber());
            stmt.setInt(2, room.getFloorNumber());
            stmt.setInt(3, room.getRoomTypeId());
            stmt.setInt(4, room.getStatusId() != null ? room.getStatusId() : 1);
            stmt.executeUpdate();
        }
    }
    
    public void update(Room room) throws SQLException {
        String sql = "UPDATE ROOM SET floor_number=?, room_type_id=?, status_id=? WHERE room_number=?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, room.getFloorNumber());
            stmt.setInt(2, room.getRoomTypeId());
            stmt.setInt(3, room.getStatusId());
            stmt.setInt(4, room.getRoomNumber());
            stmt.executeUpdate();
        }
    }
    
    public void delete(Integer roomNumber) throws SQLException {
        String sql = "DELETE FROM ROOM WHERE room_number = ?";
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, roomNumber);
            stmt.executeUpdate();
        }
    }
    
    private Room mapResultSetToRoom(ResultSet rs) throws SQLException {
        Room room = new Room();
        room.setRoomNumber(rs.getInt("room_number"));
        room.setFloorNumber(rs.getInt("floor_number"));
        room.setRoomTypeId(rs.getInt("room_type_id"));
        room.setStatusId(rs.getInt("status_id"));
        room.setRoomType(rs.getString("room_type"));
        room.setStatusName(rs.getString("status_name"));
        return room;
    }
}