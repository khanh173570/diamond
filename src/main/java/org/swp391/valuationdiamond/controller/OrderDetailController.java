package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.OrderDetailDTO;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.service.OrderDetailServiceImp;
import org.swp391.valuationdiamond.service.OrderServiceImp;

import java.util.List;

@RequestMapping("/order_detail_request")
@RestController
public class OrderDetailController {
    @Autowired
    private OrderDetailServiceImp orderDetailServiceImp;
//    @PostMapping ("/create")
//    OrderDetail createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO){
//        return orderDetailServiceImp.createOrderDetail(orderDetailDTO);
//    }
    @PostMapping("/create")
    public ResponseEntity<List<OrderDetail>> saveAllOrderDetails(@RequestBody List<OrderDetailDTO> orderDetailsDTO) {
    List<OrderDetail> savedOrderDetails = orderDetailServiceImp.saveAllOrderDetails(orderDetailsDTO);
    return ResponseEntity.ok(savedOrderDetails);
    }
    @GetMapping("/getOrderDe/{orderDetailId}")
    OrderDetail getOrderDetailId(@PathVariable("orderDetailId") String orderDetailId){
        return orderDetailServiceImp.getOrderDetailId(orderDetailId);
    }
    @PutMapping ("/getOrderDe/{orderDetailId}")
    OrderDetail updateOrderDe(@PathVariable("orderDetailId") String orderDetailId, @RequestBody OrderDetailDTO orderDetailDTO){
        return orderDetailServiceImp.updateOrderDe(orderDetailId, orderDetailDTO);
    }
}
