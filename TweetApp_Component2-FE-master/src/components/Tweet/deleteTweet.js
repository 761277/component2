import React, { Component } from 'react';
import axios from 'axios';
import NavigationComponent from '../Navbar/navigation';
import { Link } from 'react-router-dom';
import like from '../images/like.jpg';

class DeleteTweetComponent extends Component {
    constructor(props) {
        super(props);
        
        
        // console.log("this.props.tweetId:"+this.props.tweetId)
        this.state = {
            id: 0,
            tweet: [],
            like:0,
            likeURL:like,
            message: ''
        }
    }

    

    componentDidMount() {
        
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        axios.get("http://localhost/api/v1/tweet/getTweet/" + this.props.location.state.tweetId,{
            headers:headerValues
        })
            .then(response => {
                console.log(response)
                this.setState({ tweet: JSON.parse(JSON.stringify(response.data)) })
                
                this.setState({ message: this.state.tweet.message })
                

            }).catch(error => {
                console.log(error)
            })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.deleteTweet()
    }

    deleteTweet = () => {
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        let loginid = sessionStorage.getItem('userLoginId')
        
        if (loginid = null) {
            alert("Login first,to post a tweet..:(")
            this.props.history.push('/login')
        }
        else {
            axios.delete("http://localhost:9511/api/v1/tweet/deleteTweet/" + this.props.location.state.tweetId,{
                headers:headerValues
            })
                .then(response => {
                    console.log(response)
                    alert(response.data)
                    
                    this.setState({ tweet: JSON.parse(JSON.stringify(response.data)) })
                    
                    this.setState({ message: this.state.tweet.message })
                    
                    localStorage.setItem('tweetId', response.data.tweetId)
                    this.props.history.push("/viewTweet")
                }).catch(error => {
                    console.log(error)
                })
        }
    }


    render() {
        return (
            <div>
                <NavigationComponent></NavigationComponent>
                <h3 align="center">Delete your tweets Here!!!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    {/* <div className="form-group">
                        <label>Tweet message</label>
                        <textarea id="tweetMsg" name="tweetMsg" rows="4" cols="50" 
                        defaultValue={this.state.message}>  
                        </textarea>
                        <button type="submit" className="btn btn-primary float-right ml-2 ">Delete</button>
                        <Link to='/viewTweet'><button className="btn btn-primary float-right">Cancel</button></Link>
                    </div> */}
                    <div key={this.state.tweet.tweetId} id={this.state.tweet.tweetId}>
                        
                        <div class="card" style={{ width: 36 + 'em', borderRadius: 1.5 + 'em', marginTop: 1.5 + 'em' }}>
                            <div class="card-body">
                                <h5 class="card-title">{this.state.tweet.userLoginId}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{this.state.tweet.postedOn}</h6>
                                <p class="card-text">{this.state.message}</p>
                                <div class="row">
                            <div class="column" style={{border:"none"}}>
                            <button disabled style={{border:"none",background:"none"}}><img src={this.state.likeURL} style={{width:29}}></img></button>
                            </div>
                            <div class="column">
                            <p>{this.state.tweet.likes}</p>
                            </div>
                        </div>
                                <button type="submit" className="btn btn-primary float-right ml-2 ">Delete</button>
                                <Link to='/viewTweet'><button className="btn btn-primary float-right">Cancel</button></Link>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

export default DeleteTweetComponent;