package com.family.be.service;

import com.family.be.dto.request.OrderRequest;
import com.family.be.models.OrderInfo;

import java.util.List;

public interface OrderService {
    OrderInfo createNewOrder(OrderRequest orderRequest);
    OrderInfo updateOrderStatus(Long idOrder, int orderStatus);
    OrderInfo updateOrderStatusPay(Long idOrder, boolean payStatus);
    OrderInfo getOrderById(Long id);
    List<OrderInfo> getAllOrder();
    List<OrderInfo> getOrderInfoByCustomer(Long id);
}
