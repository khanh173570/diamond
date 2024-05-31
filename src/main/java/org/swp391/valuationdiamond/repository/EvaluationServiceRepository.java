package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.EvaluationService;

@Repository
public interface EvaluationServiceRepository extends JpaRepository<EvaluationService, String> {

}
