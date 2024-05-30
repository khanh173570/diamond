package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationServicePriceList;

@Repository
public interface EvaluationServicePriceListReponsitory extends JpaRepository<EvaluationServicePriceList, String> {

}
