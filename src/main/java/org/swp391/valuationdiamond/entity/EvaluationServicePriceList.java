package org.swp391.valuationdiamond.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
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
  @Column(name = "Price_List", nullable = false, length = 255)
  String priceList;

  @Column(name = "Sizefrom", nullable = true)
  int sizeFrom;

  @Column(name = "sizeTo", nullable = true)
  int sizeTo;

  @Column(name = "InitPrice", nullable = true)
  double initPrice;

  @Column(name = "PriceUnit", nullable = true)
  int priceUnit;
}
