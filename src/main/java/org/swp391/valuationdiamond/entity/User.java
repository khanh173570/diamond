package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "tbl_User")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "user_id", nullable = false, length = 255)
  String userId;

  @Column(name = "password", nullable = true, length = 20)
  String password;

  @Column(name = "first_name", nullable = true, length = 255)
  String firstName;

  @Column(name = "last_name", nullable = true, length = 255)
  String lastName;

  @Column(name = "birthday", nullable = true)
  Date birthday;

  @Column(name = "phone_number", nullable = true, length = 20)
  String phoneNumber;

  @Column(name = "email", nullable = true, length = 100)
  String email;

  @Column(name = "address", nullable = true, length = 255)
  String address;

  @Column(name = "role", nullable = true, length = 50)
  String role;

  @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
  List<Rating> ratings;

  @JsonIgnore
  @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
  List<EvaluationRequest> evaluationRequests;

  @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
  List<Order> orderId;

  @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
  List<EvaluationResult> evaluationResults;

  @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL)
  List<CommittedPaper> committedPapers;

}
