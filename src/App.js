import "./styles.css";
import { getCard } from "./cards.js";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pack: [] };
    this.openPack = this.openPack.bind(this);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.openPack}>
          <h1>Open Card Pack</h1>
        </button>
        {this.state.pack.length}

        {this.state.pack.map((i) => (
          <div>{i.name}</div>
        ))}

        <div className="cardPack"></div>
      </div>
    );
  }

  openPack() {
    if (this.state.pack.length === 0) {
      let cardPack = [];
      for (let i = 0; i < 5; i++) {
        cardPack = cardPack.concat(getCard());
      }

      this.setState({ pack: this.state.pack.concat(cardPack) });
    }
  }
}
