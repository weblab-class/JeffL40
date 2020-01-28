import React, { Component } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./RatingForm.css";


class RatingFormNoUndo extends Component {
    constructor(props){
        super(props); //props: adviceId
        this.state={
            currentRating: 0,
            initHasRated: false,
            isShowing: false,
        }
    }
    handleChange = (event) => {
        this.setState({
            currentRating: Number(event.target.value)
        })
    }
    displayRatingForm=()=>{
        this.setState({isShowing:true});
    }
    hideRatingForm=()=>{
        this.setState({isShowing:false});
    }
    submitRating = () => {
        let body = {
            userId: this.props.userId,
            creator_id: this.props.creator_id,
            adviceId: this.props.adviceId,
            rating: this.state.currentRating,
        }
        this.props.trueHasRated();
        this.props.switchRatingForm();
        
        post("/api/submitRating", body).then(
            (deltaObj) => {
                this.props.updateRatings(deltaObj.deltaTotalRatings,
                     deltaObj.deltaNumRatings);
            }
        )
    }
    undoRating = () => {
        let body = {
            userId: this.props.userId,
            creator_id: this.props.creator_id,
            adviceId: this.props.adviceId,
        }

        this.props.falseHasRated();
        this.props.switchRatingForm();
        
        post("/api/undoRating", body).then(
            (deltaObj) => {
                this.props.updateRatings(deltaObj.deltaTotalRatings, deltaObj.deltaNumRatings)
                
            }
        )
    }
    componentDidMount(){
        this.setState({initHasRated: this.props.initHasRated})
    }
    componentDidUpdate(prevProps){
        if(prevProps.initHasRated !== this.props.initHasRated){
            this.setState({initHasRated: this.props.initHasRated})
        }
    }
    getColor=(ratingValue)=>{
        let ret = "paramStyle";
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
        let styleParam = this.getColor(this.state.currentRating);
        let glowParam = "GLOW"+styleParam;
        let badAdviceModifier = (this.state.currentRating < 112)? "midTextModifier":"";
        let goodAdviceModifier = (this.state.currentRating>240)? "midTextModifier":"";
        let shouldDisplayRatingForm = (this.state.isShowing)?"":"noDisplay";
        if (this.state.currentRating<48){
            badAdviceModifier = "largeTextModifier";
        };
        if (this.state.currentRating>304){
            goodAdviceModifier="largeTextModifier"
        };
        return (
                <div className={"ratingFormContainer noUndoModifier "+glowParam}>
                    <div className="instructions unselectable">
                        Pick the color that corresponds to your rating.
                    </div>
                        <div className="labelContainer unselectable">
                            <div 
                                className={"badAdviceLabel unselectable " 
                                            + badAdviceModifier
                                            }>
                                        bad advice
                            </div>
                            <div 
                                className={"enlighteningLabel unselectable "
                                            +goodAdviceModifier
                                            }>
                                    enlightening
                            </div>
                        </div>
                        <div className="rangeContainer">
                            <input type="range" onChange = {this.handleChange}
                                    min="0" max="351"
                                    className={"rangeSlider "+styleParam}></input>
                        </div>
                    {/* <div className="ratingLabel">
                        currentRating: {this.state.currentRating}
                    </div> */}
                    <button onClick = {this.submitRating} className="submitRatingButton unselectable">
                        submit rating
                    </button>
                </div>
        )
    }
}
export default RatingFormNoUndo;