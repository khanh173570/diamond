package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.repository.EvaluationServiceRepository;

import java.util.List;
@Service
public class EvaluationServiceServiceImp {
    @Autowired
    EvaluationServiceRepository evaluationServiceRepository;
    public List<EvaluationService> getServices() {
        return  evaluationServiceRepository.findAll();
    }
}
