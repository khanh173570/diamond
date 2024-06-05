package org.swp391.valuationdiamond.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationRequest;

@Repository
public interface EvaluationRequestRepository extends JpaRepository<EvaluationRequest, String> {
    EvaluationRequest findByRequestId(String requestId);
    List<EvaluationRequest> findByStatus(String status);

}
