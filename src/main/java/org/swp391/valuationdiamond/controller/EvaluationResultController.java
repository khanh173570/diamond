package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.EvaluationResultDTO;
import org.swp391.valuationdiamond.entity.EvaluationResult;
import org.swp391.valuationdiamond.service.EvaluationResultServiceImp;
import java.util.List;
@RestController
@RequestMapping("/evaluation_results")
public class EvaluationResultController {

    @Autowired
    private EvaluationResultServiceImp evaluationResultServiceImp;
    @PostMapping ("/create")
    EvaluationResult createEvaluationResult(@RequestBody EvaluationResultDTO evaluationResultDTO) {
        return evaluationResultServiceImp.createEvaluationResult(evaluationResultDTO);

    }
    @GetMapping("/getEvaluationResults")
    List<EvaluationResult> getEvaluationResults(){
        {
            return evaluationResultServiceImp.getEvaluationResult();
        }
    }

    @GetMapping("/getEvaluationResults/{evaluationResultId}")
    EvaluationResult getEvaluationResult(@PathVariable String evaluationResultId) {
        return evaluationResultServiceImp.getEvaluationResult(evaluationResultId);
    }
}

