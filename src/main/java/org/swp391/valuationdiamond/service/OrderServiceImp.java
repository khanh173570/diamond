package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.entity.*;
import org.swp391.valuationdiamond.repository.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EvaluationRequestRepository evaluationRequestRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private EvaluationServiceRepository evaluationServiceRepository;

    public Order saveOrder(OrderDTO orderDTO) {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));

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
        Order savedOrder = orderRepository.save(order);

        List<OrderDetail> orderDetails = orderDTO.getOrderDetails().stream()
                .map(od -> {
                    EvaluationService service = evaluationServiceRepository.findById(od.getServiceId())
                            .orElseThrow(() -> new RuntimeException("Service not found"));

                    long countDetail = orderDetailRepository.count();
                    String formattedCountDetail = String.valueOf(countDetail + 1);
                    String orderDetailId = "OD" + formattedCountDetail + date;

                    OrderDetail orderDetail = new OrderDetail();
                    orderDetail.setOrderDetailId(orderDetailId);
                    orderDetail.setReceivedDate(od.getReceivedDate());
                    orderDetail.setExpiredReceivedDate(od.getExpiredReceivedDate());
                    orderDetail.setUnitPrice(od.getUnitPrice());
                    orderDetail.setSize(od.getSize());
                    orderDetail.setIsDiamond(od.getIsDiamond());
                    orderDetail.setImg(od.getImg());
                    orderDetail.setStatus("In-Progress");
                    orderDetail.setServiceId(service);
                    orderDetail.setEvaluationStaffId(od.getEvaluationStaffId());
                    orderDetail.setOrderId(savedOrder);

                    return orderDetailRepository.save(orderDetail);
                })
                .collect(Collectors.toList());

        savedOrder.setOrderDetailId(orderDetails);
        return savedOrder;
    }


    public Order createOrder(OrderDTO orderDTO) {
        Order order = new Order();

        long count = orderRepository.count();
        String formattedCount = String.valueOf(count + 1);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        String requestId = "Or" + formattedCount + date;

        order.setOrderId(requestId);
        order.setCustomerName(orderDTO.getCustomerName());
        order.setPhone(orderDTO.getPhone());
        order.setDiamondQuantity(orderDTO.getDiamondQuantity());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setStatus(orderDTO.getStatus());
        order.setTotalPrice(orderDTO.getTotalPrice());

        User userId = userRepository.findById(orderDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        order.setUserId(userId);

        EvaluationRequest evaluationRequest = evaluationRequestRepository.findById(orderDTO.getRequestId()).orElseThrow(() -> new RuntimeException("Request not found"));

        order.setRequestId(evaluationRequest);
        return orderRepository.save(order);

    }

    public List<Order> getOrders() {

        return  orderRepository.findOrderByStatus("In-Progress");
    }

    public List<Order> getAllOrders() {
        return  orderRepository.findAll();
    }

    public Order getOrder(String id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }

    //API get order by request id
    public List<Order> getOrderByRequest(String requestId) {
        EvaluationRequest request = evaluationRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        return orderRepository.findOrderByRequestId(request);
    }

    public Order updateOrderStatus(String orderId, OrderDTO orderDTO){
        Order order= orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

        if (orderDTO.getStatus() != null) {
            order.setStatus(orderDTO.getStatus());
        }
        return orderRepository.save(order);
    }
}
