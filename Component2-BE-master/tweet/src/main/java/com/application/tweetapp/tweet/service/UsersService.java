package com.application.tweetapp.tweet.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.application.tweetapp.tweet.document.Users;

public interface UsersService extends UserDetailsService{
	
	public Users saveUser(Users user);

    public Users getUserByLoginid(String loginid);

    public Users resetPassword(Users user);

    public String userLogin(Users user);

    public String deleteById(String loginid);

}
