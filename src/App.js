import "./styles.css";
import { getCard } from "./cards.js";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pack: [] };
    this.openPack = this.openPack.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLeaveHover = this.onLeaveHover.bind(this);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.openPack}>
          <h1>Open Card Pack</h1>
        </button>
        <div className="cards-container">
          {this.state.pack.map((i, index) => (
            <div
              key={index}
              id={index}
              onMouseOver={() => this.onHover(index, i.border)}
              onMouseLeave={() => this.onLeaveHover(index)}
              className="frame"
              style={{
                background: `url(${i.image}) no-repeat center center / cover`,
                border: `0.5rem outset ${i.border}`
              }}
            >
              <div className="cardtop white">
                {i.rarity} <br />
                {i.name}
              </div>
              <div className="cardmid white">{i.type}</div>

              <div className="power white">{i.power} </div>

              <div className="texture"> </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  onHover(id, color) {
    let card = document.getElementById(id).style;
    card.transitionDuration = "0.5s";
    card.width = "16vmax";
    card.height = "26.66vmax";
    card.boxShadow = `0 0 20px 10px ${color}`;

    if (color === "gold") {
      card.boxShadow = `0 0 50px 30px ${color}`;
    }
  }

  onLeaveHover(id) {
    let card = document.getElementById(id).style;
    card.transitionDuration = "0.2s";
    card.width = "15vmax";
    card.height = "25vmax";
    card.boxShadow = ``;
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
