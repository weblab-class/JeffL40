import React, { Component } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./LikeDislikeButtons.css";


class LikeButton extends Component {
    constructor(props){
        super(props); //props: adviceId
        this.state={
            buttonState: -1,
        }
    }
    like = () => {
        let body = { creator_id: this.props.creator_id,
            adviceId: this.props.adviceId,
            userId: this.props.userId,
            };
        post("/api/like", body).then(
            this.setState({buttonState:1})
        );
        this.props.incrementShownLikes();
    };
    undo = () => {
        let body = { creator_id: this.props.creator_id,
            adviceId: this.props.adviceId,
            userId: this.props.userId,};
        post("/api/undo", body).then(
            this.setState({buttonState:0})
        );
        this.props.decrementShownLikes();
    };
    componentDidMount(){
        this.setState( {buttonState: this.props.initLikedState});
    }
    componentDidUpdate(prevProps){
        if(prevProps.initLikedState !== this.props.initLikedState){
            this.setState( {buttonState: this.props.initLikedState});
        }
    }
    render(){
        if (this.state.buttonState === -1) {
            return(
                <div>
                    <button className="enlightened">
                        uselessButton
                    </button>
                </div>
            )
        }
        else 
        if (this.state.buttonState === 1) {
            return(
                <div>
                    <button className="enlightened" onClick={this.undo}>
                        undo
                    </button>
                </div>
            )
        }
        else {
            return(
                <div>
                    <button className="enlightened" onClick={this.like}>
                        like
                    </button>
                </div>
            )
        }
    }
}
export default LikeButton;