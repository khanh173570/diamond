//package org.swp391.valuationdiamond.entity;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import java.util.Date;
//import lombok.AccessLevel;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.experimental.FieldDefaults;
//
//@Entity
//@Table(name = "tbl_Order_Details")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//@FieldDefaults(level = AccessLevel.PRIVATE)
//public class OrderDetail {
//
//  @Id
//  @Column(name = "order_detail_id", nullable = false, length = 255)
//  String orderDetailId;
//
//  @Column(name = "received_date", nullable = true)
//  Date receivedDate;
//
//  @Column(name = "expired_received_date", nullable = true)
//  Date expiredReceivedDate;
//
//  @Column(name = "unit_price", nullable = true)
//  float unitPrice;
//
//  @Column(name = "Img", nullable = true, length = 255)
//  String img;
//
//  @ManyToOne
//  @JoinColumn(name = "order_id")
//  Order orderId;
//
//  @ManyToOne
//  @JoinColumn(name = "evaluation_staff_id")
//  User evaluationStaffId;
//
//  @ManyToOne
//  @JoinColumn(name = "service_id")
//  EvaluationService serviceId;
//}
package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

  @Column(name = "evaluation_staff_id", nullable = true)
  String evaluationStaffId;

  @Column(name = "received_date", nullable = false)
  Date receivedDate;

  @Column(name = "expired_received_date", nullable = false)
  Date expiredReceivedDate;

  @Column(name = "unit_price", nullable = false)
  float unitPrice;
  @Column(name = "img", nullable = true, length = 255)
  String img;
  @Column(name = "size", nullable = false)
  float size;
  @Column(name = "is_diamond", nullable = false)
  boolean isDiamond;
  @Column(name = "status", nullable = true, length = 255)
  String status;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = true)
  Order orderId;

  @JsonIgnore
  @ManyToOne
  @JoinColumn(name = "service_id", nullable = true)
  EvaluationService serviceId;
}

