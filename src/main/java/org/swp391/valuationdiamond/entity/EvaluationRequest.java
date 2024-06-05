package org.swp391.valuationdiamond.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "tbl_Evaluation_Request")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EvaluationRequest {

  @Id
  @Column(name = "request_id", nullable = false, length = 255)
  String requestId;

  @Column(name = "request_description", nullable = true, length = 255)
  String requestDescription;

  @Column(name = "request_date", nullable = true)
  Date requestDate;

  @Column(name = "request_email", nullable = false, length = 255)
  String requestEmail;

  @Column(name = "guest_name", nullable = false, length = 255)
  String guestName;

  @Column(name = "status", nullable = true, length = 255)
  String status;

  @Column(name = "service", nullable = true, length = 255)
  String service;

  @Column(name = "phone_number", nullable = false, length = 255)
  String phoneNumber;

  @JsonBackReference
  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  User userId;

  @JsonIgnore
  @OneToMany(mappedBy = "requestId")
  List<Order> orders;



}
