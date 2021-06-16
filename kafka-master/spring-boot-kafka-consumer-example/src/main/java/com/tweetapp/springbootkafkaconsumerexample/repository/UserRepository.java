package com.tweetapp.springbootkafkaconsumerexample.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tweetapp.springbootkafkaconsumerexample.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{

}
