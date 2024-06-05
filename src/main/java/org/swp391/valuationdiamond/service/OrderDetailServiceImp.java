package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.dto.OrderDetailDTO;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.EvaluationServiceRepository;
import org.swp391.valuationdiamond.repository.OrderDetailRepository;
import org.swp391.valuationdiamond.repository.OrderRepository;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDetailServiceImp {
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EvaluationServiceRepository evaluationServiceRepository;
    public List<OrderDetail> saveAllOrderDetails(List<OrderDetailDTO> orderDetailsDTO) {
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (OrderDetailDTO orderDetailDTO : orderDetailsDTO) {
            OrderDetail orderDetails = new OrderDetail();

            long count = orderDetailRepository.count();
            String formattedCount = String.valueOf(count + 1);
            String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
            String orderDetailId = "OD" + formattedCount + date;

            orderDetails.setOrderDetailId(orderDetailId);
            orderDetails.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());
            orderDetails.setReceivedDate(orderDetailDTO.getReceivedDate());
            orderDetails.setExpiredReceivedDate(orderDetailDTO.getExpiredReceivedDate());
            orderDetails.setUnitPrice(orderDetailDTO.getUnitPrice());
            orderDetails.setImg(orderDetailDTO.getImg());
            orderDetails.setSize(orderDetailDTO.getSize());
            orderDetails.setDiamond(orderDetailDTO.isDiamond());
            orderDetails.setStatus("In-Progress");


            Order orderId = orderRepository.findById(orderDetailDTO.getOrderId()).orElseThrow(() -> new RuntimeException("OrderId not found"));
            orderDetails.setOrderId(orderId);

            EvaluationService serviceId = evaluationServiceRepository.findById(orderDetailDTO.getServiceId()).orElseThrow(() -> new RuntimeException("Service not found"));
            orderDetails.setServiceId(serviceId);

            orderDetailList.add(orderDetails);
        }
        return orderDetailRepository.saveAll(orderDetailList);
    }
    //    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO){
//        OrderDetail orderDetail  = new OrderDetail();
//
//        orderDetail.setReceivedDate(orderDetailDTO.getReceived_date());
//        orderDetail.setExpiredReceivedDate(orderDetailDTO.getExpired_received_date());
//        orderDetail.setUnitPrice(orderDetailDTO.getUnit_price());
//        orderDetail.setImg(orderDetailDTO.getImg());
//        orderDetail.setStatus(orderDetailDTO.getStatus());
////        orderDetail.setOrderId(orderDetailDTO.getOrderId());
////        orderDetail.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());
////        orderDetail.setServiceId(orderDetailDTO.getServiceId());
//
//        return orderDetailRepository.save(orderDetail);
//    }
    public  OrderDetail getOrderDetailId(String id){
        return orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }
    public OrderDetail updateOrderDe(String orderDetailId, OrderDetailDTO orderDetailDTO){
        OrderDetail orderDetail = getOrderDetailId(orderDetailId);

        orderDetail.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());
        orderDetail.setReceivedDate(orderDetailDTO.getReceivedDate());
        orderDetail.setExpiredReceivedDate(orderDetailDTO.getExpiredReceivedDate());
        orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
        orderDetail.setSize(orderDetailDTO.getSize());
        orderDetail.setDiamond(orderDetailDTO.isDiamond());
        orderDetail.setImg(orderDetailDTO.getImg());
        orderDetail.setStatus(orderDetailDTO.getStatus());

        // Set Order
        if (orderDetailDTO.getOrderId() != null) {
            Order order = orderRepository.findById(orderDetailDTO.getOrderId()).orElse(null);
            orderDetail.setOrderId(order);
        }

        // Set Service
        if (orderDetailDTO.getServiceId() != null) {
            EvaluationService service = evaluationServiceRepository.findById(orderDetailDTO.getServiceId()).orElse(null);
            orderDetail.setServiceId(service);
        }
        return orderDetailRepository.save(orderDetail);
    }
    public List<OrderDetail> getOrderDetailsByOrderId(String orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
        return orderDetailRepository.findByOrderId(order);
    }
}

