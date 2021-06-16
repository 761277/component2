import React, { Component } from 'react';
import axios from 'axios';
import NavigationComponent from '../Navbar/navigation';
import like from '../images/like.jpg';
import { Link } from 'react-router-dom';

class ViewAllTweetsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allTweets:[],
            like:0,
            likeURL:like,
            tweetMsg:"",
            exceptUserTweets:[]
         }
    }


    

    componentDidMount=()=>{
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        let loginid=sessionStorage.getItem('userLoginId')
        
        if(loginid==null){
            alert("Login first,to view all tweets..:(")
            this.props.history.push('/login')
        }

        axios.get("http://localhost:9511/api/v1/tweet/getAllTweets",{
            headers:headerValues
        })
        .then(response=>{
            console.log(response)
            this.setState({ allTweets: JSON.parse(JSON.stringify(response.data)) })
            
            this.state.allTweets.map(new_tweet=>{
                if(new_tweet.userLoginId !=sessionStorage.getItem('userLoginId')){
                    this.setState({
                        exceptUserTweets: [...this.state.exceptUserTweets, new_tweet]
                    });
                }
                console.log(this.state.exceptUserTweets)
            })
            if(this.state.allTweets.length==0){
                this.setState({tweetMsg:"No tweets found"})
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    renderAllTweets=()=>{
        
        return this.state.allTweets.map(tweet=>{
            
            return(
                
                <div key={tweet.tweetId} >
                <div class="card" style={{width:36 +'em',borderRadius:1.5 +'em'}}>
                    <div class="card-body">
                        <h5 class="card-title">{tweet.userLoginId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{tweet.postedOn}</h6>
                        <p class="card-text">{tweet.message}</p>
                        <div class="row">
                            <div class="column" style={{border:"none"}}>
                            <button style={{border:"none",background:"none"}}><img src={this.state.likeURL} style={{width:29}}></img></button>
                            </div>
                            <div class="column">
                            <p>{tweet.likes}</p>
                            </div>
                        </div>
                        <Link 
                        to={{
                            pathname: "/replyTweet/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-left">Reply</button></Link>
                        <Link 
                        to={{
                            pathname: "/viewTweetReplies/"+ tweet.tweetId,
                            state: { tweetId: tweet.tweetId }
                        }}
                        ><button type="button" className="btn btn-primary float-right " >
                        view replies</button></Link>
                    </div>
                </div>
                <br></br><br></br>
                </div>
                
            )
        })
    }
    render() { 
        return ( 
            <div style={{overscrollBehavior:'none'}}>
                <NavigationComponent></NavigationComponent>
                <br></br><br></br><br></br>
                <h2> {this.state.tweetMsg}</h2>
                <div style={{overflow:'auto'}}>
                {this.renderAllTweets()}
                </div>
            </div>
         );
    }
}
 
export default ViewAllTweetsComponent;