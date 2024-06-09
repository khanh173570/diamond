package org.swp391.valuationdiamond.service;

import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;

import java.util.List;

public interface IEvaluationServicePriceListService {
    List<EvaluationServicePriceList> getPriceListByServiceId(String serviceId);
    List<EvaluationServicePriceList> getAllServicePriceList();
}
