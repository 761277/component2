package com.application.tweetapp.tweet.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tweet {


    @Id
    private int tweetId;
    private String userLoginId;
    private String message;
    private String postedOn;
    private int likes;
	public Tweet(int tweetId, String userLoginId, String message, String postedOn, int likes) {
		super();
		this.tweetId = tweetId;
		this.userLoginId = userLoginId;
		this.message = message;
		this.postedOn = postedOn;
		this.likes = likes;
	}
	public int getTweetId() {
		return tweetId;
	}
	public void setTweetId(int tweetId) {
		this.tweetId = tweetId;
	}
	public String getUserLoginId() {
		return userLoginId;
	}
	public void setUserLoginId(String userLoginId) {
		this.userLoginId = userLoginId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPostedOn() {
		return postedOn;
	}
	public void setPostedOn(String postedOn) {
		this.postedOn = postedOn;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	@Override
	public String toString() {
		return "Tweet [tweetId=" + tweetId + ", userLoginId=" + userLoginId + ", message=" + message + ", postedOn="
				+ postedOn + ", likes=" + likes + "]";
	}

    
}
