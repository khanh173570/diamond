package org.swp391.valuationdiamond.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.service.UserServiceImp;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user_request")
public class UserController {
    @Autowired
    private UserServiceImp userServiceImp;

    //hàm đăng ký thông thường
    @PostMapping("/create")
    User createUser(@RequestBody @Valid UserDTO userDTO){

        return userServiceImp.createUser(userDTO);
    }
    //hàm đăng ký với google
//    @PostMapping("/signup-google")
//    User signupWithGoogle(@RequestBody OAuth2AuthenticationToken token) {
//        return token.getPrincipal().getAttributes();
//        return userServiceImp.signupWithGoogle(token);
//    }

//    @GetMapping("/login-google")
//    public User signupOrLoginWithGoogle(OAuth2AuthenticationToken token) {
//        return userServiceImp.signupOrLoginWithGoogle(token);
//    }

//    @GetMapping("/signup-google")
//    Map<String, Object> currentUser(OAuth2AuthenticationToken token){
//        return token.getPrincipal().getAttributes();
//    }



    //hàm login

//    @GetMapping("/login")
//    User login(@RequestParam String email, @RequestParam String password){
//        return userServiceImp.login(email, password);
//    }
    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> loginRequest) {
        String userId = loginRequest.get("userId");
        String password = loginRequest.get("password");
        return userServiceImp.login(userId, password);
    }

    @GetMapping("/getUser/{userId}")
    User getStaff(@PathVariable("userId") String userId){

        return userServiceImp.getStaff(userId);
    }

    @GetMapping("/getStaff")
    List<User> getStaffs(){

        return userServiceImp.getStaffs();
    }

    @GetMapping("/getCustomer")
    List<User> getCustomer(){

        return userServiceImp.getCustomers();
    }

    @GetMapping("/getAUser/{userId}")
        User getAUser(@PathVariable("userId") String userId ){

        return userServiceImp.getAUser(userId);
        }

    @PutMapping("/updateUser/{userId}")
    public User updateUser(@PathVariable("userId") String userId, @RequestBody UserDTO userDTO) {
        return userServiceImp.updateUser(userId, userDTO);
    }
    @DeleteMapping("/deleteUser/{userId}")
    public void deleteUser(@PathVariable("userId") String userId,  @RequestBody UserDTO userDTO){
        if (userId == null || userId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid userId");
        }
        if (userDTO == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid userDTO");
        }
        try {
            userServiceImp.deleteUser(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        }
    }



    }


//}
