import "./styles.css";
import { createCard } from "./cards.js";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <br />
        <br />
        <h1>Team Willow</h1>
      </div>
    );
  }
}
