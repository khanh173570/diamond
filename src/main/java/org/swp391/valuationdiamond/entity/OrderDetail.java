package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.Date;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_Order_Details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetail {

  @Id
  @Column(name = "order_de_id", nullable = false, length = 255)
  String orderDetailId;

  @Column(name = "received_date", nullable = false)
  Date receivedDate;

  @Column(name = "expired_received_date", nullable = false)
  Date expiredReceivedDate;

  @Column(name = "unit_price", nullable = false)
  float unitPrice;

  @Column(name = "size", nullable = false)
  float size;

  @Column(name = "is_diamond", nullable = false)
  boolean isDiamond;

  @Column(name = "img", nullable = true, length = 255)
  String img;

  @Column(name = "status", nullable = true, length = 255)
  String status;

  @Column(name = "evaluation_staff_id", nullable = true, length = 255)
  String evaluationStaffId;

  @JsonManagedReference
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = true)
  Order orderId;

//  @JsonManagedReference
//  @ManyToOne
//  @JoinColumn(name = "evaluation_staff_id", nullable = true)
//  User evaluationStaffId;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "service_id", nullable = true)
  EvaluationService serviceId;
}

