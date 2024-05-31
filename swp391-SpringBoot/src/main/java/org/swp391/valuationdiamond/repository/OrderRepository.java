package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.swp391.valuationdiamond.entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order , String> {
    List<Order> findByStatus(String status);
}
