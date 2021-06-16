import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginComponent from './components/login/login';
import HomeComponent from './components/home/home';
import ForgotComponent from './components/ForgotPassword/forgot';
import PostTweetComponent from './components/Tweet/postTweet';
import RegisterComponent from './components/register/register'
import ViewTweetComponent from './components/Tweet/viewTweet';
import ViewAllTweetsComponent from './components/Tweet/viewAllTweets';
import EditTweetComponent from './components/Tweet/editTweet';
import TweetDetailComponent from './components/Tweet/tweetDetail';
import DeleteTweetComponent from './components/Tweet/deleteTweet';
import ReplyTweetComponent from './components/Tweet/replyTweet';
import ViewTweetRepliesComponent from './components/Tweet/viewTweetReplies';
// window.onbeforeunload = function (e) {
//   localStorage.clear();
// };
//sessionStorage.clear();

function App() {
  
  return (
    <div className="App">    
    
          <Switch>
            <Route path="/register" component={RegisterComponent}/>
            <Route exact path='/' component={LoginComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/home" component={HomeComponent}/>
            <Route path="/forgot" component={ForgotComponent}></Route>
            <Route path="/postTweet" component={PostTweetComponent}></Route>
            <Route path="/viewTweet" component={ViewTweetComponent}></Route>
            <Route path="/viewAllTweets" component={ViewAllTweetsComponent}></Route>
            <Route path="/editTweet" component={EditTweetComponent}></Route>
            <Route path="/tweetDetail" component={TweetDetailComponent}></Route>
            <Route path="/deleteTweet" component={DeleteTweetComponent}></Route>
            <Route path="/replyTweet" component={ReplyTweetComponent}></Route>
            <Route path="/viewTweetReplies" component={ViewTweetRepliesComponent}></Route>
          </Switch>
        </div>
      
  );
}

export default App;
