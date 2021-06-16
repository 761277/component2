import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Link,useLocation, Redirect } from 'react-router-dom';
import NavigationComponent from '../Navbar/navigation';
import e from 'cors';
import TweetDetailComponent from './tweetDetail';
import like from '../images/like.jpg';
import liked from '../images/liked.png';
import commentimg from '../images/comment.png'

class ViewTweetComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            currentid:0,
            redirect: false,
            likes:0,
            likeURL:like,
            likedURL:liked,
            tweetMsg:"",
            currentid:0,
            count:'fail',
            replies:[],
            commentUrl:commentimg
         }
    }

   
    componentDidMount(){
        //event.preventDefault()
        let loginid=sessionStorage.getItem('userLoginId')
        
        if(loginid==null){
            alert("Login first, to view tweet..:(")
            this.props.history.push('/login')
        }
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        
        axios.get("http://localhost:9511/api/v1/tweet/"+ sessionStorage.getItem('userLoginId'),{
            headers:headerValues
        })
        .then(response=>{
            //this.setState({redirect:true})
            console.log(response)
            this.setState({ data: JSON.parse(JSON.stringify(response.data)) })
            if(this.state.data.length==0){
                this.setState({tweetMsg:"No tweets found"})
            }
            
            // this.setState({likes:this.state.data.likes})
            this.setState({currentid:this.state.data.tweetId})
        }).catch(error=>{
            console.log(error)
        })
         
    }

    
    updateLike(currentid){
        this.setState({count:"pass"})
       // this.setState({likeURL:liked})
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        
       
        axios.put("http://52.15.81.152:9511/api/v1/tweet/like/" + currentid,null,{
            headers:headerValues
        })
        .then(response=>{
            
           this.setState({likes:response.data})
           this.setState({count:true})
           this.componentDidMount()
            
        }).catch(error=>{
            
        })
    }

    renderUserTweets=()=>{
       // const { redirect } = this.state;
        //let id=0;
        
        return this.state.data.map(tweet=>{
            return(

               // id={tweet.tweetId},
                <div key={tweet.tweetId} id={tweet.tweetId}>
                    
                <div class="card" style={{width:36 +'em',borderRadius:1.5 +'em',marginTop:2 +'em'}}>
                    <div class="card-body">
                        <h5 class="card-title">{tweet.userLoginId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{tweet.postedOn}</h6>
                        <p class="card-text">{tweet.message}</p>
                        <div class="row">
                            <div class="column" style={{border:"none"}}>
                            <button onClick={()=>{this.updateLike(tweet.tweetId)}} style={{border:"none",background:"none"}}><img src={this.state.likeURL} style={{width:29}}></img></button>
                            </div>
                            <div class="column">
                            <p>
                            {/* { //Check if message failed
        (this.state.count === 'pass')
          ? <p> {tweet.likes} </p> 
          : <p> {this.state.likes} </p> 
      } */}
                            {tweet.likes}
                            </p>
                            </div>
                            <Link 
                        to={{
                            pathname: "/viewTweetReplies/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-left " style={{border:"none",background:"none"}}>
                          <img src={this.state.commentUrl} style={{width:31,marginTop:-3}}></img>  
                        </button></Link>
                        </div>
                        
                        <Link 
                        to={{
                            pathname: "/editTweet/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-right ml-2 ">Edit</button></Link>
                        <Link 
                        to={{
                            pathname: "/deleteTweet/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-right ">Delete</button></Link>

                        {/* <Link 
                        to={{
                            pathname: "/replyTweet/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-left">Reply</button></Link> */}

                        {/* <Link 
                        to={{
                            pathname: "/viewTweetReplies/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-left ml-2" style={{border:"none",background:"none"}}>
                          <img src={this.state.commentUrl} style={{width:59}}></img>  
                        </button></Link> */}
                    </div>
                </div>
                
                </div>
            )
        })
    }

    delTweet=(id)=>{
        
        axios.delete("http://52.15.81.152:9511/api/v1/tweet/deleteTweet/" + id)
        .then(response=>{
            
            alert("you are deleting a tweet!")
            this.history.push("/viewTweet")
        })
    }

    editTweet=(event)=>{
        
        event.preventDefault()
        
        //this.setState({currentid:id})
        // {this.setState({currentid:id})}
                // localStorage.setItem('tweetId',id)
        this.props.history.push({
            pathname: '/editTweet'
            //state:{currentid:id}
        })
    }

    render() { 
        return ( 
            <div>
                <NavigationComponent></NavigationComponent>
               <h2> {this.state.tweetMsg}</h2>
            {this.renderUserTweets()}
            </div>
         );
    }
}
 
export default ViewTweetComponent;