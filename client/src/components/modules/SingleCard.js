import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import LikeButton from "./LikeDislikeButtons.js";

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
            numLikes:0,
            initLikedState:-1,
        }
    }
    componentDidMount(){
        this.setState({numLikes: this.props.numLikes});
        
        //console.log("userHasLiked", this.props.userHasLiked);
        //console.log("adviceId: ", this.props.adviceId);
        // let inLiked= this.props.userHasLiked.includes(
        //     this.props.adviceId
        // );
        // //console.log("inLiked", inLiked);
        // if (inLiked) {
        //    // console.log("conditional branch inLiked");
        //     this.setState({initLikedState:1});
        // }
        // else {
        //     //console.log("conditional branch not inLiked");
        //     this.setState({initLikedState:0}, () => {
        //        // console.log("initLikeState after compMount", this.state.initLikedState);
        //     });
        // }
        
    }
    incrementShownLikes = ()=> {
        console.log("numLikes state", this.state.numLikes);
        this.setState({
            numLikes: this.state.numLikes + 1
        });
    }
    decrementShownLikes=()=> {
        console.log("numLikes state", this.state.numLikes);
        this.setState({
            numLikes: this.state.numLikes - 1
        });
    }
    render(){

        let inLiked= this.props.userHasLiked.includes(
            this.props.adviceId
        ) ? 1 : 0;
        
      
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
                <br/>
                {"date: " + this.props.timeStamp}
                <br/>
                {"adviceId: " + this.props.adviceId}
                <br/>
                {"numLikes: " + this.state.numLikes}
                <br/>
                <LikeButton
                    adviceId = {this.props.adviceId}
                    creator_id = {this.props.creator_id}
                    userId = {this.props.userId}
                    initLikedState = {inLiked}
                    incrementShownLikes = {this.incrementShownLikes}
                    decrementShownLikes = {this.decrementShownLikes}
                />
            </div>
        )
    }
}
export default SingleCard;