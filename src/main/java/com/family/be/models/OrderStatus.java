package com.family.be.models;

public enum OrderStatus {
    PENDING, //Đang chờ xử lý.
    PROCESSING, //Đang xử lý.
    SHIPPED, //Đã giao hàng
    DELIVERED, //Đã giao hàng thành công.
    CANCELLED //Đã hủy.
}


