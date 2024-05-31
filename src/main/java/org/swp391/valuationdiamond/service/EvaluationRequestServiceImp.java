package org.swp391.valuationdiamond.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
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
  public EvaluationRequest createEvaluationRequest(EvaluationRequest evaluationRequest) {
    long count = evaluationRequestRepository.count();
    String formattedCount = String.format("%02d", count + 1);
    String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
    String requestId = "ER" + formattedCount + date;

    evaluationRequest.setRequestId(requestId);
    evaluationRequest.setStatus("In-Prgoress");
    evaluationRequest.setRequestDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    return evaluationRequestRepository.save(evaluationRequest);
  }

  @Override
  public EvaluationRequest getEvaluationRequest(String requestId) {
    return evaluationRequestRepository.findByRequestId(requestId);
  }

  @Override
  public Optional<EvaluationRequest> getAllEvaluationRequest() {
    return Optional.ofNullable((EvaluationRequest) evaluationRequestRepository.findAll());
  }

}
