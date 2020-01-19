import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class NavBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(

                <nav className = "navbarContainer">
                        <Link to="/" className="navbarLink u-inlineBlock">
                        Home
                        </Link>
                        <Link to="/profile" className="navbarLink u-inlineBlock">
                        Profile
                        </Link>
                        <a
                            className="navbarLink u-inlineBlock"
                            href="#"
                            onClick={this.props.openPostPopup}
                        >
                            Add advice
                        </a>
                        <GoogleLogout
                            className="u-inlineBlock u-showBorder logoutContainer"
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={this.props.handleLogout}
                            onFailure={(err) => console.log(err)}
                        />

                </nav>

        )
    }
}
export default NavBar;