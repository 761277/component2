package com.application.tweetapp.tweet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationUserService {
	
		@Autowired
		private BCryptPasswordEncoder bCryptPasswordEncoder;
		
		public void userService(BCryptPasswordEncoder bCryptPasswordEncoder) {
			this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		}

		
		
}
