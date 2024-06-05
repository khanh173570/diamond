package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.entity.*;
import org.swp391.valuationdiamond.repository.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EvaluationServiceRepository evaluationServiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EvaluationRequestRepository evaluationRequestRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;


    public Order saveOrder(OrderDTO orderDTO) {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));

        System.out.println("User ID: " + orderDTO.getUserId());
        System.out.println("Request ID: " + orderDTO.getRequestId());

        User user = userRepository.findById(orderDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        EvaluationRequest request = evaluationRequestRepository.findById(orderDTO.getRequestId()).orElseThrow(() -> new RuntimeException("Request not found"));

        if (orderDTO.getUserId() == null || orderDTO.getRequestId() == null) {
            throw new IllegalArgumentException("User ID and Request ID must not be null");
        }

        long count = orderRepository.count();
        String formattedCount = String.valueOf(count + 1);
        String orderId = "Or" + formattedCount + date;

        Order order = Order.builder()
                .orderId(orderId)
                .customerName(orderDTO.getCustomerName())
                .phone(orderDTO.getPhone())
                .diamondQuantity(orderDTO.getDiamondQuantity())
                .orderDate(orderDTO.getOrderDate())
                .status("In-Progress")
                .totalPrice(orderDTO.getTotalPrice())
                .userId(user)
                .requestId(request)
                .build();

        List<OrderDetail> orderDetails = orderDTO.getOrderDetails().stream()
                .map(od -> {
                    EvaluationService service = evaluationServiceRepository.findById(od.getServiceId())
                            .orElseThrow(() -> new RuntimeException("Service not found"));

                    long countDetail = orderDetailRepository.count();
                    String formattedCountDetail = String.valueOf(countDetail + 1);
                    String orderDetailId = "OD" + formattedCountDetail + date;

                    return OrderDetail.builder()
                            .orderDetailId(orderDetailId)
                            .receivedDate(od.getReceivedDate())
                            .expiredReceivedDate(od.getExpiredReceivedDate())
                            .unitPrice(od.getUnitPrice())
                            .size(od.getSize())
                            .isDiamond(od.isDiamond())
                            .img(od.getImg())
                            .status("In-Progress")
                            .orderId(order)
                            .serviceId(service)
                            .evaluationStaffId(od.getEvaluationStaffId())
                            .build();
                })
                .collect(Collectors.toList());

        Order savedOrder = orderRepository.save(order);

        String newOrderId = savedOrder.getOrderId();

        orderDetails.forEach(od -> od.setOrderId(savedOrder));

        orderDetailRepository.saveAll(orderDetails);

        return savedOrder;
    }
//
//
//    public List<Order> getOrders() {
//        return  orderRepository.findOrderByStatus("In-Progress");
//    }


    public  Order getOrder(String id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }

}
