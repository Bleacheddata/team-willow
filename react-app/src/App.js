
import React from "react";
// import { Switch, Redirect, Route } from 'react-router';
import { Routes, Redirect, Route } from 'react-router';
import axios from "axios";
import { Navbar, Container } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import CardPacks from "./CardPacks";
import "./styles.css";
export default class App extends React.Component {
  constructor(props){
    super(props);
  
    this.authorizeUser = this.authorizeUser.bind(this);
    this.updateLogIn = this.updateLogIn.bind(this)
    this.state = {
      loggedIn : false,
      packCount : 0
    }
  }

  updateLogIn () {
    this.setState({
      loggedIn: true
    })
  }
  
  componentDidMount() {


        this.authorizeUser();
       
    
  }
  authorizeUser() {
    let token = localStorage.getItem("token")
   
   
     if(token!=undefined || token!=null && this.state.loggedIn==false) {
      axios.get('http://127.0.0.1:8001/user', {
        headers: {
          'Authorization': token
        }
      })
      .then((res) => {
        console.log(token);
       console.log(res);
       this.setState({loggedIn : true, packCount: res.data.packs});
      })
      .catch((error) => {
        console.error(error);
        this.setState({loggedIn : false});
      })
     }

    
  }
 
  render() {
    return (
      <BrowserRouter>
      
        <NavBar loggedIn = {this.state.loggedIn} updateLogIn = {this.updateLogIn}/>

       
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Home loggedIn = {this.state.loggedIn} />}></Route>

          {this.state.loggedIn === false && 
          <>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          </>
          }
          {this.state.loggedIn === true && 
          <Route exact path="/user/cardpacks" element={<CardPacks packCount = {this.state.packCount}/>}></Route>
          }

        </Routes>

      
     
     
      </BrowserRouter>
    );
  }
}
class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className = "NotFound">
      <h1>Error 404</h1>
      <h2>Page Not Found</h2>
        <Link to="/">Go Home</Link>
    </div>
  )
    }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Home">
        {" "}
        <h1>Welcome to the game</h1>
       
        {this.props.loggedIn === true && 
        <Link to="/user/cardpacks">Open cards</Link>
       }

       {this.props.loggedIn === false && 
        <Link to="/login">Log In</Link>
       }  
      </div>
    );
  }
}
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.clear();
    window.location.replace("/");
  }

  render() {
    return (
      <div className="NavBar">
        
        
        {this.props.loggedIn === false && 
         <button>Log In</button>
        }

        {this.props.loggedIn === true && 
          <button onClick = {this.logOut}>Log out</button>
        }
        

      
      </div>
    );
  }
}
