package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Role;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImp {
    @Autowired

    private UserRepository userRepository;


    public User createUser(UserDTO userDTO){
        if (userRepository.findByUserId(userDTO.getUserId()) != null) {
            throw new IllegalArgumentException("User with ID " + userDTO.getUserId() + " already exists");
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        User user = User.builder()
                .userId(userDTO.getUserId())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .email(userDTO.getEmail())
                .birthday(userDTO.getBirthday())
                .phoneNumber(userDTO.getPhoneNumber())
                .address(userDTO.getAddress())
                .role(Role.valueOf(userDTO.getRole()))
                .build();

        return userRepository.save(user);
    }

    //hàm đăng nhập
    public User login(String userId, String password) {
        User user = userRepository.findByUserId(userId);
        if (user != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            if (passwordEncoder.matches(password, user.getPassword())) {
                user.setPassword(null);
                return user;

            } else {
                throw new RuntimeException("Password is incorrect");
            }
        } else {
            throw new RuntimeException("User not found");
        }

    }

    public List<User> getStaffByRoleEvaluationStaff(){

        return userRepository.getUsersByRole(Role.valuation_staff);
    }

    public List<User> getStaff() {
        List<User> staff = new ArrayList<>();

        staff.addAll(userRepository.getUsersByRole(Role.valuation_staff));
        staff.addAll(userRepository.getUsersByRole(Role.consultant_staff));

        return staff;
    }


    public User getStaffById(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("Staff not found"));
    }
    public User getAUser(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("UserId Not Found"));
    }

    public User updateUser(String userId, UserDTO userDTO){
        User user= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (userDTO.getPassword() != null) {
            user.setPassword(userDTO.getPassword());
        }
        if (userDTO.getFirstName() != null) {
            user.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null) {
            user.setLastName(userDTO.getLastName());
        }
        if (userDTO.getBirthday() != null) {
            user.setBirthday(userDTO.getBirthday());
        }
        if (userDTO.getPhoneNumber() != null) {
            user.setPhoneNumber(userDTO.getPhoneNumber());
        }
        if (userDTO.getEmail() != null) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getAddress() != null) {
            user.setAddress(userDTO.getAddress());
        }
        if (userDTO.getRole() != null) {
            user.setRole(Role.valueOf(userDTO.getRole()));
        }
        return userRepository.save(user);
    }

    public void  deleteUser(String userId) {
        User user= userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        userRepository.delete(user);

    }

    public List<User> getCustomers(){
        return userRepository.getUsersByRole(Role.customer);
    }
    public long countUsers() {
        return userRepository.count();
    }
    public static class UserCountResponse {
        private long totalUser;

        public UserCountResponse(long totalUser) {
            this.totalUser = totalUser;
        }

        public long getTotalUser() {
            return totalUser;
        }

        public void setTotalUser(long totalUser) {
            this.totalUser = totalUser;
        }

        @Override
        public String toString() {
            return "UserCountResponse{" +
                    "Total User=" + totalUser +
                    '}';
        }
    }

    //    đăng ký tài khoản với google
//public User signupOrLoginWithGoogle(OAuth2AuthenticationToken token){
//    Map<String, Object> map = token.getPrincipal().getAttributes();
//    String userId = (String) map.get("email");
//
//    // Kiểm tra xem người dùng đã tồn tại chưa
//    Optional<User> existingUser = userRepository.findById(userId);
//
//    if (((Optional<?>) existingUser).isPresent()) {
//        return existingUser.get();
//    } else {
//        User user = new User();
//        user.setUserId((String) map.get("email"));
//        user.setFirstName((String) map.get("given_name"));
//        user.setLastName((String) map.get("family_name"));
//        user.setEmail((String) map.get("email"));
//        user.setRole(Role.USER);
//
//        userRepository.save(user);
//        return user;
//    }
//}


//    public List<User> getStaffs(){
//        Role role = Role.valueOf("valuation_staff".toUpperCase());
//        return userRepository.getUserByRole(role);
//    }




}
