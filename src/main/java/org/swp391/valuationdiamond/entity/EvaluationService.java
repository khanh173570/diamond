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
@Table(name = "tbl_Evaluation_Service")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EvaluationService {

  @Id
  @Column(name = "service_id", nullable = false, length = 255)
  String serviceId;

  @Column(name = "service_type", nullable = true, length = 100)
  String serviceType;

  @Column(name = "service_description", nullable = true, columnDefinition = "NVARCHAR(MAX)")
  String serviceDescription;

  @ManyToOne
  @JoinColumn(name = "Order_id", referencedColumnName = "Order_id")
  Order orderId;
}
