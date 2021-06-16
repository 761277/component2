package com.application.tweetapp.tweet.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Reply {

	@Id
	private int replyId;
	private int tweetId;
	private String userLoginId;
    private String comment;
    private String repliedOn;
	public Reply(int replyId, int tweetId, String userLoginId, String comment, String repliedOn) {
		super();
		this.replyId = replyId;
		this.tweetId = tweetId;
		this.userLoginId = userLoginId;
		this.comment = comment;
		this.repliedOn = repliedOn;
	}
	public int getReplyId() {
		return replyId;
	}
	public void setReplyId(int replyId) {
		this.replyId = replyId;
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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getRepliedOn() {
		return repliedOn;
	}
	public void setRepliedOn(String repliedOn) {
		this.repliedOn = repliedOn;
	}
	@Override
	public String toString() {
		return "Reply [replyId=" + replyId + ", tweetId=" + tweetId + ", userLoginId=" + userLoginId + ", comment="
				+ comment + ", repliedOn=" + repliedOn + "]";
	}
    
    
	
}
