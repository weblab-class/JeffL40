import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import LikeButton from "./LikeDislikeButtons.js";
import StoryButton from "./StoryButton.js";
import RatingForm from "./RatingForm.js";
import RatingFormNoUndo from "./RatingFormNoUndo.js";

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
            showStory:false,
            numRatings:0,
            totalRatings:0,
            showRatingForm:false,
            initHasRated:false,
        }
    }
    componentDidMount(){
        console.log("card advice id: ", this.props.adviceId)

        this.setState({numLikes: this.props.numLikes,
                       numRatings: this.props.numRatings,
                       totalRatings: this.props.totalRatings,
                       initHasRated: this.props.initHasRated,
        });
        console.log("after comp mount setstate inithasrated", this.state.initHasRated)
    }
    componentDidUpdate(prevProps){
        if(prevProps.initHasRated!==this.props.initHasRated){
            this.setState({initHasRated:this.props.initHasRated})
        }
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
    updateRatings = (deltaTotalRatings, deltaNumRatings) =>{
        console.log("updateRatings called");
        console.log("totalRatings before", this.state.totalRatings)
        this.setState({
            numRatings: this.state.numRatings + deltaNumRatings,
            totalRatings: this.state.totalRatings + deltaTotalRatings,
        });
        console.log("totalRatings after", this.state.totalRatings)
    }
    displayStory=()=>{
        this.setState({showStory:true});
    }
    hideStory=()=>{
        this.setState({showStory:false});
    }
    switchRatingForm=()=>{
        this.setState({showRatingForm:!this.state.showRatingForm});
    }
    trueHasRated=()=>{
        this.setState({initHasRated:true});
    }
    falseHasRated=()=>{
        this.setState({initHasRated:false});
    }
    switchHasRated=()=>{
        this.setState({initHasRated: !this.state.initHasRated})
    }
    getColor=(ratingValue)=>{
        let ret = "cardStyle";
        if(ratingValue<16){ret+="0";}
        else if(ratingValue<32){ret+="1";}
        else if(ratingValue<48){ret+="2";}
        else if(ratingValue<64){ret+="3";}
        else if(ratingValue<80){ret+="4";}
        else if(ratingValue<96){ret+="5";}
        else if(ratingValue<112){ret+="6";}
        else if(ratingValue<128){ret+="7";}
        else if(ratingValue<144){ret+="8";}
        else if(ratingValue<160){ret+="9";}
        else if(ratingValue<176){ret+="10";}
        else if(ratingValue<192){ret+="11";}
        else if(ratingValue<208){ret+="12";}
        else if(ratingValue<224){ret+="13";}
        else if(ratingValue<240){ret+="14";}
        else if(ratingValue<256){ret+="15";}
        else if(ratingValue<272){ret+="16";}
        else if(ratingValue<288){ret+="17";}
        else if(ratingValue<304){ret+="18";}
        else if(ratingValue<320){ret+="19";}
        else if(ratingValue<336){ret+="20";}
        else {ret+="21";}
        return ret;
    }
    render(){
        console.log("singlecard receivd inithasrated prop", this.props.initHasRated)
        let glowString = this.getColor((this.state.numRatings===0)?0:this.state.totalRatings/this.state.numRatings);

        let inLiked= this.props.userHasLiked.includes(
            this.props.adviceId
        ) ? 1 : 0;

        let rateText=(this.state.showRatingForm)?
        <div className="closeMark">close<br/><div>&#x24E7;</div></div>:<div>rate!</div>

        // let ratingForm = (
        //     this.state.showRatingForm)?
        //     (this.props.initHasRated)?
        //     <RatingForm
        //                     userId = {this.props.userId}
        //                     adviceId = {this.props.adviceId}
        //                     creator_id = {this.props.creator_id}
        //                     updateRatings = {this.updateRatings}
        //                     switchRatingForm = {this.switchRatingForm}
        //                     trueHasRated={this.trueHasRated}
        //                     falseHasRated={this.falseHasRated}
        //                 />:<RatingForm
        //                 userId = {this.props.userId}
        //                 adviceId = {this.props.adviceId}
        //                 creator_id = {this.props.creator_id}
        //                 updateRatings = {this.updateRatings}
        //                 switchRatingForm = {this.switchRatingForm}
        //                 trueHasRated={this.trueHasRated}
        //                 falseHasRated={this.falseHasRated}
        //             />:<div></div>;
        let ratingForm = <div></div>;
        if (this.state.showRatingForm){
            if(this.state.initHasRated){
                console.log("displaying with undo")
                ratingForm=<RatingForm
                userId = {this.props.userId}
                adviceId = {this.props.adviceId}
                creator_id = {this.props.creator_id}
                updateRatings = {this.updateRatings}
                switchRatingForm = {this.switchRatingForm}
                trueHasRated={this.trueHasRated}
                falseHasRated={this.falseHasRated}
                initHasRated={this.state.initHasRated}
                />
            }
            else{
                console.log("displaying rFnoUndo")
                ratingForm=<RatingFormNoUndo
                userId = {this.props.userId}
                adviceId = {this.props.adviceId}
                creator_id = {this.props.creator_id}
                updateRatings = {this.updateRatings}
                switchRatingForm = {this.switchRatingForm}
                trueHasRated={this.trueHasRated}
                falseHasRated={this.falseHasRated}
                initHasRated={this.state.initHasRated}
                />
            }
        }
        
        return(
            <div className = "superCardContainer">
                <div className={"cardContainer "+glowString}>
                    <div className="topLabel">
                        <Link to={"/category/"+this.props.category} className="catLabel">
                            {this.props.category}
                        </Link>
                        <Link to={"/profile/"+this.props.creator_id}className="authorLabel">
                            {this.props.creator_name}
                        </Link>
                    </div>
                    <div className="bodyContainer">
                        <div className="content">
                            <div className="adviceBox">
                                {this.props.advice}
                            </div>
                            {/* <br/>
                            {"adviceStory: " + this.props.adviceStory}
                            <br/>
                            {"creator: " + this.props.creator_name}
                            <br/>
                            {"creatorId: " + this.props.creator_id}
                            <br/>
                            {"category: " + this.props.category}
                            <br/>
                            {"date: " + this.props.timeStamp.substring(0,10)}
                            <br/>
                            {"adviceId: " + this.props.adviceId}
                            <br/>
                            {"numLikes: " + this.state.numLikes}
                            <br/>
                            {"numRatings: " + this.state.numRatings}
                            <br/>
                            {"totalRatings: " + this.state.totalRatings}
                            <br/> */}
                            {(this.state.showStory) ? 
                            <div className="adviceStory">
                                <div className="storyIndicator">
                                        {this.props.creator_name}'s story
                                </div>
                                <div>{this.props.adviceStory}</div>
                            </div>
                            
                            :<div></div>}

                            <div className="dateRateContainer">
                                <div className="dateLabelBottom">
                                    posted&nbsp;{this.props.timeStamp.substring(0,10)}
                                </div>
                                <div className="numRatingsLabel">
                                    {this.state.numRatings}&nbsp;ratings
                                </div>
                            </div>
                        </div>
                        {/* <LikeButton
                            adviceId = {this.props.adviceId}
                            creator_id = {this.props.creator_id}
                            userId = {this.props.userId}
                            initLikedState = {inLiked}
                            incrementShownLikes = {this.incrementShownLikes}
                            decrementShownLikes = {this.decrementShownLikes}
                        /> */}
                        <button onClick = {this.switchRatingForm} className = "rateButton">
                            {rateText}
                        </button>
                    </div>
                    <StoryButton
                        adviceStory={this.props.adviceStory}
                        showStory={this.state.showStory}
                        displayStory={this.displayStory}
                        hideStory={this.hideStory}
                    />
                </div>
                {ratingForm}
            </div>
        )
    }
}
export default SingleCard;