package org.swp391.valuationdiamond.dto;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.Date;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EvaluationRequestDTO {
  String requestId;
  String requestDescription;
  Date requestDate;
  String requestEmail;
  String guestName;
  String status;
  String service;
  String phoneNumber;
  String userId;
  Date meetingDate;
}
