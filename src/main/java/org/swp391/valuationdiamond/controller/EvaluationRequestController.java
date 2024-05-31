package org.swp391.valuationdiamond.controller;

import java.util.List;
import java.util.Optional;
import javax.swing.text.html.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swp391.valuationdiamond.dto.EvaluationRequestDTO;
import org.swp391.valuationdiamond.entity.EvaluationRequest;
import org.swp391.valuationdiamond.service.IEvaluationRequestService;

@RestController
@RequestMapping("/evaluation-request")
public class EvaluationRequestController {

  @Autowired
  private IEvaluationRequestService evaluationRequestService;


  @PostMapping("/create")
  public EvaluationRequest createEvaluationRequest(@RequestBody EvaluationRequest evaluationRequest) {
    return evaluationRequestService.createEvaluationRequest(evaluationRequest);
  }

  @GetMapping("/{requestId}")
  public EvaluationRequest getEvaluationRequest(@PathVariable String requestId) {
    return evaluationRequestService.getEvaluationRequest(requestId);
  }

}
