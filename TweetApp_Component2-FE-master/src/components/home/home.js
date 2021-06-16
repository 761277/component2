import React, { Component } from 'react';
import NavigationComponent from '../Navbar/navigation';
import home from '../images/logo2.png';
class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            logoURL:home
         }
    }

    componentDidMount(){
        let loginid=sessionStorage.getItem('userLoginId')
        
        if(loginid==null){
            alert("Login first,to view home page..:(")
            this.props.history.push('/login')
        }
    }
    render() { 
        return ( 
            <div>
                <NavigationComponent></NavigationComponent>
                <div style={{width:700}} >
                    <div>
                    <h1><img src={this.state.logoURL} style={{width:80,marginBottom:-100}} /></h1>
                     <h3 style={{marginLeft:90,marginTop:10}}><i><b>Tweet</b></i></h3>
                     <h4 style={{marginLeft:90}}><b>Tweet Here!!</b> Share your <b>Thoughts!!</b></h4>
                     <h4 ><b>Tweet</b> is an App for registered users to post new tweets</h4>
                    </div>               
                </div>
            </div>
         );
    }
}
 
export default HomeComponent;