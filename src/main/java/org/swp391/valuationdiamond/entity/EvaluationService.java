package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
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

  @JsonIgnore
  @OneToMany(mappedBy = "serviceId")
  List<EvaluationServicePriceList> servicePriceList;

//  @JsonIgnore
@JsonBackReference
  @OneToMany(mappedBy = "serviceId")
  List<OrderDetail> orderDetails;
}
