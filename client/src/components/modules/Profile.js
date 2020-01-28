import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import PostPopup from "./PostPopup.js";

import "../../utilities.css";
import "./Profile.css";
import { get } from "../../utilities";
import SidePane from "./SidePane.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class Profile extends Component {
  constructor(props) {
    super(props); //prop: profile user's id as    idProfile
    // Initialize Default State
    this.state = {
      nameOfProfile : "???",
      numberOfLikes : 0,
      // numberOfDislikes: 0,
      numberOfAdvices: 0,
      numberOfRatings:0,
      totalRatings:0,
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    const query = { idProfile: this.props.idProfile};
    get("/api/getProfileById", query).then(
      (foundProfileUser) => {
        this.setState( 
          {
            nameOfProfile: foundProfileUser.name,
            numberOfLikes: foundProfileUser.numLikes,
            // numberOfDislikes: foundProfileUser.numDislikes,
            numberOfAdvices: foundProfileUser.numAdvices,
            numberOfRatings: foundProfileUser.numRatings,
            totalRatings: foundProfileUser.totalRatings,
          }
        )
      }
    )
  }

  componentDidUpdate(prevProps){
    if(prevProps.idProfile.toString() !==this.props.idProfile.toString()){
      const query = { idProfile: this.props.idProfile};
      get("/api/getProfileById", query).then(
        (foundProfileUser) => {
          this.setState( 
            {
              nameOfProfile: foundProfileUser.name,
              numberOfLikes: foundProfileUser.numLikes,
              // numberOfDislikes: foundProfileUser.numDislikes,
              numberOfAdvices: foundProfileUser.numAdvices,
              numberOfRatings: foundProfileUser.numRatings,
              totalRatings: foundProfileUser.totalRatings,
            }
          )
        }
      )
    }
  }

  getRankString=(numberOfAdvices, numberOfRatings)=>{
      let score = numberOfAdvices + numberOfRatings;
      if(score < 20){
        return "candle"
      }
      else if (score < 40){
        return "lamp"
      }
      else if (score < 60){
        return "lantern"
      }
      else if (score < 80){
        return "torch"
      }
      else if (score < 100){
        return "chandelier"
      }
      else if (score < 120){
        return "sol"
      }
      else if (score < 140){
        return "Ω"
      }
      else{
        return "enlightened"
      }
  }
  getRankNumber=(numberOfAdvices, numberOfRatings)=>{
    let score = numberOfAdvices + numberOfRatings;
      if(score < 20){
        return "1"
      }
      else if (score < 40){
        return "2"
      }
      else if (score < 60){
        return "3"
      }
      else if (score < 80){
        return "4"
      }
      else if (score < 100){
        return "5"
      }
      else if (score < 120){
        return "6"
      }
      else if (score < 140){
        return "7"
      }
      else{
        return "8"
      }
  }
  getRankStyleString=(numberOfAdvices, numberOfRatings, totalRatings)=>{
      let score = (numberOfRatings===0)?0:totalRatings/numberOfRatings;
      let ret = "rankGlow";
      if     (score<16){ret+="0";}
      else if(score<32){ret+="1";}
      else if(score<48){ret+="2";}
      else if(score<64){ret+="3";}
      else if(score<80){ret+="4";}
      else if(score<96){ret+="5";}
      else if(score<112){ret+="6";}
      else if(score<128){ret+="7";}
      else if(score<144){ret+="8";}
      else if(score<160){ret+="9";}
      else if(score<176){ret+="10";}
      else if(score<192){ret+="11";}
      else if(score<208){ret+="12";}
      else if(score<224){ret+="13";}
      else if(score<240){ret+="14";}
      else if(score<256){ret+="15";}
      else if(score<272){ret+="16";}
      else if(score<288){ret+="17";}
      else if(score<304){ret+="18";}
      else if(score<320){ret+="19";}
      else if(score<336){ret+="20";}
      else {ret+="21";}
      return ret;
  }

  render() {
    let sph = "sidePaneExpandedProfile";
    let rankString = this.getRankString(this.state.numberOfAdvices,
                                   this.state.numberOfRatings);
    let rankGlow = this.getRankStyleString(this.state.numberOfAdvices,
                   this.state.numberOfRatings, this.state.totalRatings);
    let rankNumber = this.getRankNumber(this.state.numberOfAdvices,
                                    this.state.numberOfRatings);
    if(this.props.isSidePaneHidden){
        sph = "sidePaneCollapsedProfile";
    }
    return(
      <div className={"feedContainer"}>
        <SidePane
                    isSidePaneHidden = {this.props.isSidePaneHidden}
                    hideSidePane = {this.props.hideSidePane}
                    showSidePane = {this.props.showSidePane}
                />
        <div className={sph}>
          <div className="profileNameLabel">
            {this.state.nameOfProfile}
          </div>
          <div className="rowGroup">
            <div className="statsBlock">
                <div className = "numAdvicesLabel">
                  <div className="numAdvicesStat">{this.state.numberOfAdvices}</div>&nbsp; advices
                </div>
                <div className = "numRatingsLabelProfile">
                  <div className="numRatingsStat">{this.state.numberOfRatings}</div>&nbsp; received ratings
                </div>
                <Link to={"/user/"+this.props.idProfile} className="viewLink">
                  <div>view advices from</div>
                  <div>{this.state.nameOfProfile}</div>
                </Link>
            </div>
          </div>
          <div className="rankContainer unselectable">
              <div className="rankLabel unselectable">
                &#x2014;&#x2014;&nbsp;RANK&#8239;{rankNumber}&nbsp;&#x2014;&#x2014;
              </div>
              <div className="rankFormatContainer unselectable">
                <div className="leftBrace unselectable">
                  &#x7b;
                </div>
                <div className= {"unselectable rankDescription "+rankGlow}>
                  {rankString}
                </div>
                <div className="rightBrace unselectable">
                  &#x7d;
                </div>
              </div>
          </div>
          {this.props.isShowingPostPopup 
                && <PostPopup
                    closePostPopup={this.props.closePostPopup}
                    addNewAdvice={(advObj)=>{this.componentDidMount()}}
                    shouldAddNewAdvice = {(advObj)=>{return true}} //can also be null
                />
            }
        </div>
      </div>
    )
  }
}

export default Profile;
