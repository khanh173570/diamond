package org.swp391.valuationdiamond.service;

import org.swp391.valuationdiamond.dto.EvaluationServicePriceListDTO;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;

import java.util.List;

public interface IEvaluationServicePriceListService {
    EvaluationServicePriceList createServicePriceList(EvaluationServicePriceListDTO evaluationServicePriceListDTO);
    List<EvaluationServicePriceList> getPriceListByServiceId(String serviceId);
    List<EvaluationServicePriceList> getAllServicePriceList();
    double calculateServicePrice(String serviceId, float sampleSize);
    List<EvaluationServicePriceList> updateServicePriceListByServiceId(String serviceId, EvaluationServicePriceListDTO evaluationServicePriceListDTO);
    EvaluationServicePriceList updateServicePriceListById(String id, EvaluationServicePriceListDTO evaluationServicePriceListDTO);

}
