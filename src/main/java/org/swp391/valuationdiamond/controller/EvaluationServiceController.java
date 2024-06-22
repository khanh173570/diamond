package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.service.EvaluationServiceServiceImp;

import java.util.List;

@RestController
@RequestMapping("/service")
public class EvaluationServiceController {
    @Autowired
    private EvaluationServiceServiceImp evaluationServiceServiceImp;

    @GetMapping("/getServices")
    List<EvaluationService> getServices() {
        return evaluationServiceServiceImp.getServices();
    }
}
