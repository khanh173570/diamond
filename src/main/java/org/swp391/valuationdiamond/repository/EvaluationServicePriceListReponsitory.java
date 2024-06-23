package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.OrderDetail;

import java.util.List;

@Repository
public interface EvaluationServicePriceListReponsitory extends JpaRepository<EvaluationServicePriceList, String> {
    //    List<EvaluationServicePriceList> getEvaluationServicePriceListByServiceId(EvaluationService serviceId);
    List<EvaluationServicePriceList> findByServiceId(EvaluationService serviceId);

}
