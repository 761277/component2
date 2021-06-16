package com.application.tweetapp.tweet.controller;

import com.application.tweetapp.tweet.document.Users;
import com.application.tweetapp.tweet.repository.UserRepository;
import com.application.tweetapp.tweet.service.UserService;
import com.application.tweetapp.tweet.service.UserServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value = "User Management", description = "Operations related to user")
@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    @ApiOperation(value="User Registration", response=String.class)
    public Users createUser(@RequestBody Users user)
    {
        System.out.println("Creating new User");
       return userService.saveUser(user);
        //return "User inserted successfully";
    }

    @GetMapping("/getAllUsers")
    @ApiOperation(value="Gets all the users", response=List.class)
    public List<Users> getAllUsers(){
        System.out.println("getting all users");
        return userRepository.findAll();
    }

    @GetMapping("/{loginid}")
    @ApiOperation(value="Gets User details by Loginid", response=Users.class)
    public Users getUserByLoginid(@PathVariable String loginid){
        return userService.getUserByLoginid(loginid);
    }

    @PutMapping("/resetPassword")
    @ApiOperation(value="Password will be reset",response=String.class)
    public String resetPassword(@RequestBody Users user){
       Users usernew= userService.resetPassword(user);
        Optional<Users> old=userRepository.findById(user.getLoginid());
        if(old.get().getPassword()!= usernew.getPassword()) {
            return "password updated successfully";
        }
        else if (old.get().getPassword() == usernew.getPassword()){
            return "Pasword should not be same as previous one";
        }
        else return "pasword call";

    }

//    @PostMapping("/login")
//    @ApiOperation(value="Validate user login",response=String.class)
//    public String userLogin(@RequestBody Users user){
//        return userService.userLogin(user);
//
//    }

    @DeleteMapping("/delete/{loginid}")
    @ApiOperation(value="Deletes user by provided LoginId",response=String.class)
    public String deleteUser(@PathVariable String loginid){
       return userService.deleteById(loginid);
    }
}
