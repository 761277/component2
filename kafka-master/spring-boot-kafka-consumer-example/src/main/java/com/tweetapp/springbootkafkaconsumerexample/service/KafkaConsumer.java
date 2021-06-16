package com.tweetapp.springbootkafkaconsumerexample.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.tweetapp.springbootkafkaconsumerexample.model.User;
import com.tweetapp.springbootkafkaconsumerexample.repository.UserRepository;

@Service
public class KafkaConsumer {

	@Autowired
	UserRepository repo;
	
    @KafkaListener(topics = "SpringTestTopic", groupId = "group_json")
    public void consume(String message) {
        System.out.println("Consumed message: " + message);
    }


    @KafkaListener(topics = "SpringTestTopic", groupId = "group_json",
            containerFactory = "userKafkaListenerFactory")
    public void consumeJson(User user) {
        System.out.println("Consumed JSON Message: " + user);
        User user1=new User();
        user1.setContact(user.getContact());
        user1.setEmail(user.getEmail());
        user1.setFirstname(user.getFirstname());
        user1.setLastname(user.getLastname());
        user1.setLoginid(user.getLoginid());
        user1.setPassword(user.getPassword());
        System.out.println(user1.toString());
        repo.save(user1);
        //repo.save(user);
       
    }
}