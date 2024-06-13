package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDetailDTO;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.EvaluationServiceRepository;
import org.swp391.valuationdiamond.repository.OrderDetailRepository;
import org.swp391.valuationdiamond.repository.OrderRepository;
import org.swp391.valuationdiamond.repository.UserRepository;

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
//    public List<OrderDetail> saveAllOrderDetails(List<OrderDetailDTO> orderDetailsDTO) {
//        List<OrderDetail> orderDetailList = new ArrayList<>();
//        for (OrderDetailDTO orderDetailDTO : orderDetailsDTO) {
//            OrderDetail orderDetails = new OrderDetail();
//
//            long count = orderDetailRepository.count();
//            String formattedCount = String.valueOf(count + 1);
//            String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
//            String orderDetailId = "OD" + formattedCount + date;
//
//            orderDetails.setOrderDetailId(orderDetailId);
//            orderDetails.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());
//            orderDetails.setReceivedDate(orderDetailDTO.getReceivedDate());
//            orderDetails.setExpiredReceivedDate(orderDetailDTO.getExpiredReceivedDate());
//            orderDetails.setUnitPrice(orderDetailDTO.getUnitPrice());
//            orderDetails.setImg(orderDetailDTO.getImg());
//            orderDetails.setSize(orderDetailDTO.getSize());
//            orderDetails.setDiamond(orderDetailDTO.isDiamond());
//            orderDetails.setStatus("In-Progress");
//
//
//            Order orderId = orderRepository.findById(orderDetailDTO.getOrderId()).orElseThrow(() -> new RuntimeException("OrderId not found"));
//            orderDetails.setOrderId(orderId);
//
//            EvaluationService serviceId = evaluationServiceRepository.findById(orderDetailDTO.getServiceId()).orElseThrow(() -> new RuntimeException("Service not found"));
//            orderDetails.setServiceId(serviceId);
//
//            orderDetailList.add(orderDetails);
//        }
//        return orderDetailRepository.saveAll(orderDetailList);
//    }
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

    public OrderDetail updateOrderDeStatus(String orderDetailId, OrderDetailDTO orderDetailDTO){
        OrderDetail orderDetail = getOrderDetailId(orderDetailId);

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


    //update thằng staff
    public OrderDetail updateOrderDeEvaluationStaff(String orderDetailId, OrderDetailDTO orderDetailDTO){
        OrderDetail orderDetail = getOrderDetailId(orderDetailId);

        orderDetail.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());

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

    public List<OrderDetail> getOrderDetailsByOrderStatusInProgress() {
        return orderDetailRepository.findByStatus("In-Progress");
    }

    //ham getall

    public List<OrderDetail> getAllOrderDetail() {
        return orderDetailRepository.findAll();
    }

    //hàm get staff == null
    public List<OrderDetail> getOrderDetailByEvaluationStaffIsNull(){
        return orderDetailRepository.findByEvaluationStaffIdIsNull();
    }
    public OrderDetail updateOrderDeIsDiamond(String orderDetailId, OrderDetailDTO orderDetailDTO){
        OrderDetail orderDetail = getOrderDetailId(orderDetailId);
        orderDetail.setIsDiamond(orderDetailDTO.getIsDiamond());
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
    public OrderDetail updateOrderDetail(String orderDetailId, OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElseThrow(() -> new RuntimeException("Order detail not found"));

        // Update properties from DTO only if they are not null
        if (orderDetailDTO.getOrderDetailId() != null) {
            orderDetail.setOrderDetailId(orderDetailDTO.getOrderDetailId());
        }
        if (orderDetailDTO.getEvaluationStaffId() != null) {
            orderDetail.setEvaluationStaffId(orderDetailDTO.getEvaluationStaffId());
        }
        if (orderDetailDTO.getStatus() != null) {
            orderDetail.setStatus(orderDetailDTO.getStatus());
        }
        if (orderDetailDTO.getUnitPrice() != null) {
            orderDetail.setUnitPrice(orderDetailDTO.getUnitPrice());
        }
        if (orderDetailDTO.getReceivedDate() != null) {
            orderDetail.setReceivedDate(orderDetailDTO.getReceivedDate());
        }
        if (orderDetailDTO.getExpiredReceivedDate() != null) {
            orderDetail.setExpiredReceivedDate(orderDetailDTO.getExpiredReceivedDate());
        }
        if (orderDetailDTO.getImg() != null) {
            orderDetail.setImg(orderDetailDTO.getImg());
        }
        if (orderDetailDTO.getSize() != null) {
            orderDetail.setSize(orderDetailDTO.getSize());
        }
        if (orderDetailDTO.getIsDiamond() != null) {
            orderDetail.setIsDiamond(orderDetailDTO.getIsDiamond());
        }
        // Add more properties as needed

        return orderDetailRepository.save(orderDetail);
    }
    public List<OrderDetail> getOrderDetailsByUserId(String userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            return orderDetailRepository.findByUserId(user);
        }
        return null;
    }

}

