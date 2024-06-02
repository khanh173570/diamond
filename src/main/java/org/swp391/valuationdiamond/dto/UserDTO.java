package org.swp391.valuationdiamond.dto;

import lombok.*;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    String password;
    String first_name;
    String last_name;
    Date birthday;
    String phone_number;
    String email;
    String address;
    String role;
}
