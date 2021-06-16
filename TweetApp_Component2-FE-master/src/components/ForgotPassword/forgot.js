import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import e from 'cors';
import axios from 'axios';
import home from '../images/logo3rm.png';

class ForgotComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginid:'',
            newPassword: '',
            confPassword:'',
            msgResponse:'',
            logoURL:home
            
        }
    }
    getLoginID=(event)=>{
        
        this.setState({loginid:event.target.value})
    }

    getNewPassword=(event)=>{
        
        this.setState({newPassword:event.target.value})
    }

    getConfPassword = (event) => {
        
        this.setState({ confPassword: event.target.value })

    }

    onSubmit=e=>{
        e.preventDefault()
        this.checkPassword()
        
    }

    checkPassword=()=>{
        if(this.state.newPassword != this.state.confPassword){
            this.setState({ msgResponse: "Both passwords should be same.." })
        }
        else{
            this.setState({msgResponse:" "})
            this.changePassword()
        }
    }
    changePassword=()=>{
        
        let forgotRequestbody={
            "loginid":this.state.loginid,
            "password":this.state.newPassword
        }
        
        axios.put("http://localhost:9511/api/v1/user/resetPassword", forgotRequestbody)
        .then(response => {
            console.log(response.config.data);
            this.props.history.push('/login')

          }).catch(error => {
             console.log(error)
            this.setState({ msgResponse: "Invalid Loginid,provide valid credentials and try again..." })
        })
    }
    render() {
        return (
        <div>
            <div className="data">
                <img src={this.state.logoURL} style={{width:200,marginTop:30,alignSelf:'center'}} />
                <h2 style={{marginLeft:126,marginTop:-45,color:"whitesmoke"}}><i>Luv2<b>Tweet</b></i></h2>
                <h3 style={{marginLeft:50,color:"whitesmoke"}}>Post <b>Here!!</b> Share your <b>Thoughts!!</b></h3>
            </div>
            <div id="box">
                <h3 align="center">Reset your password</h3><br></br>
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
                        <label>New Password</label>
                        <input type="password" className="form-control" placeholder="Enter New password" onChange={this.getNewPassword}/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" onChange={this.getConfPassword} />
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
                    <Link to='/login'>Login Here</Link>
                    </p>
                </form>
            </div>
        </div>    
        );
    }
}

export default ForgotComponent;