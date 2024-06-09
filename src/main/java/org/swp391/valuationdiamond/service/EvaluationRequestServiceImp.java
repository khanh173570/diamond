package org.swp391.valuationdiamond.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.EvaluationRequestRepository;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import org.swp391.valuationdiamond.repository.UserRepository;

@Service
public class EvaluationRequestServiceImp implements IEvaluationRequestService {
  @Autowired
  private EvaluationRequestRepository evaluationRequestRepository;

  @Autowired
  private UserRepository userRepository;

  @Override
  @Transactional
  public EvaluationRequest createEvaluationRequest(EvaluationRequestDTO evaluationRequestDTO) {
    EvaluationRequest evaluationRequest = new EvaluationRequest();

    long count = evaluationRequestRepository.count();
    String formattedCount = String.valueOf(count + 1);
    String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
    String requestId = "ER" + formattedCount + date;

    evaluationRequest.setRequestId(requestId);
    evaluationRequest.setRequestDescription(evaluationRequestDTO.getRequestDescription());
    evaluationRequest.setRequestDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
    evaluationRequest.setRequestEmail(evaluationRequestDTO.getRequestEmail());
    evaluationRequest.setGuestName(evaluationRequestDTO.getGuestName());
    evaluationRequest.setStatus("In-Progress");
    evaluationRequest.setService(evaluationRequestDTO.getService());
    evaluationRequest.setPhoneNumber(evaluationRequestDTO.getPhoneNumber());


//    User userId = userRepository.findById(evaluationRequestDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
//    evaluationRequest.setUserId(userId);

    return evaluationRequestRepository.save(evaluationRequest);
  }

  @Override
  public EvaluationRequest getEvaluationRequest(String requestId) {
    if (evaluationRequestRepository.findByRequestId(requestId) == null) {
      throw new RuntimeException("Evaluation Request not found");
    }

    return evaluationRequestRepository.findByRequestId(requestId);
  }

  @Override
  public List<EvaluationRequest> getAllEvaluationRequest() {
    return evaluationRequestRepository.findAll();
  }
  @Override
  public List<EvaluationRequest> getEvaluationRequestByStatus(String status) {
//    User user = userRepository.findById(evaluationRequestDTO.getUser().getId()).orElseThrow(() -> new RuntimeException("User not found"));
//    evaluationRequest.setUserId(user);
    return evaluationRequestRepository.findByStatus(status);
  }

//  public List<EvaluationRequest> getEvaluationRequestByStatus() {
//    return evaluationRequestRepository.findByStatus("In-Progress");
//  }
public EvaluationRequest updateRequestStatus(String requestId, EvaluationRequestDTO evaluationRequestDTO){
   EvaluationRequest request= evaluationRequestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));

  if (evaluationRequestDTO.getStatus() != null) {
    request.setStatus(evaluationRequestDTO.getStatus());
  }
  return evaluationRequestRepository.save(request);
}

}
