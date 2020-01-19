import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import ClickyBar from "./ClickyBar.js";
import SearchBox from "./SearchBox.js";

import "../../utilities.css";
import "./SidePane.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class SidePane extends Component {
    constructor(props){
        super(props); //has prop isSidePaneHidden, showSidePane, hideSidePane
        this.state={
        }
    }
    componentDidMount(){

    }
    render(){
        if (this.props.isSidePaneHidden) {
            return(
                <div className="wrapper collapsed">
                        <ClickyBar 
                            isSidePaneHidden = {this.props.isSidePaneHidden}
                            hideSidePane = {this.props.hideSidePane}
                            showSidePane = {this.props.showSidePane}
                        />
                    </div>
            )
        }
        else{//side pane is expanded
            return(
                    <div className="wrapper expanded">
                        <SearchBox/>
                        <ClickyBar 
                            isSidePaneHidden = {this.props.isSidePaneHidden}
                            hideSidePane = {this.props.hideSidePane}
                            showSidePane = {this.props.showSidePane}
                        />
                    </div>
            )
        }
    }
}
export default SidePane;