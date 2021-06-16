package com.tweetapp.springbootkafkaproducerexample.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.springbootkafkaproducerexample.model.User;



@RestController
@RequestMapping("kafka")
public class UserResource {

    @Autowired
    private KafkaTemplate<String, User> kafkaTemplate;

    private static final String TOPIC = "SpringTestTopic";
    
    @PostMapping("/register")
    public void createUser(@RequestBody User user){
         
//        Message<Reply> message = MessageBuilder.withPayload(reply).build();
         kafkaTemplate.send(TOPIC,"Message", user);

    }

    
}
