package org.swp391.valuationdiamond.service;

import java.util.List;
import java.util.Optional;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;

public interface IEvaluationRequestService {
  EvaluationRequest createEvaluationRequest(EvaluationRequestDTO evaluationRequest);
  EvaluationRequest getEvaluationRequest(String requestId);
  Optional<EvaluationRequest> getAllEvaluationRequest();
  List<EvaluationRequest> getEvaluationRequestByStatus(String status);
}
