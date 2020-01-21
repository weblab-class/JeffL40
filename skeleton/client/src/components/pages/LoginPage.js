import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import NavBar from "../modules/NavBar.js";

import "../../utilities.css";
import "./Skeleton.css";
import "./LoginPage.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {

      return (
          <div className="u-textCenter loginPageContainer">
            <div className="EnlightenTag">Enlighten</div>
            <div className="appDescription">It’s never fun to learn things the hard way.
                <br></br>Share advice with others to enlighten and be enlightened.</div>
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
                className="loginButton"
              />
          </div>
      )
  }
}

export default LoginPage;
