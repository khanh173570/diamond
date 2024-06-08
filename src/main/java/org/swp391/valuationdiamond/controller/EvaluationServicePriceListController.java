package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;
import org.swp391.valuationdiamond.entity.OrderDetail;
import org.swp391.valuationdiamond.service.EvaluationServicePriceListServiceImp;

import java.util.List;

@RestController
@RequestMapping("/service_price_list")
public class EvaluationServicePriceListController {
    @Autowired
    EvaluationServicePriceListServiceImp evaluationServicePriceListServiceImp;
    @GetMapping("/getServicePrice/{serviceId}")
    public List<EvaluationServicePriceList> getEvaluationPriceListByServiceID(@PathVariable String serviceId) {
        return evaluationServicePriceListServiceImp.getPriceListByServiceId(serviceId);
    }
}
