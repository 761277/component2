import React, { Component } from 'react';
import axios from 'axios';
import NavigationComponent from '../Navbar/navigation';
import { Link } from 'react-router-dom';
import like from '../images/like.jpg';

class EditTweetComponent extends Component {
    constructor(props) {
        super(props);
        
       // console.log("this.props.tweetId:"+this.props.tweetId)
        this.state = { 
            id:0,
            tweet:[],
            message:'',
            like:0,
            likeURL:like
         }
    }

    getMessage=(event)=>{
        
        this.setState({message:event.target.value})
    }

    componentDidMount(){
       // console.log("props:"+ this.props.location.state.currentid)
       const headerValues={
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
        axios.get("http://localhost:9511/api/v1/tweet/getTweet/"+ this.props.location.state.tweetId,{
            headers:headerValues
        })
        .then(response=>{
            console.log(response)
            this.setState({ tweet: JSON.parse(JSON.stringify(response.data)) })
            
            this.setState({message:this.state.tweet.message})
            this.setState({like:this.state.tweet.like})
            
            
        }).catch(error=>{
            console.log(error)
        })
    }

    onSubmit=(event)=>{
        event.preventDefault()
        this.editTweet()
    }

    editTweet=()=>{
        let editTweetRequestBody={
            "message":this.state.message,
            "likes":this.state.like
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
            axios.put("http://localhost:9511/api/v1/tweet/editTweet/"+ this.props.location.state.tweetId,editTweetRequestBody,{
                headers:headerValues
            })
            .then(response=>{
                console.log(response)
                this.setState({ tweet: JSON.parse(JSON.stringify(response.data)) })
            
            this.setState({message:this.state.tweet.message})
            
                localStorage.setItem('tweetId',response.data.tweetId)
                this.props.history.push("/viewTweet")
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    // renderEditTweet=()=>{
    //     console.log("user tweets will be rendered..")
    //     let tweet = {... this.state.tweet} ;
    //     return this.state.tweet.map(tweet=>{
    //         return(
    //             <div key={tweet.tweetId} id={tweet.tweetId}>
                    
    //                 {/* {this.state.tweet.map(element=>{ */}
    //                     <form onSubmit={this.onSubmit(tweet.tweetId)} noValidate>
    //                     <div className="form-group">
    //                         <label>Tweet message</label>
    //                         <textarea id="tweetMsg" name="tweetMsg" rows="4" cols="50" 
    //                         onChange={this.getMessage} value={this.state.message}>
    //                         </textarea>
    //                         {/* <input type="text" contentEditable="true" placeholder="enter text" value={this.state.tweet.message} onChange={this.getMessage}></input> */}
    //                         <button type="submit" className="btn btn-primary btn-lg ">Post</button>
    //                     </div>
    //                 </form>
    //                 })}
    //             </div>
    //         )
    //     //})
    // }

    render() {
        return (
            <div>
                <NavigationComponent></NavigationComponent>
                <h3 align="center">Edit your tweets Here!!!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                        <label>Tweet message</label>
                        <textarea id="tweetMsg" name="tweetMsg" rows="4" cols="50" 
                        onChange={this.getMessage} value={this.state.message}>  
                        </textarea>
                        <div class="row">
                            <div class="column" style={{border:"none"}}>
                            <button disabled style={{border:"none",background:"none"}}><img src={this.state.likeURL} style={{width:29}}></img></button>
                            </div>
                            <div class="column">
                            <p>{this.state.tweet.likes}</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right ml-2">Post</button>
                        <Link to='/viewTweet'><button className="btn btn-primary float-right">Cancel</button></Link>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default EditTweetComponent;