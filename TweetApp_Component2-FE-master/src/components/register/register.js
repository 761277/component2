import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import home from '../images/logo3rm.png';

const regExp = RegExp(
    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
)
const formValid = ({ isError, ...rest }) => {
    let isValid = false;

    Object.values(isError).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });

    Object.values(rest).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });

    return isValid;
};

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            loginid: '',
            password: '',
            contact: '',
            msgResponse:'',
            logoURL:home,
            isError: {
                fname: '',
                lname: '',
                email: '',
                loginid: '',
                password: '',
                contact: ''
            }
        }
    }
    
    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = {... this.state.isError} ;

        switch (name) {
            case "fname":
                isError.fname =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                // this.setState({fname:e.target.value})
                
                break;
            case "lname":
                isError.lname =
                    value.length < 4 ? "Atleast 4 characaters required" : "";
                break;
            case "email":
                isError.email = regExp.test(value)
                    ? ""
                    : "Email address is invalid";
                break;
            case "loginid":
                isError.loginid =
                    value.length < 5 ? "Atleast 5 characaters required" : "";
                break;
            case "password":
                isError.password =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                break;
            case "contact":
                isError.contact =
                    value.length < 10 ? "Atleast 10 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value
            
        })
        
    };

    onSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(this.state)
            
        } else {
            console.log("Form is invalid!");
        }
        this.saveUser()
    };

    saveUser=()=>{
        let requestbody={
            "firstname":this.state.fname,
            "lastname":this.state.lname,
            "email":this.state.email,
            "loginid":this.state.loginid,
            "password":this.state.password,
            "contact":this.state.contact
        }
        
        
        Axios.post('http://localhost:9511/api/v1/user/register', requestbody)
      .then(response => {
        console.log(response);
        this.props.history.push('/login')
      }, error => {
        console.log(error)
        this.setState({ msgResponse: "enter valid credentials.." })

      })
    }
    render() {
        const isError = {... this.state.isError} ;
       
        return (
        <div>
            <div className="data">
                <img src={this.state.logoURL} style={{width:200,marginTop:30,alignSelf:'center'}} />
                <h2 style={{marginLeft:126,marginTop:-45,color:"whitesmoke"}}><i><b>Tweet</b></i></h2>
                <h3 style={{marginLeft:50,color:"whitesmoke"}}>Post <b>Here!!</b> Share your <b>Thoughts!!</b></h3>
            </div>
            <div id="box">
                <h3 align="center">Register Here!!!</h3><br></br>
                <form onSubmit={this.onSubmit} noValidate>
                    <div class="form-group row">
                        <label class="col-sm-4">Firstname</label>
                        <div class="col-sm-8">
                            <input type="text" 
                            className={isError.fname.length > 0 ? "is-invalid form-control" : "form-control"} 
                            name="fname" placeholder="Firstname" onChange={this.formValChange}/>
                            {isError.fname.length > 0 && (
                        <span className="invalid-feedback">{isError.fname}</span>)}
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4">Lastname</label>
                        <div class="col-sm-8">
                            <input type="text"
                            className={isError.lname.length >0 ? "is-invalid form-control" : "form-control"} 
                            name="lname" placeholder="Lastname" onChange={this.formValChange} />
                            {isError.lname.length > 0}<span className="invalid-feedback">{isError.lname}</span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4">Email</label>
                        <div class="col-sm-8">
                            <input type="email"
                             className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                             name="email" placeholder="Email"
                             onChange={this.formValChange} />
                             {isError.email.length > 0}
                        <span className="invalid-feedback">{isError.email}</span>
                    
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4">LoginID</label>
                        <div class="col-sm-8">
                            <input type="text" 
                            className={isError.loginid.length > 0 ? "is-invalid form-control" : "form-control"}
                            name="loginid" placeholder="LoginID" onChange={this.formValChange} />
                            {isError.loginid.length>0} <span className="invalid-feedack">{isError.loginid}</span>                             
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4">Password</label>
                        <div class="col-sm-8">
                            <input type="password" 
                            className={isError.password.length>0 ? "is-invalid form-control": "form-control"} 
                            name="password" placeholder="Password" onChange={this.formValChange}/>
                            {isError.password.length > 0 && (
                        <span className="invalid-feedback">{isError.password}</span>)}
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-4" >ContactNumber</label>
                        <div class="col-sm-8">
                            <input type="number" 
                            className={isError.contact.length>0 ? "is-invalid form-control":"form-control"}
                            name="contact" placeholder="Contactnumber" onChange={this.formValChange} />
                            {isError.contact.length>0}<span className="invalid-feedback">{isError.contact}</span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                    <span style={{ color: "red", marginLeft: "20px" }}>{this.state.msgResponse}</span>
                    <p className="forgot-password text-right">
                        <Link to='/login' id="reg">Already a member,login here..</Link>
                    </p>
                </form>
            </div>
        </div>    
        );
    }
}

export default RegisterComponent;