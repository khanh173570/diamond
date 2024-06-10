package org.swp391.valuationdiamond.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.swp391.valuationdiamond.dto.OrderDTO;
import org.swp391.valuationdiamond.dto.UserDTO;
import org.swp391.valuationdiamond.entity.Order;
import org.swp391.valuationdiamond.entity.User;
import org.swp391.valuationdiamond.repository.UserRepository;
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
    @GetMapping("/getAUser/{userId}")
        User getAUser(@PathVariable("userId") String userId ){
           return userServiceImp.getAUser(userId);
        }
    }

//    @GetMapping("/signup-google")
//    Map<String, Object> currentUser(OAuth2AuthenticationToken token){
//        return token.getPrincipal().getAttributes();
//    }

//}
