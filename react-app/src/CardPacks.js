import React from "react";
import axios from "axios";
import swal from 'sweetalert';
export default class CardPacks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cardPack:  [],
        packCount: 0,
        gold: 0
      };
  
      this.getUserCards = this.getUserCards.bind(this);
      this.openPack = this.openPack.bind(this);
      this.onHover = this.onHover.bind(this);
      this.onLeaveHover = this.onLeaveHover.bind(this);
      this.onClick = this.onClick.bind(this);
      this.buyPack = this.buyPack.bind(this);
    }

     componentDidMount() {
      this.getUserCards();

     }
      getUserCards() {
      
        let token = localStorage.getItem("token")
   
   
     if(token!=undefined || token!=null) {
      axios.get('http://127.0.0.1:8001/user', {
        headers: {
          'Authorization': token
        }
      })
      .then((res) => {
        this.setState({
          packCount: res.data.packs,
          gold: res.data.gold
        });
        console.log(this.state.packCount);
        if(this.state.packCount<=0) {
          document.getElementById("btn-packopen").setAttribute("disabled", "disabled");
        }
        else {
          document.getElementById("btn-packopen").removeAttribute("disabled");
        }
        if(this.state.gold<100) {
          document.getElementById("btn-buypack").setAttribute("disabled", "disabled");
        }
        else {
          document.getElementById("btn-buypack").removeAttribute("disabled");
        }

      })
      .catch((error) => {
        console.error(error);
       
      })
     }
     
     
     
      
      
    }
    
    render() {
      return (
        <div className="CardPacks">
         
         <div className = "cardpack-buttons">
         <h2>{this.state.packCount} card packs remaining</h2>
         <img src = "./images/dollar-coin"/>
         <h2>{this.state.gold} remaining</h2>
         <div>
    
         <button id = "btn-buypack" onClick={this.buyPack}>Buy Card Packs</button>
          <button id = "btn-packopen" onClick={this.openPack}>Open Card Pack</button>
          </div>
          </div>
          <div className="cards-container">
            {this.state.cardPack != [] && 
             this.state.cardPack.map((i, index) => (
              <div key = {`card ${index}`} className={`card disabled`}>
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
                      width="150px"
                      alt=""
                    />
                  </div>
  
                  <div
                    key={index + "Front"}
                    id={index + "Front"}
                    className={`cardframe front ${i.name}`}
                  >
                 
                    <div className = "card-front-content">
                    <h2 className="power white"> {i.power} </h2>
                    <div className="cardmid white">
                      <img
                        className="front-icon"
                        src="https://raw.githubusercontent.com/Bleacheddata/team-willow/4c8078c552029b1113077c393bce2b10f59d87de/src/images/generatorIcon.svg"
                        width="100px"
                        alt=""
                      />
                    </div>
  
                    <h2 className="cardbottom white">
                      {i.rarity} <br />
                      {i.name}
                    </h2>
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


  
    async buyPack(event) {

       if (this.state.gold>=100) {
      axios.put('http://127.0.0.1:8001/user/gold', "", {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then((res) => {
        swal({
          text: res.data,
          icon: "success"
        });
        this.getUserCards();
      })
      .catch((err) => {
        swal({
          text: err,
          icon: "error",
        });
      })
    }
       else if (this.state.gold<100) {
        event.target.setAttribute("disabled", "disabled");
      }
      
    }

  async openPack(event) {
    if(this.state.packCount>=1) {

      
      
       
      
    axios.put('http://127.0.0.1:8001/user/cardpacks', "",{
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
      this.getUserCards();


      let cards = document.getElementsByClassName("card");
      for (let i= 0; i < cards.length; i++) {
        
       setTimeout(function() {

         cards.item(i).classList.remove("disabled");
         cards.item(i).classList.add("roll-in-blurred-left");
   
     
      

       }, 1000*i);
      }
      
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
  