package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.service.OrderServiceImp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order_request")
public class OrderController {
    @Autowired
    private OrderServiceImp orderServiceImp;

    // =================================== API CREATE ======================================

    @PostMapping("/create")
    Order createOrder(@RequestBody OrderDTO orderDTO) {
        return orderServiceImp.saveOrder(orderDTO);
    }

    // =================================== API GET ======================================

    @GetMapping("/getOrderByStatusInProgress")
    List<Order> getOrderByStatusInProgress() {
        return orderServiceImp.getOrders();
    }

    @GetMapping("/getOrder/{orderId}")
    Order getOrder(@PathVariable("orderId") String orderId) {

        return orderServiceImp.getOrder(orderId);
    }

    @GetMapping("/getOrders")
    List<Order> getOrders() {

        return orderServiceImp.getAllOrders();
    }

    @GetMapping("/getOrderByRequestId/{requestId}")
    List<Order> getOrderByRequestId(@PathVariable("requestId") String requestId) {
        return orderServiceImp.getOrderByRequest(requestId);

    }

    // =================================== API UPDATE ======================================

    @PutMapping("/updateStatus/{orderId}")
    public Order updateOrderStatus(@PathVariable("orderId") String orderId, @RequestBody OrderDTO orderDTO) {
        return orderServiceImp.updateOrderStatus(orderId, orderDTO);
    }
    @GetMapping("/countOrderCreatedWithinAMonth")
    public List<OrderServiceImp.MonthlyOrderCount> countOrderCreatedWithinAMonth(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "1") Integer numberOfMonths) {
        return orderServiceImp.countOrdersRegisteredPerMonth(numberOfMonths);
    }
    @GetMapping("/countOrderCreatedWithin6Months")
    public List<OrderServiceImp.MonthlyOrderCount> countOrderCreatedWithinMonths(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "6") Integer numberOfMonths) {
        return orderServiceImp.countOrdersRegisteredPerMonth(numberOfMonths);
    }

    @GetMapping("/sumTotalPriceWithinAMonth")
    public List<OrderServiceImp.MonthlyTotalPrice> sumTotalPriceWithinAMonth(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "1") Integer numberOfMonths) {
        return orderServiceImp.sumTotalPriceWithinMonths(numberOfMonths);
    }

    @GetMapping("/sumTotalPriceWithin6Months")
    public List<OrderServiceImp.MonthlyTotalPrice> sumTotalPriceWithinMonths(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "6") Integer numberOfMonths) {
        return orderServiceImp.sumTotalPriceWithinMonths(numberOfMonths);
    }
    @GetMapping("/sumQuantityWithinAMonth")
    public List<OrderServiceImp.MonthlyQuantitySum> sumQuantityWithinAMonth(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "1") Integer numberOfMonths) {
        return orderServiceImp.sumQuantityWithinMonths(numberOfMonths);
    }
    @GetMapping("/sumQuantityWithin6Months")
    public List<OrderServiceImp.MonthlyQuantitySum> sumQuantityWithinMonths(
            @RequestParam(value = "numberOfMonths", required = false, defaultValue = "6") Integer numberOfMonths) {
        return orderServiceImp.sumQuantityWithinMonths(numberOfMonths);
    }
    @GetMapping("/compareMonthlyTotalPrice")
    public Map<String, Object> calculatePercentageChange() {
        // Call the OrderService method to calculate percentage change
        OrderServiceImp.PercentageChangeResult percentageChangeResult = orderServiceImp.calculatePercentageChange();

        // Get the current month and previous month numeric values
        int currentMonth = LocalDate.now().getMonthValue();
        int previousMonth = LocalDate.now().minusMonths(1).getMonthValue();

        // Prepare response structure using LinkedHashMap to maintain insertion order
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("Month " + previousMonth, percentageChangeResult.getPrevMonth());
        response.put("Month " + currentMonth, percentageChangeResult.getCurrMonth());
        response.put("Percentage Change", percentageChangeResult.getPercentageChange() + "%");

        return response;
    }

}
