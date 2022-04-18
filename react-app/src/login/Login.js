import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
import {Navigate} from "react-router-dom";
import axios from "axios";
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  logIn = () => {

    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('http://localhost:8001/login', {
      username: this.state.username,
      password: pwd,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
    
      window.location.replace("/");

  

    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        localStorage.clear();
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
        });
      }
    });
  }

  render() {
    return (
        <div className = "Login">
          <div>
            <h2>Login</h2>
          </div>

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
            <Button
                className="button_style"
                variant="contained"
                color="primary"
                size="small"
                disabled={this.state.username == '' && this.state.password == ''}
                onClick={this.logIn}
            >
              Login
            </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/register">
              Register
            </Link>
          </div>
        </div>
    );
  }
}
