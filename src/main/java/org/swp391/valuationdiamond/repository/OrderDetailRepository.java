package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, String> {
//    List<OrderDetail> findByOrderDetailId(String orderDetailId);
        List<OrderDetail> findByOrderId(Order orderId);
        List<OrderDetail> findByStatus(String status);
        List<OrderDetail> findByEvaluationStaffIdIsNull();
        List<OrderDetail> findByEvaluationStaffId(String evaluationStaffId);

    List<OrderDetail> findByServiceId(EvaluationService evaluationService);
}
