package org.swp391.valuationdiamond.dto;

import lombok.*;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    String userId;
    String password;
    String firstName;
    String lastName;
    Date birthday;
    String phoneNumber;
    String email;
    String address;
    String role;
}
