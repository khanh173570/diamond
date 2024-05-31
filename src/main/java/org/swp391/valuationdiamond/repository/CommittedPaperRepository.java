package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.CommittedPaper;

@Repository
public interface CommittedPaperRepository extends JpaRepository<CommittedPaper, String> {

}
