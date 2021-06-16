package com.application.tweetapp.tweet.repository;

import com.application.tweetapp.tweet.document.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users,String> {
}
