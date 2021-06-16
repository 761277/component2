import React, { Component } from 'react';

class TweetDetailComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {  }
    }

    editTweet=()=>{
        
        this.props.editTweet(this.props.id)
    }

    deleteTweet=()=>{
        
        this.props.deleteTweet(this.props.id)
    }

    render() { 
        return ( 
            <div key={this.props.tweetId} id={this.props.tweetId}>
                    id={this.props.tweetId}
                <div class="card" style={{width:36 +'em',borderRadius:1.5 +'em'}}>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.userLoginId}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{this.props.postedOn}</h6>
                        <p class="card-text">{this.props.message}</p>
                        <button type="button" className="btn btn-primary float-right ml-2 " onClick={this.editTweet()}>Edit</button>
                        <button className="btn btn-primary  float-right" style={{justifyContent:"flex-end"}} onClick={this.deleteTweet()}>Delete</button>
                        {/* <a href={'/editTweet/'+ tweet.tweetId}>Edit</a> */}
                        
                    </div>
                </div>
                <br></br><br></br>
                </div>
         );
    }
}
 
export default TweetDetailComponent;