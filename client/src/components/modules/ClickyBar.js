import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./ClickyBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class ClickyBar extends Component {
    constructor(props){
        super(props); //has prop isSidePaneHidden
        this.state={
        }
    }
    componentDidMount(){

    }
    render(){
        if (this.props.isSidePaneHidden){
            return(
                <div 
                    className="theBarCollapsed"
                    onClick={this.props.showSidePane}
                    >
                    &#x2B9E;
                </div>
            )
        }
        else{
            return(
                <div 
                    className="theBarExpanded"
                    onClick={this.props.hideSidePane}
                    >
                    &#x2B9C;
                </div>
            )
        }
    }
}
export default ClickyBar;