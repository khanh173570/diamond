package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.entity.Order;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
  List<Order> findOrderByStatus(String status);
  Order findOrderByOrderId(String orderId);

    List<Order> findOrderByRequestId(EvaluationRequest requestId);
}
