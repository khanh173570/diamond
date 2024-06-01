package org.swp391.valuationdiamond.dto;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderDetailDTO {
    String order_detailId;
    Date received_date;
    Date expired_received_date;
    Float unit_price;
    String Img;
    String status;
}
