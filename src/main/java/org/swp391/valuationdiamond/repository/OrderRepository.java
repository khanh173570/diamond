package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

}
