import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
// import LikeButton from "./LikeDislikeButtons.js";

import "../../utilities.css";
import "./StoryButton.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class StoryButton extends Component {
    constructor(props){
        super(props); //props: story
        this.state={
            
        }
    }
    componentDidMount(){

    }
    render(){
        if (this.props.adviceStory === ""){
            return (
                <div className="noStory">
                    No story
                </div>
            )
        }
        if (this.props.showStory) {
            return(
                <div className="hideStory">
                    <button className="hideStoryButton" onClick={this.props.hideStory}>
                        &#x25B2;&nbsp;&nbsp;&nbsp;hide story&nbsp;&nbsp;&nbsp;&#x25B2;
                    </button>
                </div>
            )}
        else {
            return(
                <button className="showStory" onClick={this.props.displayStory}>
                    &#x25BC;&nbsp;&nbsp;&nbsp;show story&nbsp;&nbsp;&nbsp;&#x25BC;
                </button>
            )
        }
    }
}
export default StoryButton;