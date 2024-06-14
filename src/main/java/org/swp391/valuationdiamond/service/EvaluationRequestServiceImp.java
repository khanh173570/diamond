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


  //Hàm create request 'C'
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
    evaluationRequest.setMeetingDate(evaluationRequestDTO.getMeetingDate());


    User userId = userRepository.findById(evaluationRequestDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
    evaluationRequest.setUserId(userId);

    return evaluationRequestRepository.save(evaluationRequest);
  }

  //Hàm read 1 evaluation request 'R'
  @Override
  public EvaluationRequest getEvaluationRequest(String requestId) {
    if (evaluationRequestRepository.findByRequestId(requestId) == null) {
      throw new RuntimeException("Evaluation Request not found");
    }

    return evaluationRequestRepository.findByRequestId(requestId);
  }

  //show evaluation request 'R'
  @Override
  public List<EvaluationRequest> getAllEvaluationRequest() {
    return evaluationRequestRepository.findAll();
  }

  //show by status 'R'
  @Override
  public List<EvaluationRequest> getEvaluationRequestByStatus(String status) {
    return evaluationRequestRepository.findByStatus(status);
  }

    //hàm delete 'D'
  @Override
  public boolean deleteEvaluationRequest(String requestId) {
    if(evaluationRequestRepository.findByRequestId(requestId) == null){
      return false;
    }
    else {
        evaluationRequestRepository.deleteByRequestId(requestId);
        return true;
    }
  }

  //hàm update 'U'
  @Override
  public EvaluationRequest updateEvaluationRequest(String requestId, EvaluationRequestDTO evaluationRequestDTO) {
    EvaluationRequest evaluationRequest = new EvaluationRequest();
    if (evaluationRequestRepository.findByRequestId(requestId) == null) {
      throw new RuntimeException("Evaluation Request not found");
    } else if (evaluationRequestDTO.getRequestDescription() != null) {
        evaluationRequest.setRequestDescription(evaluationRequestDTO.getRequestDescription());
    } else if (evaluationRequestDTO.getRequestEmail() != null) {
        evaluationRequest.setRequestEmail(evaluationRequestDTO.getRequestEmail());
    } else if (evaluationRequestDTO.getGuestName() != null) {
        evaluationRequest.setGuestName(evaluationRequestDTO.getGuestName());
    } else if (evaluationRequestDTO.getPhoneNumber() != null) {
        evaluationRequest.setPhoneNumber(evaluationRequestDTO.getPhoneNumber());
    } else if (evaluationRequestDTO.getService() != null) {
        evaluationRequest.setService(evaluationRequestDTO.getService());
    } else if (evaluationRequestDTO.getStatus() != null) {
        evaluationRequest.setStatus(evaluationRequestDTO.getStatus());
    }
    return evaluationRequestRepository.save(evaluationRequest);
  }

  //hàm get request by user 'R'





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
  @Override
  public List<EvaluationRequest> getRequestByUser(String userId) {
    User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

    return evaluationRequestRepository.findByUserId(user);
  }
}
