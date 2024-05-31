package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.mapper.EvaluationRequestMapper;
import org.swp391.valuationdiamond.repository.EvaluationRequestRepository;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class EvaluationRequestServiceImp implements IEvaluationRequestService {
  @Autowired
  private EvaluationRequestRepository evaluationRequestRepository;

  @Override
  @Transactional
  public EvaluationRequestDTO createEvaluationRequest(EvaluationRequestDTO evaluationRequestDTO) {
    long count = evaluationRequestRepository.count();
    String formattedCount = String.format("%02d", count + 1);
    String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
    String requestId = "ER" + formattedCount + date;

    EvaluationRequest evaluationRequest = EvaluationRequestMapper.INSTANCE.toEntity(evaluationRequestDTO);
    evaluationRequest.setRequestId(requestId);

    EvaluationRequest savedEvaluationRequest = evaluationRequestRepository.save(evaluationRequest);
    return EvaluationRequestMapper.INSTANCE.toDTO(savedEvaluationRequest);
  }

  @Override
  public EvaluationRequestDTO getEvaluationRequest(String requestId) {
    return null;
  }
}
