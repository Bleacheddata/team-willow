import React from "react";
import axios from "axios";
export default class CardPacks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cardPack:  [],
        packCount: this.props.packCount
      };
  
    
      this.openPack = this.openPack.bind(this);
      this.onHover = this.onHover.bind(this);
      this.onLeaveHover = this.onLeaveHover.bind(this);
      this.onClick = this.onClick.bind(this);
    }

      componentDidMount() {
  
        
     
        this.setState({
          packCount: this.props.packCount
        });
        console.log(this.state.packCount);
        if(this.state.packCount<=0) {
          document.getElementById("btn-packopen").setAttribute("disabled", "disabled");
        }
     
      
      
    }
    
    render() {
      return (
        <div className="CardPacks">
         
         <div className = "cardpack-buttons">
         <h1>{this.state.packCount} card packs remaining</h1>
         <div>
         <button>Buy Card Packs</button>
          <button id = "btn-packopen" onClick={this.openPack}>Open Card Pack</button>
          </div>
          </div>
          <div className="cards-container">
            {this.state.cardPack != [] && 
             this.state.cardPack.map((i, index) => (
              <div key = {`card ${i.index}`} className={`card`}>
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
                    <div className = "card-content">
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


  

  async openPack(event) {
    if(this.state.packCount>=1) {
     
    axios.put('http://127.0.0.1:8001/user/cardpack', "",{
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
    .then((res) => {
      this.setState({ cardPack: []});
      this.setState({
                cardPack: res.data.concat(),
                packCount : this.state.packCount-1
           });
      
    })
    .catch((err) => {
      console.error(err)
    })
  }
  else if (this.state.packCount<=0) {
    event.target.setAttribute("disabled", "disabled");
  }
  

  
  
  }
  

  }
  