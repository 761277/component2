import React, { Component } from 'react';
import e from 'cors';
import axios from 'axios';
import NavigationComponent from '../Navbar/navigation';

class PostTweetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:''
        }
    }

    getTweetMessage=(event)=>{
        
        this.setState({message:event.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault()
        this.postTweet()
    }

    componentDidMount=()=>{
        let loginid=sessionStorage.getItem('userLoginId')
        
        if(loginid==null){
            alert("Login first,to post a tweet..:(")
            this.props.history.push('/login')
        }
    }

    postTweet=()=>{
        let postTweetRequestBody={
            "message":this.state.message
        }
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        
        let loginid=sessionStorage.getItem('userLoginId')
        
        if(loginid=null){
            alert("Login first,to post a tweet..:(")
            this.props.history.push('/login')
        }
        else{
            axios.post("http://localhost:9511/api/v1/tweet/postTweet/"+ sessionStorage.getItem('userLoginId'),postTweetRequestBody,{
                headers:headerValues
            })
            .then(response=>{
                console.log(response)
                localStorage.setItem('tweetId',response.data.tweetId)
                this.props.history.push("/viewTweet")
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    render() {
        return (
            <div>
                <NavigationComponent></NavigationComponent>
                <h3 align="center">Post your tweets Here!!!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                        <label>Tweet message</label>
                        <textarea id="tweetMsg" name="tweetMsg" rows="4" cols="50" 
                        onChange={this.getTweetMessage}>  
                        </textarea>
                        <button type="submit" className="btn btn-primary btn-lg ">Post</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PostTweetComponent;