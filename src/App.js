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
              onMouseOver={() => this.onHover(index, i.rarity)}
              onMouseLeave={() => this.onLeaveHover(index, i.rarity)}
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
              <div className="cardmid white">
                <img
                  src="https://raw.githubusercontent.com/Bleacheddata/team-willow/main/src/images/generator_icon.svg"
                  width="90px"
                />
              </div>

              <div className="power white"> {i.power} </div>

              <div className="texture"> </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  onHover(id, rarity) {
    let card = document.getElementById(id);

    card.classList.add(rarity + "Glow");
  }

  onLeaveHover(id, rarity) {
    let card = document.getElementById(id);

    card.classList.remove(rarity + "Glow");
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
