package org.swp391.valuationdiamond.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "tbl_Ratings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Rating {
  @Id
  @Column(name = "rating_id", nullable = false, length = 255)
  String ratingId;

  @Column(name = "Rating", nullable = false)
  int rating;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  User userId;

  @ManyToOne
  @JoinColumn(name = "blog_id")
  Blog blogId;

}
