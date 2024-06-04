package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
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

    //hàm còn sai xíu
    public Order saveOrder(OrderDTO orderDTO) {
        //này là tìm xem user có trong database không
        User user = userRepository.findById(orderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        // tương tự
        EvaluationRequest request = evaluationRequestRepository.findById(orderDTO.getRequestId())
                .orElseThrow(() -> new RuntimeException("Request not found"));

        long count = orderRepository.count();
            String formattedCount = String.valueOf(count + 1);
            String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
            String orderId = "Or" + formattedCount + date;

        //builder là cái trong lombok giúp gọn cái code hơn thay vì làm như hồi đó mình học java
        // muốn xài này chỉ cần khai báo trong entity là @Builder
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
                    String formattedCountDetail = String.valueOf(count + 1);
                    String dateDetail = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
                     String orderDetailId = "OD" + formattedCountDetail + dateDetail;

                    return OrderDetail.builder()
                            .orderId(order)
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

        order.setOrderDetailId(orderDetails);

        return orderRepository.save(order);
    }


    public List<Order> getOrders() {

        return  orderRepository.findOrderByStatus("In Process");
    }

    public  Order getOrder(String id){
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }

}
