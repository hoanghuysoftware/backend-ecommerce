package com.family.be.service.serviceIMPL;

import com.family.be.dto.request.OrderRequest;
import com.family.be.models.*;
import com.family.be.repository.CustomerRepository;
import com.family.be.repository.OrderRepository;
import com.family.be.repository.PaymentMethodRepository;
import com.family.be.repository.ProductRepository;
import com.family.be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceIMPL implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final PaymentMethodRepository paymentMethodRepo;

    private OrderStatus getOrderStatus(int statusValue) {
        return switch (statusValue) {
            case 0 -> OrderStatus.PENDING;
            case 1 -> OrderStatus.PROCESSING;
            case 2 -> OrderStatus.SHIPPED;
            case 3 -> OrderStatus.DELIVERED;
            case 4 -> OrderStatus.CANCELLED;
            default -> throw new IllegalArgumentException("Invalid status value");
        };
    }

    @Override
    @Transactional
    public OrderInfo createNewOrder(OrderRequest orderRequest) {
        Customer customer = customerRepository.findCustomerById(orderRequest.getIdCustomer());
        PaymentMethod paymentMethod = paymentMethodRepo.findPaymentMethodByNameMethod(
                PayMethod.valueOf(orderRequest.getPayMethod())
        );
        OrderInfo order = OrderInfo.builder()
                .customer(customer)
                .paymentMethod(paymentMethod)
                .totalPrice(0L)
                .totalQuantity(0L)
                .orderStatus(OrderStatus.PENDING)
                .noteOrder(orderRequest.getNoteOrder())
                .statusPay(orderRequest.isStatusPay())
                .dateOrder(new Date())
                .shippingAddress(orderRequest.getShippingAddress())
                .build();

        List<DetailsOrder> detailsOrders = new ArrayList<>();
        orderRequest.getOrderRequests().forEach(item -> {
            Product product = productRepository.getProductById(item.getIdProduct()).orElseThrow(() ->
                    new RuntimeException("Not found Product"));
            product.setQuantityProduct(product.getQuantityProduct() - item.getQuantityOrder());
            productRepository.save(product);
            DetailsOrder detailsOrder = DetailsOrder.builder()
                    .priceDetailsOrder(product.getPriceProduct())
                    .quantityDetailsOrder(item.getQuantityOrder())
                    .order(order)
                    .product(product)
                    .build();
            order.setTotalPrice(order.getTotalPrice() + (product.getPriceProduct()*item.getQuantityOrder()));
            order.setTotalQuantity(order.getTotalQuantity() + item.getQuantityOrder());
            detailsOrders.add(detailsOrder);
        });
        order.setDetailsOrders(detailsOrders);
        return orderRepository.save(order);
    }

    @Override
    public OrderInfo updateOrderStatus(Long idOrder, int orderStatus) {
        OrderInfo orderInfo = orderRepository.findOrderInfoById(idOrder).orElseThrow(() ->
                new RuntimeException("Not found order at OrderServiceIMPL in updateOrderStatus!"));
        orderInfo.setOrderStatus(getOrderStatus(orderStatus));
        return orderRepository.save(orderInfo);
    }

    @Override
    public OrderInfo updateOrderStatusPay(Long idOrder, boolean payStatus) {
        OrderInfo order = orderRepository.findOrderInfoById(idOrder).orElseThrow(() ->
                new RuntimeException("Not found order at OrderServiceIMPL in updateOrderStatusPay !"));
        order.setStatusPay(payStatus);
        return orderRepository.save(order);
    }

    @Override
    public OrderInfo getOrderById(Long id) {
        return orderRepository.findOrderInfoById(id).get();
    }

    @Override
    public List<OrderInfo> getAllOrder() {
        return orderRepository.findAll();
    }

    @Override
    public List<OrderInfo> getOrderInfoByCustomer(Long id) {
        return orderRepository.findOrderInfoByCustomer_Id(id);
    }
}
