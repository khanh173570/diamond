package org.swp391.valuationdiamond.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserServiceImp {
    @Autowired

    private UserRepository userRepository;
    public User createUser(UserDTO userDTO){
        User user = new User();

        long count = userRepository.count();
        String formattedCount = String.valueOf(count + 1);
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("ddMMyyyy"));
        String requestId = "U" + formattedCount + date;

        user.setUserId(requestId);
        user.setPassword(userDTO.getPassword());
        user.setFirstName(userDTO.getFirst_name());
        user.setLastName(userDTO.getLastname());
        user.setBirthday(userDTO.getBirthday());
        user.setPhoneNumber(userDTO.getPhone_number());
        user.setEmail(userDTO.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setRole(userDTO.getRole());

        return userRepository.save(user);
    }
    public List<User> getStaffs(){

        return userRepository.getUsersByRole("Staff Evaluation");
    }
    public User getStaff(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("Not found"));
    }

}
