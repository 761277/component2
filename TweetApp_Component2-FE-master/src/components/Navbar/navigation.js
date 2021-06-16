import React, { Component } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from "../images/logo2.png";
import axios from 'axios';
import { Link } from 'react-router-dom';

class NavigationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageURL:logo,
            user:sessionStorage.getItem('userLoginId')
          }
    }
    // logout=()=>{
    //     // console.log(this.props)
    //     // this.props.history.push("/")
    //     console.log("logout");
    //     window.onbeforeunload = function (e) {
    //         localStorage.clear();
    //       }
        
    // }

    logout=()=>{
        sessionStorage.clear();
    }
    render() { 
        return ( 
            <div>
                {/* <Navbar collapseOnSelect fixedTop  bg='dark' variant='dark' height='10'>
                    <Container>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav>
                                <Nav.Link href="/postTweet">Post</Nav.Link>
                                <Nav.Link href="/viewTweet">View</Nav.Link>
                                <Nav.Link href="/viewAllTweets">View all</Nav.Link>
                                <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                Signed in as:{this.state.user}
                                </Navbar.Text>
                                </Navbar.Collapse>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
                <Navbar bg="light" expand="lg" className="header" >
                    <Navbar.Brand >
                    <img src={this.state.imageURL} style={{width:80,marginRight:-10}} />
                     <i><b>Tweet</b></i>
                    </Navbar.Brand>
                    <Navbar.Toggle></Navbar.Toggle>
                    <Navbar.Collapse className="justify-content-end">
                    <Link  to="/postTweet" style={{color:"black"}}><b>Post</b></Link>
                    <Link to="/viewTweet" style={{color:"black",paddingLeft:20}}><b>View</b></Link>
                    <Link to="/viewAllTweets" style={{color:"black",paddingLeft:20}}><b>View all</b></Link>
                    {/* <Button style={{backgroundColor:"#FAF9F9", borderColor:"#FAF9F9", color:"black"}} onClick={this.logout}><b>Logout</b></Button> */}
                    <button onClick={this.logout} style={{border:"none",background:"none",paddingLeft:20}}> <Link to="/" style={{color:"black"}}><b>Logout</b></Link></button>
                    
                        <Navbar.Text style={{color:"#4169E1",paddingLeft:20}}>
                      <b>Hi {this.state.user} !!!</b>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
         );
    }
}
 
export default NavigationComponent;