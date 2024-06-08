package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Role;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.util.List;
import java.util.Map;

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

    //Hàm này sử dụng để lấy dữ liệu từ gg và save lại trong database
    public User signupWithGoogle(Map<String, Object> map){
        if (map == null){
            return null;
        }
        else {
            User user = new User();
            user.setUserId((String) map.get("email"));
            user.setFirstName((String) map.get("given_name"));
            user.setLastName((String) map.get("family_name"));
            user.setEmail((String) map.get("email"));
            user.setRole(Role.USER);
            return userRepository.save(user);
        }
    }

//    public List<User> getStaffs(){
//        Role role = Role.valueOf("valuation_staff".toUpperCase());
//        return userRepository.getUserByRole(role);
//    }

    public User getStaff(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("Not found"));
    }

}
