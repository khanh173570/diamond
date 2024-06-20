package org.swp391.valuationdiamond.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.swp391.valuationdiamond.entity.CommittedPaper;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;

import java.util.List;

@Repository
public interface CommittedPaperRepository extends JpaRepository<CommittedPaper, String> {
    List<CommittedPaper> findByUserId(User userId);
    List<CommittedPaper> findByOrderId(Order orderId);
}
