import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./SingleCard.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class SingleCard extends Component {
    constructor(props){
        super(props); //props: content
        this.state={
            goodComments : [],
            badComments : [],
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="cardContainer">
                {"A single card"}
                <br/>
                {"advice: " + this.props.advice}
                <br/>
                {"adviceStory: " + this.props.adviceStory}
                <br/>
                {"creator: " + this.props.creator_name}
                <br/>
                {"creatorId: " + this.props.creator_id}
                <br/>
                {"category: " + this.props.category}
            </div>
        )
    }
}
export default SingleCard;