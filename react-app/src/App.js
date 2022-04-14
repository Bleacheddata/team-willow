import "./styles.css";
import React from "react";
import ReactDOM from 'react-dom';
// import { Switch, Redirect, Route } from 'react-router';
import { Routes, Redirect, Route } from 'react-router';

import { Navbar, Container } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import Login from "./login/Login";
import Register from "./login/Register";
import './login/Login.css';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/cardopening" element={<CardOpening/>}></Route>
            <Route path='/dashboard' component={Home} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        {/*<Switch>*/}
        {/*  <Route exact path='/' component={Login} />*/}
        {/*  <Route exact path='/register' component={Register} />*/}
        {/*  <Route path='/dashboard' component={Home} />*/}
        {/*  /!* <Route component={NotFound}/> *!/*/}
        {/*</Switch>*/}
      </BrowserRouter>
    );
  }
}
class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        {" "}
        <h1>Welcome to the game</h1>
        <Link to="/cardopening">Open cards</Link>
      </div>
    );
  }
}
class NavBar extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <Navbar>
          <Container>
            <Link to="/">
              <Navbar.Brand>Team Willow</Navbar.Brand>
            </Link>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link to="/login">Log in</Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
class CardOpening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: [],
    };

  
    this.openPack = this.openPack.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLeaveHover = this.onLeaveHover.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  
  render() {
    return (
      <div className="CardOpening">
      
        <button onClick={this.openPack}>Open Card Pack</button>
        <div className="cards-container">
          {this.state.pack.map((i, index) => (
            <div className={`card`}>
              <div
                id={index}
                className={`card-content ${i.rarity}`}
                onMouseEnter={() => this.onHover(index)}
                onMouseLeave={() => this.onLeaveHover(index)}
                onClick={() => this.onClick(index)}
              >
                <div className={`cardframe back`}>
                  <img
                    className="back-icon"
                    src="https://uploads.codesandbox.io/uploads/user/adb5b6ff-3d37-4b52-b8d5-25098bc45d0a/DoYE-back_icon.png
            "
                    width="200px"
                    alt=""
                  />
                </div>

                <div
                  key={index + "Front"}
                  id={index + "Front"}
                  className={`cardframe front ${i.name}`}
                >
                  <div className="cardtop white">
                    {i.rarity} <br />
                    {i.name}
                  </div>
                  <div className="cardmid white">
                    <img
                      className="front-icon"
                      src="https://raw.githubusercontent.com/Bleacheddata/team-willow/4c8078c552029b1113077c393bce2b10f59d87de/src/images/generatorIcon.svg"
                      width="120px"
                      alt=""
                    />
                  </div>

                  <div className="power white"> {i.power} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  
  onHover(id) {
    let card = document.getElementById(id);
    card.classList.add("hover");
  }
  onLeaveHover(id) {
    let card = document.getElementById(id);
    card.classList.remove("hover");
  }
  onClick(id) {
    let card = document.getElementById(id);
    card.classList.remove("hover");
    card.classList.add("rotate");
  }

  openPack(event) {
    event.target.setAttribute("disabled", "disabled");

    fetch("http://127.0.0.1:8001/cardpack")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          pack: result
        });
        console.log(this.state.pack);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
}
