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
          }
        )
      }
    )
  }

  render() {
    let sph = "sidePaneExpanded";
    if(this.props.isSidePaneHidden){
        sph = "sidePaneCollapsed";
    }
    return(
      <div className={"feedContainer"}>
        <SidePane
                    isSidePaneHidden = {this.props.isSidePaneHidden}
                    hideSidePane = {this.props.hideSidePane}
                    showSidePane = {this.props.showSidePane}
                />
        <div className={sph}>
          profile of {this.state.nameOfProfile}
          <br/>
          likes: {this.state.numberOfLikes}
          <br/>
          {/*dislikes: {this.state.numberOfDislikes}
          <br/> */}
          number of advices: {this.state.numberOfAdvices}
          <br/>
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
