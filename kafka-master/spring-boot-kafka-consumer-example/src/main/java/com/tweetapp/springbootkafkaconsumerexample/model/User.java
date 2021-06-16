package com.tweetapp.springbootkafkaconsumerexample.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {

    private String firstname;
    private String lastname;

    @Indexed(unique = true)
    private String email;

    @Id
    private String loginid;

    private String password;
    private Long contact;
    
    

    public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String firstname, String lastname, String email, String loginid, String password, Long contact) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.loginid = loginid;
        this.password = password;
        this.contact = contact;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLoginid() {
        return loginid;
    }

    public void setLoginid(String loginid) {
        this.loginid = loginid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getContact() {
        return contact;
    }

    public void setContact(Long contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", loginid='" + loginid + '\'' +
                ", password='" + password + '\'' +
                ", contact=" + contact +
                '}';
    }
}