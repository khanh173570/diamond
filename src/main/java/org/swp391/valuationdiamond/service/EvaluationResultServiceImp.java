package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.EvaluationResultDTO;

import org.swp391.valuationdiamond.entity.*;
import org.swp391.valuationdiamond.repository.EvaluationResultRepository;
import org.swp391.valuationdiamond.repository.OrderDetailRepository;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EvaluationResultServiceImp {
    @Autowired
    private EvaluationResultRepository evaluationResultRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    public EvaluationResult createEvaluationResult(EvaluationResultDTO EvaluationResultDTO){
        EvaluationResult evaluationResult = new EvaluationResult();

        long count = evaluationResultRepository.count();
        String formattedCount = String.valueOf(count + 1);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        String ResultId = "ERS" + formattedCount + date;

        evaluationResult.setEvaluationResultId(ResultId);
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
        evaluationResult.setPrice(EvaluationResultDTO.getPrice());
        evaluationResult.setImg(EvaluationResultDTO.getImg());
        User userId = userRepository.findById(EvaluationResultDTO.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        evaluationResult.setUserId(userId);
        OrderDetail orderDetail = orderDetailRepository.findById(EvaluationResultDTO.getOrderDetailId()).orElseThrow(() -> new RuntimeException("Order detail not found"));
        evaluationResult.setOrderDetailId(orderDetail);


        return evaluationResultRepository.save(evaluationResult);

    }


    public EvaluationResult getEvaluationResult(String id){
        return evaluationResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }

    public List<EvaluationResult> getResultByOrderDetailId(String orderDetailId) {
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId).orElseThrow(() -> new RuntimeException("Order Detail not found"));

        return evaluationResultRepository.findByOrderDetailId(orderDetail);
    }

    public List<EvaluationResult> getAllEvaluationResult() {
        return evaluationResultRepository.findAll();
    }

    public EvaluationResult updateResult(String resultId, EvaluationResultDTO evaluationResultDTO){
        EvaluationResult result= evaluationResultRepository.findById(resultId).orElseThrow(() -> new RuntimeException("Evaluation Result not found"));

        if (evaluationResultDTO.getDiamondOrigin() != null) {
            result.setDiamondOrigin(evaluationResultDTO.getDiamondOrigin());
        }
        if (evaluationResultDTO.getMeasurements() != null) {
            result.setMeasurements(evaluationResultDTO.getMeasurements());
        }
        if (evaluationResultDTO.getProportions() != null) {
            result.setProportions(evaluationResultDTO.getProportions());
        }
        if (evaluationResultDTO.getShapeCut() != null) {
            result.setShapeCut(evaluationResultDTO.getShapeCut());
        }
        if (evaluationResultDTO.getCaratWeight() != null) {
            result.setCaratWeight(evaluationResultDTO.getCaratWeight());
        }
        if (evaluationResultDTO.getColor() != null) {
            result.setColor(evaluationResultDTO.getColor());
        }
        if (evaluationResultDTO.getClarity() != null) {
            result.setClarity(evaluationResultDTO.getClarity());
        }
        if (evaluationResultDTO.getCut() != null) {
            result.setCut(evaluationResultDTO.getCut());
        }
        if (evaluationResultDTO.getSymmetry() != null) {
            result.setSymmetry(evaluationResultDTO.getSymmetry());
        }
        if (evaluationResultDTO.getPolish() != null) {
            result.setPolish(evaluationResultDTO.getPolish());
        }
        if (evaluationResultDTO.getFluorescence() != null) {
            result.setFluorescence(evaluationResultDTO.getFluorescence());
        }
        if (evaluationResultDTO.getDescription() != null) {
            result.setDescription(evaluationResultDTO.getDescription());
        }
        if (evaluationResultDTO.getPrice() != null) {
            result.setPrice(evaluationResultDTO.getPrice());
        }
        if (evaluationResultDTO.getImg() != null) {
            result.setImg(evaluationResultDTO.getImg());
        }


        return evaluationResultRepository.save(result);
    }
}





