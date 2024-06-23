package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.EvaluationServiceDTO;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.service.EvaluationServiceServiceImp;

import java.util.List;

@RestController
@RequestMapping("/service")
public class EvaluationServiceController {
    @Autowired
    private EvaluationServiceServiceImp evaluationServiceServiceImp;

    @PostMapping("/create")
    EvaluationService createService(@RequestBody EvaluationServiceDTO evaluationServiceDTO) {
        return evaluationServiceServiceImp.createService(evaluationServiceDTO);
    }

    @PutMapping("/update/{serviceId}")
    EvaluationService updateService(@PathVariable("serviceId") String serviceId, @RequestBody EvaluationServiceDTO evaluationServiceDTO) {
        return evaluationServiceServiceImp.updateService(serviceId, evaluationServiceDTO);
    }

    @GetMapping("/getServiceById/{serviceId}")
    EvaluationService getServiceById(@PathVariable("serviceId") String serviceId) {
        return evaluationServiceServiceImp.getServiceById(serviceId);
    }

    @GetMapping("/getServices")
    List<EvaluationService> getServices() {
        return evaluationServiceServiceImp.getServices();
    }
}
