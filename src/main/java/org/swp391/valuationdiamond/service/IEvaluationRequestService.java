package org.swp391.valuationdiamond.service;

import java.util.List;
import java.util.Optional;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.entity.User;

public interface IEvaluationRequestService {
  EvaluationRequest createEvaluationRequest(EvaluationRequestDTO evaluationRequest);
  EvaluationRequest getEvaluationRequest(String requestId);
  List<EvaluationRequest> getAllEvaluationRequest();
  List<EvaluationRequest> getEvaluationRequestByStatus(String status);
  boolean deleteEvaluationRequest(String requestId);
  EvaluationRequest updateEvaluationRequest(String requestId, EvaluationRequestDTO evaluationRequestDTO);
//  List<EvaluationRequest> getRequestByUser(String userId);
}
