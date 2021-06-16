package com.application.tweetapp.tweet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.application.tweetapp.tweet.security.WebSecurity;
import com.application.tweetapp.tweet.service.UsersService;
import com.application.tweetapp.tweet.controller.UserController;
@SpringBootApplication
//@ComponentScan( basePackages = "com.application.tweetapp.tweet.*")
@ComponentScan( basePackageClasses = UserController.class)
@ComponentScan(basePackageClasses = UsersService.class)
@ComponentScan(basePackageClasses = WebSecurity.class)
@ComponentScan(basePackageClasses = Swagger2Config.class)

public class TweetappApplication {

	public static void main(String[] args) {

		SpringApplication.run(TweetappApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedMethods("*").allowedOrigins("*");
//			}
//		};
//	}
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {

		return new BCryptPasswordEncoder();
	}

}
