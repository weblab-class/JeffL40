import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import SingleCard from "./SingleCard.js";
import {NewAdvice} from "./NewPostInput.js";
import PostPopup from "./PostPopup.js";

import "../../utilities.css";
import "./AllFeed.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class AllFeed extends Component {
    constructor(props){
        super(props); //has prop isSidePaneHidden
        this.state={
            adviceList: [],
        }
    }
    componentDidMount(){
        //body
        const query = { idQueriedUser: this.props.idQueriedUser
                     , categoryName: this.props.categoryName};
        console.log("allFeed received: " , query);
        console.log('query.idQueriedUser === "null"', query.idQueriedUser === "null");
        get("/api/advice", query).then((adviceObjs) => {
            let reversedAdviceObjs = adviceObjs.reverse();
            reversedAdviceObjs.map((adviceObj) => {
              this.setState({ adviceList: this.state.adviceList.concat([adviceObj]) });
        });
        });
    }
    addNewAdvice = ( adviceObject) => {
        this.setState({
            adviceList: [ adviceObject].concat(this.state.adviceList),
            });
    }
    shouldAddNewAdvice = (adviceObject) => {
        if( this.props.idQueriedUser !== "") {
            return adviceObject.creator_id === this.props.idQueriedUser;
        }
        else if ( this.props.categoryName !== "") {
            return adviceObject.category === this.props.categoryName;
        }
        else {
            return true;
        }
    }
    render(){
        let advices = null;
        const hasAdvice = this.state.adviceList.length !== 0;
        if (hasAdvice) {
            advices = this.state.adviceList.map((advObj) => (
                <SingleCard
                key={`Card_${advObj._id}`}
                //_id={advObj._id}
                creator_name={advObj.creator_name}
                creator_id={advObj.creator_id}
                advice={advObj.advice}
                adviceStory={advObj.adviceStory}
                category={advObj.category}
                //userId={this.props.userId}
                />
        ));
        } else {
            advices = <div>No stories!</div>;
        }
        let label = "";
        if (this.props.userName) {
            label = "user: " + this.props.userName;
        }
        else {
            label = "category: " + this.props.categoryName;
        }
        let sph = "sidePaneExpanded";
        if(this.props.isSidePaneHidden){
            sph = "sidePaneCollapsed";
        }
        return(
            <div className={sph}>
            THISISALL_FEED...and... {label}
            <NewAdvice 
                addNewAdvice={this.addNewAdvice}
                shouldAddNewAdvice = {this.shouldAddNewAdvice}
            />
            <div className="categoryLabel">
                CATEGORYLABELHERE
            </div>
            {advices}
            {this.props.isShowingPostPopup 
                && <PostPopup
                    closePostPopup={this.props.closePostPopup}
                    addNewAdvice={this.addNewAdvice}
                    shouldAddNewAdvice = {this.shouldAddNewAdvice}
                />
            }
            </div>
            
        )
    }
}
export default AllFeed;

