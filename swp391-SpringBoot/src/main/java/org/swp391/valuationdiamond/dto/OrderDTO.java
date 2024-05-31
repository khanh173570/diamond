package org.swp391.valuationdiamond.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

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
    Float size;
    Boolean isDiamond;
}
