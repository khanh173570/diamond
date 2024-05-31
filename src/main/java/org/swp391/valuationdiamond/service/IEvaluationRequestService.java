package org.swp391.valuationdiamond.service;

import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;

public interface IEvaluationRequestService {
  EvaluationRequestDTO createEvaluationRequest(EvaluationRequestDTO evaluationRequestDTO);
  EvaluationRequestDTO getEvaluationRequest(String requestId);


}
