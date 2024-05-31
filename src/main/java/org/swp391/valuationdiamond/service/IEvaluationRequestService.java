package org.swp391.valuationdiamond.service;

import java.util.List;
import java.util.Optional;
import org.swp391.valuationdiamond.entity.EvaluationRequest;

public interface IEvaluationRequestService {
  EvaluationRequest createEvaluationRequest(EvaluationRequest evaluationRequest);
  EvaluationRequest getEvaluationRequest(String requestId);
  Optional<EvaluationRequest> getAllEvaluationRequest();
}
