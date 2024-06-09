package org.swp391.valuationdiamond.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.Date;
import org.swp391.valuationdiamond.entity.EvaluationService;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailDTO {
    String orderDetailId;
    String evaluationStaffId;
    Date receivedDate;
    Date expiredReceivedDate;
    float unitPrice;
    String img;
    float size;
    boolean isDiamond;
    String status;
    String orderId;
    String serviceId;


}
