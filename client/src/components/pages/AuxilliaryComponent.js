import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import LoginPage from "./LoginPage.js";
import SidePane from "../modules/SidePane.js";
import AllFeed from "../modules/AllFeed.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class AuxilliaryComponent extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        // userId: null,
        // handleLogin: null,
        // handleLogout: null,
    };
  }

  render() {
    if (
        true||
      this.props.userId
      ) {
      return (//logged in //ADD ALL_FEED AND SIDEBAR HERE!!!
      <>
        <LoginPage
            handleLogin={this.props.handleLogin}
            handleLogout={this.props.handleLogout}
            userId={this.props.userId}
          />
        <SidePane/>
        <AllFeed/>
      </>)
    }
    else {//not logged in. 
      return (
        <>
          <LoginPage
            handleLogin={this.props.handleLogin}
            handleLogout={this.props.handleLogout}
            userId={this.props.userId}
          />
        </>
      )
    }

  }
}

export default AuxilliaryComponent;
