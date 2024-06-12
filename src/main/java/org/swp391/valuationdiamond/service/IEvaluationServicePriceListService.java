package org.swp391.valuationdiamond.service;

import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;

import java.util.List;

public interface IEvaluationServicePriceListService {
    List<EvaluationServicePriceList> getPriceListByServiceId(String serviceId);
    List<EvaluationServicePriceList> getAllServicePriceList();

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
    double calculateServicePrice(String serviceId, float sampleSize);
}
