package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.EvaluationResultDTO;
import org.swp391.valuationdiamond.entity.EvaluationResult;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.repository.EvaluationResultRepository;

import java.math.BigDecimal;

@Service
public class EvaluationResultServiceImp {
    @Autowired
    private EvaluationResultRepository evaluationResultRepository;
    public EvaluationResult createEvaluationResult(EvaluationResultDTO EvaluationResultDTO){
        EvaluationResult evaluationResult = new EvaluationResult();

        evaluationResult.setEvaluationResultId(EvaluationResultDTO.getEvaluationResultId());
        evaluationResult.setDiamondOrigin(EvaluationResultDTO.getDiamondOrigin());
        evaluationResult.setMeasurements(EvaluationResultDTO.getMeasurements());
        evaluationResult.setProportions(EvaluationResultDTO.getProportions());
        evaluationResult.setShapeCut(EvaluationResultDTO.getShapeCut());
        evaluationResult.setCaratWeight(EvaluationResultDTO.getCaratWeight());
        evaluationResult.setColor(EvaluationResultDTO.getColor());
        evaluationResult.setClarity(EvaluationResultDTO.getClarity());
        evaluationResult.setCut(EvaluationResultDTO.getCut());
        evaluationResult.setSymmetry(EvaluationResultDTO.getSymmetry());
        evaluationResult.setPolish(EvaluationResultDTO.getPolish());
        evaluationResult.setFluorescence(EvaluationResultDTO.getFluorescence());
        evaluationResult.setDescription(EvaluationResultDTO.getDescription());

        return evaluationResultRepository.save(evaluationResult);
    }

    public EvaluationResult getEvaluationResult(String id){
        return evaluationResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }


}





