package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.repository.OrderRepository;

@Service
public class OrderServiceImp {
    @Autowired
    private OrderRepository orderRepository;
    public Order createOrder(OrderDTO orderDTO){
        Order order = new Order();

        order.setCustomerName(orderDTO.getCustomerName());
        order.setPhone(orderDTO.getPhone());
        order.setDiamondQuantity(orderDTO.getDiamondQuantity());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setStatus(orderDTO.getStatus());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setSize(orderDTO.getSize());
        order.setDiamond(orderDTO.getIsDiamond());

        return orderRepository.save(order);
    }
}
