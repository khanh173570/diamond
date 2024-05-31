package org.swp391.valuationdiamond.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_Diamond_Price")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DiamondPrice {

  @Id
  @Column(name = "diamond_id", nullable = false, length = 255)
  String diamondId;

  @Column(name = "brand", nullable = true, length = 100)
  String brand;

  @Column(name = "Calculate", nullable = true, length = 100)
  String calculate;

  @Column(name = "diamond_origin", nullable = true, length = 100)
  String diamondOrigin;

  @Column(name = "symmetry", nullable = true, length = 50)
  String symmetry;

  @Column(name = "color", nullable = true, length = 50)
  String color;

  @Column(name = "proportions", nullable = true, length = 255)
  String proportions;

  @Column(name = "measurements", nullable = true, length = 255)
  String measurements;

  @Column(name = "polish", nullable = true, length = 50)
  String polish;

  @Column(name = "shape_cut", nullable = true, length = 50)
  String shapeCut;

  @Column(name = "carat_weight", nullable = true, precision = 18, scale = 2)
  BigDecimal caratWeight;

  @Column(name = "cut", nullable = true, length = 50)
  String cut;

  @Column(name = "flourescence", nullable = true, length = 50)
  String flourescence;

  @Column(name = "clarity", nullable = true, length = 50)
  String clarity;

  @Column(name = "price", nullable = true, precision = 18, scale = 2)
  BigDecimal price;

  @Column(name = "Image", nullable = true)
  String image;

  @Column(name = "valid_date", nullable = true, length = 20)
  String validDate;
}
