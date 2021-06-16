import React from 'react';
import axios from 'axios';
import { Link,useLocation, Redirect } from 'react-router-dom';
import NavigationComponent from '../Navbar/navigation';

class ReplyTweetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment:"",
            reply:[]
         }
    }

    getComment=(event)=>{
        
        this.setState({comment:event.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault()
        this.postReply()
    }

    postReply=()=>{
        let replyRequestBody={
            "comment":this.state.comment,
            "userLoginId":sessionStorage.getItem('userLoginId')
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
            axios.post("http://localhost:9511/api/v1/reply/postReply/"+ this.props.location.state.tweetId,replyRequestBody,{
                headers:headerValues
            })
            .then(response=>{
                console.log(response)
                this.setState({ reply: JSON.parse(JSON.stringify(response.data)) })
            
            this.setState({comment:this.state.reply.comment})
            
                localStorage.setItem('tweetId',response.data.tweetId)
                this.props.history.push("/viewAllTweets")
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    render() { 
        return ( 
            <div>
                <NavigationComponent></NavigationComponent>
                <h3 align="center">Post your Reply Here!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                        <label>Comment</label>
                        <textarea id="tweetMsg" name="tweetMsg" rows="4" cols="50" 
                        onChange={this.getComment}>  
                        </textarea>
                        <button type="submit" className="btn btn-primary btn-lg ">Post</button>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default ReplyTweetComponent;