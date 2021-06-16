import axios from 'axios';
import React from 'react';
import NavigationComponent from '../Navbar/navigation';
import { Link } from 'react-router-dom';

class ViewTweetRepliesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            replies:[],
            comment:"",
            count:0
         }
    }

    componentDidMount(){
        
        const headerValues={
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
         axios.get("http://localhost:9511/api/v1/reply/"+ this.props.location.state.tweetId,{
             headers:headerValues
         })
         .then(response=>{
            console.log(response)
             this.setState({ replies: JSON.parse(JSON.stringify(response.data)) })
             
             this.setState({count:this.state.replies.length})
             if(this.state.replies.length == 0){
                 this.setState({comment:"No comments Yet!!"})
             }
             
         }).catch(error=>{
            console.log(error)
         })
     }

     renderUserTweetReplies=()=>{
        
        
        return this.state.replies.map(reply=>{
            
            return(
                <div key={reply.replyId}>
                    <div class="card" style={{width:36 +'em',borderRadius:1.5 +'em',marginTop:2 +'em'}}>
                        <div class="card-body">
                            <h5 class="card-title">{reply.userLoginId}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{reply.repliedOn}</h6>
                            <p class="card-text">{reply.comment}</p>
                        </div>
                    </div>
                </div>
                
            )
        })
     }

    render() { 
        return ( 
            <div>
                <NavigationComponent></NavigationComponent>
                <h4>
                { //Check if message failed
                (this.state.count == 0)
                ? <h4> {this.state.comment} </h4> 
                : <h4> {this.state.count } comments found </h4> 
                }
                </h4>
                
               {this.renderUserTweetReplies()}
            </div>
         );
    }
}
 
export default ViewTweetRepliesComponent;