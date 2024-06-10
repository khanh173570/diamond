package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.service.UserServiceImp;

import java.io.StringReader;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user_request")
public class UserController {
    @Autowired
    private UserServiceImp userServiceImp;

    //hàm đăng ký thông thường
    @PostMapping("/create")
    User createUser(@RequestBody UserDTO userDTO){
        return userServiceImp.createUser(userDTO);
    }
    //hàm đăng ký với google
//    @PostMapping("/signup-google")
//    User signupWithGoogle(@RequestBody OAuth2AuthenticationToken token) {
//        return userServiceImp.signupWithGoogle(token);
//    }
    //hàm login
    @GetMapping("/login")
    User login(@RequestParam String email, @RequestParam String password){
        return userServiceImp.login(email, password);
    }

    @GetMapping("/getUser/{userId}")
    User getStaff(@PathVariable("userId") String userId){
        return userServiceImp.getStaff(userId);
    }

    @GetMapping("/getStaff")
    List<User> getStaffs(){
        return userServiceImp.getStaffs();
    }
    @GetMapping("/getAUser/{userId}")
        User getAUser(@PathVariable("userId") String userId ){
           return userServiceImp.getAUser(userId);
        }
    }


//}
