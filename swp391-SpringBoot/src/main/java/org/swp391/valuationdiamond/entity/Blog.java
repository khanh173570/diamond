package org.swp391.valuationdiamond.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Date;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tbl_Blog")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Blog {
  @Id
  @Column(name = "blog_id", nullable = false, length = 50)
  String blogId;

  @Column(name = "blog_title", nullable = false, length = 255)
  String blogTitle;

  @Column(name = "author", nullable = false, length = 255)
  String author;

  @Column(name = "blog_date", nullable = false)
  Date blogDate;

  @OneToMany(mappedBy = "blogId")
  List<Rating> ratings;

}
