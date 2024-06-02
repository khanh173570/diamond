package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;
import org.swp391.valuationdiamond.service.UserServiceImp;

import java.io.StringReader;
import java.util.List;

@RestController
@RequestMapping("/user_request")
public class UserController {
    @Autowired
    private UserServiceImp userServiceImp;
    @PostMapping("/create")
    User createUser(@RequestBody UserDTO userDTO){
        return userServiceImp.createUser(userDTO);
    }
    @GetMapping("/getUser/{userId}")
    User getStaff(@PathVariable("userId") String userId){
        return userServiceImp.getStaff(userId);
    }
    @GetMapping("/getStaff")
    List<User> getStaffs(){
        return userServiceImp.getStaffs();
    }

}
