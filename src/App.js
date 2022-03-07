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
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.openPack}>
          <h1>Open Card Pack</h1>
        </button>
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
                  onMouseMove={(event) => {
                    this.onMouseMove(event, index);
                  }}
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
  onMouseMove(event, id) {
    console.log("X =" + event.clientX);
    console.log("Y =" + event.clientY);
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
