import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";

import {NewAdvice} from "./NewPostInput.js";

import "../../utilities.css";
import "./PostPopup.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class PostPopup extends Component {
    constructor(props){
        super(props); //gets prop closePostPopup
        this.state={
        }
    }
    componentDidMount(){
        
    }

    render(){
        return(
            <>
                <div className="popupContainer" onClick={this.props.closePostPopup}>
                    thisIsThePopupContainer
                </div>
                <div className="formContainer">
                    cant_click_here!
                    <NewAdvice 
                        addNewAdvice={this.props.addNewAdvice}
                        shouldAddNewAdvice = {this.props.shouldAddNewAdvice}
                        closePostPopup={this.props.closePostPopup}
                    />
                </div>
            </>
        );
    }
}
export default PostPopup;

