import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";

import SingleCard from "./SingleCard.js";
import {NewAdvice} from "./NewPostInput.js";
import PostPopup from "./PostPopup.js";
import SidePane from "./SidePane.js";
import RatingForm from "./RatingForm.js";

import "../../utilities.css";
import "./AllFeed.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class AllFeed extends Component {
    constructor(props){
        super(props); //has prop isSidePaneHidden
        this.state={
            adviceList: [],
            nameOfProfile:"",
        }
    }
    componentDidMount(){
        //body
        const query = { idQueriedUser: this.props.idQueriedUser
                     , categoryName: this.props.categoryName};
        
        get("/api/advice", query).then((adviceObjs) => {
            let reversedAdviceObjs = adviceObjs.reverse();
            reversedAdviceObjs.map((adviceObj) => {
              this.setState({ adviceList: this.state.adviceList.concat([adviceObj]) });
        });
        });
        get("/api/getProfileById", {idProfile: this.props.idQueriedUser}).then(
            (foundProfile)=>{
                this.setState({ nameOfProfile: foundProfile.name})
            }
        )
    }
    componentDidUpdate(prevProps){
        if( 
            this.props.idQueriedUser !== prevProps.idQueriedUser
            || this.props.categoryName !== prevProps.categoryName 
        ){
        const query = { idQueriedUser: this.props.idQueriedUser
            , categoryName: this.props.categoryName};
        console.log("allFeed received: " , query);
        console.log('query.idQueriedUser === "null"', query.idQueriedUser === "null");
        get("/api/advice", query).then((adviceObjs) => {
        let reversedAdviceObjs = adviceObjs.reverse();
        this.setState( {adviceList: reversedAdviceObjs});
        // reversedAdviceObjs.map((adviceObj) => {
        //     this.setState({ adviceList: this.state.adviceList.concat([adviceObj]) });
        // });
        });};
    }
    addNewAdvice = ( adviceObject) => {
        this.setState({
            adviceList: [ adviceObject].concat(this.state.adviceList),
            });
    }
    shouldAddNewAdvice = (adviceObject) => {
        //return true;
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
        console.log("allfeed received userhasrated", this.props.userHasRated)
        let advices = null;
        const hasAdvice = this.state.adviceList.length !== 0;
        if (hasAdvice) {
            advices = this.state.adviceList
                      .filter(advObj => this.shouldAddNewAdvice(advObj))
                      .map((advObj) => (    
                        <SingleCard
                            key={`Card_${advObj._id}`}
                            userHasLiked={this.props.userHasLiked}
                            adviceId={advObj._id}
                            creator_name={advObj.creator_name}
                            creator_id={advObj.creator_id}
                            advice={advObj.advice}
                            adviceStory={advObj.adviceStory}
                            category={advObj.category}
                            timeStamp={advObj.timeStamp}
                            numLikes={advObj.numLikes}
                            userId={this.props.userId}
                            numRatings = {advObj.numRatings}
                            totalRatings = {advObj.totalRatings}
                            initHasRated = {this.props.userHasRated.includes(advObj._id)}
                        />
            )
        );
        } else {
            advices = <div className = "noAdvicesSignal">No advices!</div>;
        }
        let label = "";
        let labelBig="";
        if (this.props.idQueriedUser !== "") {
            label = "user:  ";
            labelBig=this.state.nameOfProfile;
        }
        else if(this.props.categoryName!==""){
            label = "category:  ";
            labelBig=this.props.categoryName;
        }
        else{
            labelBig="all";
        }
        let sph = "sidePaneExpanded";
        if(this.props.isSidePaneHidden){
            sph = "sidePaneCollapsed";
        }
        return(
            <div className={"feedContainer"}>
                <SidePane
                    isSidePaneHidden = {this.props.isSidePaneHidden}
                    hideSidePane = {this.props.hideSidePane}
                    showSidePane = {this.props.showSidePane}
                />
                <div className={sph}>
                    <div className="categoryLabelTop">
                        <div className="littleLabel">{label}</div>
                        <div>{labelBig}</div>
                    </div>
                    {advices}
                    {this.props.isShowingPostPopup 
                        && <PostPopup
                            closePostPopup={this.props.closePostPopup}
                            addNewAdvice={this.addNewAdvice}
                            shouldAddNewAdvice = { //(x)=>{true}
                                                    this.shouldAddNewAdvice
                                                }
                        />
                    }
                </div>
            </div>
            
        )
    }
}
export default AllFeed;

