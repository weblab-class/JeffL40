import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import NotFound from "../pages/NotFound.js";
//import GoogleLogin, { GoogleLogout } from "react-google-login";
import SidePane from "./SidePane.js";
import AllFeed from "./AllFeed.js";
import Profile from "./Profile.js";
import SearchResults from "./SearchResults.js";

import "../../utilities.css";
import "./BrowseContainer.css";
import { get, post } from "../../utilities";
//import { get } from "mongoose";


// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class BrowseContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            isSidePaneHidden: false,
            userName: undefined,
            userHasLiked: [],
            userLikes: 0,
            userAdvices: 0,
            userHasRated: [],
        }
    }
    hideSidePane = () => {
        this.setState( {isSidePaneHidden: true});
    }
    showSidePane = () => {
        this.setState( {isSidePaneHidden: false});
    }
    componentDidMount(){
        get("/api/getProfileById", {idProfile: this.props.userId}).then(
            (foundUser) =>{
                this.setState({
                    userName: foundUser.name,
                    userHasLiked: foundUser.hasLiked,
                    userLikes: foundUser.numLikes,
                    userAdvices: foundUser.numAdvices,
                    userHasRated: foundUser.hasRated.map((someTuple)=>{
                        return someTuple.adviceId
                    }),
                })
            }
        )
    }
    // componentDidUpdate(prevProps){

    // }
    render(){
        return(
            <div className="container">
                {/* <SidePane
                    isSidePaneHidden = {this.state.isSidePaneHidden}
                    hideSidePane = {this.hideSidePane}
                    showSidePane = {this.showSidePane}
                /> */}
                <div>
                <Router>
                    <AllFeed
                        path = "/"
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        userHasLiked={this.state.userHasLiked}
                        categoryName = ""
                        idQueriedUser = ""
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                        userHasRated = {this.state.userHasRated}
                    />
                    <AllFeed
                        path = "/user"
                        userHasLiked={this.state.userHasLiked}
                        idQueriedUser = ""
                        categoryName = ""
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                        userHasRated = {this.state.userHasRated}
                    />
                    <AllFeed
                        path = "/user/:idQueriedUser"
                        userHasLiked={this.state.userHasLiked}
                        categoryName = ""
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                        userHasRated = {this.state.userHasRated}
                    />
                    <AllFeed
                        path = "/category/"
                        userHasLiked={this.state.userHasLiked}
                        categoryName = ""
                        idQueriedUser = ""
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                        userHasRated = {this.state.userHasRated}
                    />
                    <AllFeed
                        path = "/category/:categoryName"
                        userHasLiked={this.state.userHasLiked}
                        idQueriedUser = ""
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                        userHasRated = {this.state.userHasRated}
                    />
                    <Profile
                        path = "/profile/:idProfile"
                        userHasLiked={this.state.userHasLiked}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup = {this.props.closePostPopup}
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                    />
                    <SearchResults
                        path = "/searchResults/:ambiguousQuery"
                        userHasLiked={this.state.userHasLiked}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup = {this.props.closePostPopup}
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                    />
                    <SearchResults
                        path = "/searchResults/"
                        userHasLiked={this.state.userHasLiked}
                        ambiguousQuery = ""
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup = {this.props.closePostPopup}
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        hideSidePane = {this.hideSidePane}
                        showSidePane = {this.showSidePane}
                    />
                    <NotFound default />
                </Router>
                </div>
            </div>
        )
    }
}
export default BrowseContainer;