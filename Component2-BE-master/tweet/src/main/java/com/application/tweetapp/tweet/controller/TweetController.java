package com.application.tweetapp.tweet.controller;

import com.application.tweetapp.tweet.document.Tweet;
import com.application.tweetapp.tweet.repository.TweetRepository;
import com.application.tweetapp.tweet.service.TweetService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Api(value="Tweet Management", description="Operations related to Tweet")
@RestController
@RequestMapping("/api/v1/tweet")
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
public class TweetController {

    @Autowired
    TweetRepository tweetRepository;

    @Autowired
    TweetService tweetService;

    @PostMapping("/postTweet/{loginid}")
    @ApiOperation(value="Posts a new Tweet",response=Tweet.class)
    public Tweet postTweet(@RequestBody Tweet tweet, @PathVariable String loginid){
        System.out.println("inside tweet controller");
        return tweetService.postTweet(tweet,loginid);

    }

    @GetMapping("/{loginid}")
    @ApiOperation(value="Get User tweets based on loginId",response=List.class)
    public List<Tweet> getUserTweets(@PathVariable String loginid){

        return tweetService.getUserTweets(loginid);
    }

    @GetMapping("/getAllTweets")
    @ApiOperation(value="Get all Tweets",response=List.class)
    public List<Tweet> getAllTweets(){
        return tweetRepository.findAll();
    }


    @DeleteMapping("/deleteTweet/{tweetid}")
    @ApiOperation(value="Delete a particular tweet based on tweetid",response=String.class)
    public String deleteTweet(@PathVariable Integer tweetid){
        tweetRepository.deleteById(tweetid);
        return "tweet deleted successfully!!";
    }

    @PutMapping("/editTweet/{tweetid}")
    @ApiOperation(value="Edits already existed tweet",response=String.class)
    public String editTweet(@RequestBody Tweet tweet,@PathVariable Integer tweetid){
        tweetService.editTweet(tweet,tweetid);
        return "tweet updated successfully..!!";
    }

    @GetMapping("/getTweet/{tweetid}")
    @ApiOperation(value="Gets Tweet details by tweetId",response=Tweet.class)
    public Tweet getTweetByTweetId(@PathVariable int tweetid){
        return tweetService.getTweetByTweetId(tweetid);
    }
    
    @PutMapping("/like/{tweetid}")
    @ApiOperation(value="Get likes for a particular based on tweetId",response=Integer.class)
    public int updateLike(@PathVariable int tweetid) {
    	return tweetService.updateLike(tweetid);
    }
}
