import React from "react";
import axios from "axios";
import swal from 'sweetalert';
export default class CardPacks extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cardPack:  [],
        packCount: this.props.packCount,
        gold: this.props.gold
      };
  
    
      this.openPack = this.openPack.bind(this);
      this.onHover = this.onHover.bind(this);
      this.onLeaveHover = this.onLeaveHover.bind(this);
      this.onClick = this.onClick.bind(this);
      this.buyPack = this.buyPack.bind(this);
    }

      componentDidMount() {
  
        
     
        this.setState({
          packCount: this.props.packCount,
          gold : this.props.gold
        });
        console.log(this.state.packCount);
        if(this.state.packCount<=0) {
          document.getElementById("btn-packopen").setAttribute("disabled", "disabled");
        }
        if(this.state.gold<100) {
          document.getElementById("btn-buypack").setAttribute("disabled", "disabled");
        }

     
      
      
    }
    
    render() {
      return (
        <div className="CardPacks">
         
         <div className = "cardpack-buttons">
         <h1>{this.state.packCount} card packs remaining</h1>
         <div>
         <button id = "btn-buypack" onClick={this.buyPack}>Buy Card Packs</button>
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

       if (this.state.gold>100) {
      axios.get('http://127.0.0.1:8001/user/buypack',{
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      })
      .then((res) => {
        swal({
          text: res.data,
          icon: "success"
        });
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
  