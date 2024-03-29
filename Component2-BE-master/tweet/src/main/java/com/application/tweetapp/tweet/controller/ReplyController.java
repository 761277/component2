package com.application.tweetapp.tweet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.tweetapp.tweet.document.Reply;
import com.application.tweetapp.tweet.document.Tweet;
import com.application.tweetapp.tweet.repository.ReplyRepository;
import com.application.tweetapp.tweet.service.ReplyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value="Replies Management", description="Operations related to Reply")
@RestController
@RequestMapping("/api/v1/reply")
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*")
public class ReplyController {

	@Autowired
	ReplyRepository replyRepository;
	
	@Autowired
	ReplyService replyService;
	
	@PostMapping("/postReply/{tweetId}")
	@ApiOperation(value="Reply to a Tweet",response=Reply.class)
    public Reply postTweet(@RequestBody Reply reply, @PathVariable int tweetId){
        System.out.println("inside tweet controller");
        return replyService.postReply(reply,tweetId);

    }
	
	@GetMapping("/{tweetId}")
	@ApiOperation(value="Get Reply details by replyId", response=List.class)
	public List<Reply> getRepliesByTweetId(@PathVariable int tweetId){
		return replyService.getRepliesByTweetId(tweetId);
		
	}
	
	@GetMapping("/getAllReplies")
	@ApiOperation(value="Gets all replies", response=List.class)
	public List<Reply> getAllReplies(){
		return replyRepository.findAll();
	}
	
	
	@DeleteMapping("/deleteReply/{replyId}")
	@ApiOperation(value="Delete a particular reply", response=String.class)
    public String deleteReply(@PathVariable Integer replyId){
        replyRepository.deleteById(replyId);
        return "reply deleted successfully!!";
    }
	
	@DeleteMapping("/deleteAllReplies")
	@ApiOperation(value="Delete all replies",response=String.class)
	public String deleteAllReplies() {
		replyRepository.deleteAll();
		return "deleted all replies";
	}
}

