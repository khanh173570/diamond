package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.repository.EvaluationServicePriceListReponsitory;
import org.swp391.valuationdiamond.repository.EvaluationServiceRepository;

import java.util.List;

@Service
public class EvaluationServicePriceListServiceImp implements IEvaluationServicePriceListService{
    private final EvaluationServicePriceListReponsitory evaluationServicePriceListRepository;
    private final EvaluationServiceRepository evaluationServiceRepository;

    @Autowired
    public EvaluationServicePriceListServiceImp(EvaluationServicePriceListReponsitory evaluationServicePriceListRepository, EvaluationServiceRepository evaluationServiceRepository) {
        this.evaluationServicePriceListRepository = evaluationServicePriceListRepository;
        this.evaluationServiceRepository = evaluationServiceRepository;
    }
    @Override
    public List<EvaluationServicePriceList> getPriceListByServiceId(String serviceId) {
        EvaluationService evaluationService = evaluationServiceRepository.findById(serviceId).orElseThrow(() -> new RuntimeException("ServiceId not found"));
        return evaluationServicePriceListRepository.findByServiceId(evaluationService);
    }
    @Override
    public List<EvaluationServicePriceList> getAllServicePriceList(){
        return evaluationServicePriceListRepository.findAll();
    }
}
