package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.DiamondAssessmentDTO;
import org.swp391.valuationdiamond.entity.DiamondAssessment;
import org.swp391.valuationdiamond.entity.EvaluationResult;
import org.swp391.valuationdiamond.repository.DiamondAssessmentRepository;
import org.swp391.valuationdiamond.repository.EvaluationResultRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class DiamondAssessmentServiceImp {
    @Autowired
    private DiamondAssessmentRepository diamondAssessmentRepository;


    public DiamondAssessment createDiamondAssessment(DiamondAssessmentDTO diamondAssessmentDTO){
        DiamondAssessment diamondAssessment  = new DiamondAssessment();

        long count = diamondAssessmentRepository.count();
        String formattedCount = String.valueOf(count + 1);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        String assessId = "AS" + formattedCount + date;
        diamondAssessment.setAssessId(assessId);
        diamondAssessment.setAssessOrigin(diamondAssessmentDTO.getAssessOrigin());
        diamondAssessment.setAssessMeasurement(diamondAssessmentDTO.getAssessMeasurement());
        diamondAssessment.setAssessCut(diamondAssessmentDTO.getAssessCut());
        diamondAssessment.setProportions(diamondAssessmentDTO.getProportions());
        diamondAssessment.setAssessShapeCut(diamondAssessmentDTO.getAssessShapeCut());
        diamondAssessment.setAssessColor(diamondAssessmentDTO.getAssessColor());
        diamondAssessment.setAssessClarity(diamondAssessmentDTO.getAssessClarity());
        diamondAssessment.setSymmetry(diamondAssessmentDTO.getSymmetry());
        diamondAssessment.setFluorescence(diamondAssessmentDTO.getFluorescence());

        return diamondAssessmentRepository.save(diamondAssessment);
}
    public DiamondAssessment getDiamondAssessment(String id){
        return diamondAssessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not Found"));
    }

    public List<DiamondAssessment> getDiamondAssessmentList() {
        return diamondAssessmentRepository.findAll();
    }
}
