package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Role;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImp {
    @Autowired

    private UserRepository userRepository;

    //Hàm này sẽ tạo user theo cách thông thường
    public User createUser(UserDTO userDTO){
        User user = new User();

        user.setUserId(userDTO.getUserId());
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setBirthday(userDTO.getBirthday());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setRole(Role.USER);

        return userRepository.save(user);
    }

//    đăng ký tài khoản với google
public User signupOrLoginWithGoogle(OAuth2AuthenticationToken token){
    Map<String, Object> map = token.getPrincipal().getAttributes();
    String userId = (String) map.get("email");

    // Kiểm tra xem người dùng đã tồn tại chưa
    Optional<User> existingUser = userRepository.findById(userId);

    if (((Optional<?>) existingUser).isPresent()) {
        return existingUser.get();
    } else {
        User user = new User();
        user.setUserId((String) map.get("email"));
        user.setFirstName((String) map.get("given_name"));
        user.setLastName((String) map.get("family_name"));
        user.setEmail((String) map.get("email"));
        user.setRole(Role.USER);

        userRepository.save(user);
        return user;
    }
}

    //hàm đăng nhập
    public User login(String userId, String password) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user.get();
        }
        throw new RuntimeException("Invalid userId or password");
    }

    public List<User> getStaffs(){
        return userRepository.getUsersByRole(Role.valuation_staff);
    }

//    public List<User> getStaffs(){
//        Role role = Role.valueOf("valuation_staff".toUpperCase());
//        return userRepository.getUserByRole(role);
//    }


    public User getStaff(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("Not found"));
    }
    public User getAUser(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("UserId Not Found"));
    }

}
