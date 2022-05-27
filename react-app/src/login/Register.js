import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: '',
      error: false
    };

    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.register= this.register.bind(this);
  }

  onChange = (e) => {

 
  
    this.setState({ [e.target.name]: e.target.value });
    this.validate();

  
  }
 

  //validation 
  validate () {


      if(this.state.username.length < 4) {
       this.setState({error: true});
      }
      else {
        this.setState({error: false});
      }
 
      if(this.state.password.length < 6) {
        this.setState({error: true});
       }
       else {
        this.setState({error: false});
       }

       if(this.state.confirm_password.length < 6) {
        this.setState({error: true});
       }
       else {
        this.setState({error: false});
       }

       console.log(this.state.error);
  
  
 
  }
  
  // register by sending the username and password in a POST request to the /auth/register endpoint
  register = (e) => {




    console.log(this.state.error);
    if(this.state.error === false && this.state.password ===this.state.confirm_password) {
      axios.post('http://localhost:8001/auth/register', {
        username: this.state.username,
        password: this.state.password,
      }).then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success"
        });
        window.location.replace("/login");
      }).catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error"
        });
      });
    }
    else if(this.state.confirm_password !== this.state.password && this.state.error === true) {
      swal({
        text: "Please correct errors",
        icon: "error"
      });
    }
    else if(this.state.confirm_password !== this.state.password && this.state.error === false) {
      swal({
        text: "Please confirm password",
        icon: "error"
      });
    }
    else {
      swal({
        text: "Please correct errors",
        icon: "error"
        
      });
    }
   
  }

  render() {
    return (
        <div className = "Register">
        
            <h1>Register</h1>
        

          <div>
            <TextField
              
                type="text"
                autoComplete="off"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                placeholder="User Name"
                required
            
                error={this.state.error}
                helperText={this.state.error == false ? '' : `Minimum 4 length`}
             
            />
            <br /><br />
            <TextField
              
                type="password"
                autoComplete="off"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
                required
                error={this.state.error}
                helperText={this.state.error == false ? '' : `Minimum 6 length`}
                
            />
            <br /><br />
            <TextField
              
                type="password"
                autoComplete="off"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.onChange}
                placeholder="Confirm Password"
                required
                error={this.state.error}
                helperText={this.state.error === false ? '' : `Minimum 6 length`}
                
            />
            <br /><br />
            <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.username == '' && this.state.password == ''}
                onClick={this.register}
            >
              Register
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/">
              Login
            </Link>
          </div>
        </div>
    );
  }
}
