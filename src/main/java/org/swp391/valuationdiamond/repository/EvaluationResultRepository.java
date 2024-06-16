package org.swp391.valuationdiamond.repository;

import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.entity.EvaluationResult;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.entity.User;

import java.util.List;

@Repository
public interface EvaluationResultRepository extends JpaRepository<EvaluationResult, String> {
    List<EvaluationResult> findByOrderDetailId(OrderDetail OrderDetailId);

    }

