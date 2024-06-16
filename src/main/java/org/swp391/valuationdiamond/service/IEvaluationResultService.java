package org.swp391.valuationdiamond.service;

import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.entity.EvaluationResult;

import java.util.List;

public interface IEvaluationResultService {
    List<EvaluationResult> getResultByOrderDetailId(String OrderDetailId);
}
