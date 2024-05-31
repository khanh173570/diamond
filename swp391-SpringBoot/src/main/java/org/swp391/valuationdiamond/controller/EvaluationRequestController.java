package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.service.IEvaluationRequestService;

@RestController
@RequestMapping("/evaluation-request")
public class EvaluationRequestController {

  @Autowired
  private IEvaluationRequestService evaluationRequestService;


  @PostMapping("/create")
  public EvaluationRequestDTO createEvaluationRequest(@RequestBody EvaluationRequestDTO evaluationRequestDTO) {
    return evaluationRequestService.createEvaluationRequest(evaluationRequestDTO);
  }

  @GetMapping("/{requestId}")
  public EvaluationRequestDTO getEvaluationRequest(@PathVariable("requestId") String requestId) {
    return evaluationRequestService.getEvaluationRequest(requestId);
  }

}
