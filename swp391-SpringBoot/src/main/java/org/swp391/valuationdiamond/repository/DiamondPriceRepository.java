package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.DiamondPrice;

@Repository
public interface DiamondPriceRepository extends JpaRepository<DiamondPrice, String> {

}
