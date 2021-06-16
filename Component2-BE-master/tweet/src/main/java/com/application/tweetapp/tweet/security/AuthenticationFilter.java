package com.application.tweetapp.tweet.security;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.application.tweetapp.tweet.document.UserLoginDTO;
import com.application.tweetapp.tweet.document.Users;
import com.application.tweetapp.tweet.service.UserService;
import com.application.tweetapp.tweet.service.UserServiceImpl;
import com.application.tweetapp.tweet.service.UsersService;
import com.fasterxml.jackson.databind.ObjectMapper;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter{

	private Environment environment;
	private UserServiceImpl usersService;
	
	public AuthenticationFilter(UsersService usersService2, 
			Environment environment, 
			AuthenticationManager authenticationManager) {
		this.usersService = (UserServiceImpl) usersService2;
		this.environment = environment;
		super.setAuthenticationManager(authenticationManager);
	}
	
    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {
  
            UserLoginDTO creds = new ObjectMapper()
                    .readValue(req.getInputStream(), UserLoginDTO.class);
            
            
            return getAuthenticationManager().authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getLoginid(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
            
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {
    	String userName = ((User) auth.getPrincipal()).getUsername();
    	
    	
    	Users userDetails = usersService.getUserByLoginid(userName);
    	
        String token = Jwts.builder()
                .setSubject(userDetails.getEmail())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(environment.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, environment.getProperty("token.secret") )
                .compact();
        
        res.addHeader("token", token);
        res.addHeader("userId", userDetails.getLoginid());
        res.addHeader("Access-Control-Expose-Headers", "*");
        res.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        
     
    } 

}
