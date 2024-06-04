package org.swp391.valuationdiamond.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDTO {
    String orderId;
    String customerName;
    String phone;
    int diamondQuantity;
    Date orderDate;
    String status;
    BigDecimal totalPrice;
    String userId;
    String requestId;
    List<OrderDetailDTO> orderDetails;
}

