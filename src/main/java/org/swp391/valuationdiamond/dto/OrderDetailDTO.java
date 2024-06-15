package org.swp391.valuationdiamond.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.swp391.valuationdiamond.config.CustomDateDeserializer;
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
    @JsonDeserialize(using = CustomDateDeserializer.class)
    @DateTimeFormat(pattern = "MM/dd/yyyy, HH:mm")
    Date receivedDate;
    @JsonDeserialize(using = CustomDateDeserializer.class)
    @DateTimeFormat(pattern = "MM/dd/yyyy, HH:mm")
    Date expiredReceivedDate;
    Float unitPrice;
    String img;
    Float size;
    Boolean isDiamond;
    String status;
    String orderId;
    String serviceId;

}
