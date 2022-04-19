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
      confirm_password: ''
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
 

  register = () => {

    
    if(this.state.confirm_password === this.state.password) {
      axios.post('http://localhost:8001/register', {
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
          icon: "error",
          type: "error"
        });
      });
    }
    else {
      swal({
        text: "Please confirm your password",
        icon: "error",
        type: "error"
      });
    }
   
  }

  render() {
    return (
        <div className = "Register">
        
            <h1>Register</h1>
        

          <div>
            <TextField
                id="standard-basic"
                type="text"
                autoComplete="off"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                placeholder="User Name"
                required
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="password"
                autoComplete="off"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                placeholder="Password"
                required
            />
            <br /><br />
            <TextField
                id="standard-basic"
                type="password"
                autoComplete="off"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.onChange}
                placeholder="Confirm Password"
                required
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
