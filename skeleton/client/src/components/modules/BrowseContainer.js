import React, { Component } from "react";
import { Link } from "@reach/router";
import { Router } from "@reach/router";
import NotFound from "../pages/NotFound.js";
//import GoogleLogin, { GoogleLogout } from "react-google-login";
import SidePane from "./SidePane.js";
import AllFeed from "./AllFeed.js";

import "../../utilities.css";
import "./BrowseContainer.css";


// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class BrowseContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            isSidePaneHidden: false,
        }
    }
    hideSidePane = () => {
        this.setState( {isSidePaneHidden: true});
    }
    showSidePane = () => {
        this.setState( {isSidePaneHidden: false});
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="container">
                <SidePane
                    isSidePaneHidden = {this.state.isSidePaneHidden}
                    hideSidePane = {this.hideSidePane}
                    showSidePane = {this.showSidePane}
                />
                <Router>
                    <AllFeed
                        path = "/user/:userName"
                        categoryName = {null}
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                    />
                    <AllFeed
                        path = "/category/:categoryName"
                        userName = {null}
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                    />
                    <AllFeed
                        path = "/"
                        isSidePaneHidden={this.state.isSidePaneHidden}
                        userId = {this.props.userId}
                        categoryName = ""
                        userName = {null}
                        isShowingPostPopup = {this.props.isShowingPostPopup}
                        closePostPopup={this.props.closePostPopup}
                    />
                    <NotFound default />
                </Router>
            </div>
        )
    }
}
export default BrowseContainer;