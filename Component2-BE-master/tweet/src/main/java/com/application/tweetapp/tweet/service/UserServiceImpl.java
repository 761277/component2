package com.application.tweetapp.tweet.service;

import org.springframework.security.core.userdetails.User;

import com.application.tweetapp.tweet.document.Users;
import com.application.tweetapp.tweet.exception.RecordNotFoundException;
import com.application.tweetapp.tweet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserServiceImpl implements UsersService {

    @Autowired
    UserRepository userRepository;

    @Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public void userService(BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
    @Override
    public Users saveUser(Users user) {
        System.out.println("inside serviceimpl");
        if (userRepository.findById(user.getLoginid()).isPresent()) {

            throw new RecordNotFoundException("User is already exists with the entered loginid");
        }
         if(user.getPassword().isEmpty() || user.getLoginid().isEmpty() || user.getFirstname().isEmpty() || user.getLastname().isEmpty() || user.getEmail().isEmpty() || user.getContact().equals(null)){
            System.out.println("register check");
             try {
                 throw new Exception("Enter all the required details:"+ user);
             } catch (Exception e) {
                 e.printStackTrace();
             }
         }
        else {
        	user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            System.out.println("user saved successfully");
        }
        return user;
    }

    @Override
    public Users getUserByLoginid(String loginid) {
        Optional< Users > userdb = this.userRepository.findById(loginid);

        if (userdb.isPresent()) {
            return userdb.get();
        } else {
            throw new RecordNotFoundException("User not found with loginid : " + loginid);
        }

    }

    @Override
    public Users resetPassword(Users user) {
        Optional<Users> olduser=userRepository.findById(user.getLoginid());
        if(olduser.isPresent()){
            System.out.println(olduser.get().getPassword());
            olduser.get().setPassword(user.getPassword());
            userRepository.save(olduser.get());
            return olduser.get();
        }
        else {
            throw new RecordNotFoundException("User not found with Loginid:" +user.getLoginid());
        }
    }

    @Override
    public String userLogin(Users user) {
        Optional<Users> user1=userRepository.findById(user.getLoginid());
        if(!user1.isPresent()){
            throw new RecordNotFoundException("User not found");
//            return user1.get();
        }
        if (!user1.get().getPassword().equals(user.getPassword())){
            throw new RecordNotFoundException("Invalid password");
//            return user1.get();
        }
        else
            return "User is valid!!!";

    }

    @Override
    public String deleteById(String loginid) {
        Optional<Users> user1=userRepository.findById(loginid);
        if(!user1.isPresent()){
            throw new RecordNotFoundException("User not found with loginid:" + loginid);
//            return user1.get();
        }
        else {
            userRepository.deleteById(loginid);
            return "user deleted successfully";
        }
//        return null;
    }

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		Optional<Users> user = userRepository.findById(username);
		if (user == null)
			throw new UsernameNotFoundException(username);
		return  new User(user.get().getLoginid(), user.get().getPassword(), true, true, true, true, new ArrayList<>());
	}
	
	public Optional<Users> getDetailsByEmail(String username) {
		Optional<Users> user = userRepository.findById(username);
		
		return user;
	}

}
