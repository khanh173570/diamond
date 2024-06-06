package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_Order")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {

  @Id
  @Column(name = "order_id", nullable = false, length = 255)
  String orderId;

  @Column(name = "customer_name", nullable = false, length = 50)
  String customerName;

  @Column(name = "phone", nullable = false, length = 20)
  String phone;

  @Column(name = "diamond_quantity", nullable = false)
  int diamondQuantity;

  @Column(name = "order_date", nullable = false)
  Date orderDate;

  @Column(name = "status", nullable = false, length = 255)
  String status;

  @Column(name = "total_price", nullable = false, precision = 18, scale = 2)
  BigDecimal totalPrice;

  @JsonManagedReference
  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  User userId;

  @ManyToOne
  @JoinColumn(name = "request_id")
  EvaluationRequest requestId;

  @JsonBackReference
  @OneToMany(mappedBy = "orderId")
  List<OrderDetail> orderDetailId;

  @OneToMany(mappedBy = "orderId")
  List<CommittedPaper> committedPapersId;
}

