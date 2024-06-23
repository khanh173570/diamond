package org.swp391.valuationdiamond.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_Evaluation_Service_Price_List")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EvaluationServicePriceList {

  @Id
  @Column(name = "price_list", nullable = false, length = 255)
  String priceList;

  @Column(name = "size_from", nullable = true)
  int sizeFrom;

  @Column(name = "sizeTo", nullable = true)
  int sizeTo;

  @Column(name = "init_price", nullable = true)
  Double initPrice;

  @Column(name = "price_unit", nullable = true)
  Double priceUnit;

  @ManyToOne
  @JoinColumn(name = "service_id", referencedColumnName = "service_id")
  EvaluationService serviceId;

}
