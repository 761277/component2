import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import e from 'cors';
import axios from 'axios';
import home from '../images/logo5.png';
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginid: '',
            password: '',
            msgResponse:'',
            logoURL:home
        }
    }

    getLoginID=(event)=>{
        
        this.setState({loginid:event.target.value})
    }

    getPassword = (event) => {
        
        this.setState({ password: event.target.value })
    }

    onSubmit=e=>{
        e.preventDefault()
        this.validateLogin()
    }

    validateLogin=()=>{
        let loginRequestbody={
            "loginid":this.state.loginid,
            "password":this.state.password
        }
        
        axios.post("http://localhost:9511/api/v1/user/login", loginRequestbody)
        .then(response => {
            
            localStorage.setItem('token',response.headers.token)
            
            console.log(response.config.data);
            sessionStorage.setItem('userLoginId',this.state.loginid)
            this.props.history.push('/home')

          }).catch(error => {
            console.log(error)
            this.setState({ msgResponse: "enter valid credentials.." })
        })
    }

    
    render() {
        return (
            <div>
            <div className="data">
                <img src={this.state.logoURL} style={{width:150,marginTop:20,alignSelf:'center'}} />
                <h2 style={{marginLeft:126,marginTop:-45,color:"whitesmoke"}}><i><b>Tweet</b></i></h2>
                <h3 style={{marginLeft:50,color:"whitesmoke"}}> <b>Tweet Here!!</b> Share your <b>Thoughts!!</b></h3>
            </div>    
            <div id="box">
                
                <h3 align="center">Login Here!!!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    {/* <div class="form-group row">
                        <label class="col-sm-4">LoginID</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="loginid" placeholder="LoginID" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4">Password</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="pwd" placeholder="Email" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                    <p className="forgot-password text-right">
                        <Link to='/register' id="reg">New member,register here..</Link>
                    </p> */}
                    <div className="form-group">
                        <label>LoginID</label>
                        <input type="email" className="form-control" placeholder="Enter LoginID" onChange={this.getLoginID}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.getPassword} />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                    <span style={{ color: "red", marginLeft: "20px" }}>{this.state.msgResponse}</span>
                    <p className="forgot-password text-right">
                    <Link to='/forgot' style={{float:"left"}}></Link>
                   <Link to='/register' style={{float:"right", marginLeft:2 +"em"}}>No account?Register here..!!</Link>
                    </p>
                </form>
            </div>
            </div>
        );
    }
}

export default LoginComponent;