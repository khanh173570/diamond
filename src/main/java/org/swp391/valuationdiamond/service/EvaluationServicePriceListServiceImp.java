package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;
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
//    public double calculateServicePrice(String serviceId, float sampleSize) {
//        EvaluationService service = evaluationServiceRepository.findById(serviceId)
//                .orElseThrow(() -> new RuntimeException("Service not found"));
//
//        // Assuming that there is only one price list for simplicity.
//        // Adjust if multiple price lists need to be handled.
//        EvaluationServicePriceList priceList = service.getServicePriceList().stream()
//                .filter(pl -> sampleSize >= pl.getSizeFrom() && (pl.getSizeTo() == 0 || sampleSize < pl.getSizeTo()))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("No price list available for the given sample size"));
//
//        return priceList.calculateServicePrice(sampleSize);
//    }
    @Override
    public double calculateServicePrice(String serviceId, float sampleSize) {
    if (sampleSize <= 0) {
        throw new IllegalArgumentException("Sample size must be greater than zero");
    }

    EvaluationService service = evaluationServiceRepository.findById(serviceId)
            .orElseThrow(() -> new RuntimeException("Service not found"));

    // Find the appropriate price list based on the sample size
    EvaluationServicePriceList priceList = service.getServicePriceList().stream()
            .filter(pl -> sampleSize >= pl.getSizeFrom() && (pl.getSizeTo() == 0 || sampleSize < pl.getSizeTo()))
            .findFirst()
            .orElseThrow(() -> new RuntimeException("No price list available for the given sample size"));

    return priceList.calculateServicePrice(sampleSize);
}
}
