package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tbl_Evaluation_Result")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EvaluationResult {

  @Id
  @Column(name = "evaluation_result_id", nullable = false, length = 255)
  String evaluationResultId;

  @Column(name = "diamond_origin", nullable = true, length = 50)
  String diamondOrigin;

  @Column(name = "measurements", nullable = true, length = 255)
  String measurements;

  @Column(name = "proportions", nullable = true, length = 255)
  String proportions;

  @Column(name = "shape_cut", nullable = true, length = 50)
  String shapeCut;

  @Column(name = "carat_weight", nullable = true, precision = 18, scale = 2)
  BigDecimal caratWeight;

  @Column(name = "color", nullable = true, length = 50)
  String color;

  @Column(name = "clarity", nullable = true, length = 50)
  String clarity;

  @Column(name = "cut", nullable = true, length = 50)
  String cut;

  @Column(name = "symmetry", nullable = true, length = 50)
  String symmetry;

  @Column(name = "polish", nullable = true, length = 50)
  String polish;

  @Column(name = "fluorescence", nullable = true, length = 50)
  String fluorescence;

  @Column(name = "description", nullable = true, columnDefinition = "NVARCHAR(MAX)")
  String description;

  @Column(name = "img", nullable = true, columnDefinition = "NVARCHAR(MAX)")
  String img;

  @Column(name = "price", nullable = true, precision = 18, scale = 2)
  BigDecimal price;

  @Column(name = "date", nullable = true)
  Date date;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  User userId;

//  @ManyToOne
//  @JoinColumn(name = "assess_id", referencedColumnName = "assess_id")
//  DiamondAssessment assessId;

  @ManyToOne
  @JoinColumn(name = "order_de_id", referencedColumnName = "order_de_id")
  OrderDetail orderDetailId;
}
