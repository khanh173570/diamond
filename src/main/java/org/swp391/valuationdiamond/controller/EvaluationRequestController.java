package org.swp391.valuationdiamond.controller;

import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.service.EvaluationRequestServiceImp;
import org.swp391.valuationdiamond.service.IEvaluationRequestService;

@RestController
@RequestMapping("/evaluation-request")
public class EvaluationRequestController {

  @Autowired
  private IEvaluationRequestService evaluationRequestService;
  @Autowired
  private EvaluationRequestServiceImp evaluationRequestServiceImp;

  @PostMapping("/create")
  public EvaluationRequest createEvaluationRequest(@RequestBody EvaluationRequestDTO evaluationRequest) {
    return evaluationRequestService.createEvaluationRequest(evaluationRequest);
  }

  @GetMapping("/{requestId}")
  public EvaluationRequest getEvaluationRequest(@PathVariable String requestId) {
    return evaluationRequestService.getEvaluationRequest(requestId);
  }

  @GetMapping("/list/{status}")
  public List<EvaluationRequest> getEvaluationRequestByStatus(@PathVariable("status") String status) {
    return evaluationRequestService.getEvaluationRequestByStatus(status);
  }

  @GetMapping("/gett_all")
  public List<EvaluationRequest> getAllEvaluationRequest() {
    return evaluationRequestService.getAllEvaluationRequest();
  }


  @PutMapping("/updateStatus/{requestId}")
  public EvaluationRequest updateRequestStatus(@PathVariable("requestId") String requestId, @RequestBody EvaluationRequestDTO evaluationRequestDTO) {
    return evaluationRequestServiceImp.updateRequestStatus(requestId, evaluationRequestDTO);
  }
  //API get request by user
  @GetMapping("/get_by_user/{userId}")
  public List<EvaluationRequest> getRequestByUser(@PathVariable("userId") String userId) {
    return evaluationRequestService.getRequestByUser(userId);
  }
}

