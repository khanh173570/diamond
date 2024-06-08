package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.EvaluationResultDTO;
import org.swp391.valuationdiamond.entity.EvaluationResult;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.EvaluationResultRepository;
import org.swp391.valuationdiamond.repository.OrderDetailRepository;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.math.BigDecimal;

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
    public List<EvaluationResult> getEvaluationResult() {
        return evaluationResultRepository.findAll();
    }

}





