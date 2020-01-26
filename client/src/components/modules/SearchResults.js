import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import PostPopup from "./PostPopup.js";

import "../../utilities.css";
import "./SearchResults.css";
import { get } from "../../utilities";
import SidePane from "./SidePane.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class SearchResults extends Component {
  constructor(props) {
    super(props); //prop: 
    // Initialize Default State
    this.state = {
        gotUsers: [],
        gotCategories: [],
    };
  }

  componentDidMount() {
    // remember -- api calls go here!
    const query = { target: this.props.ambiguousQuery};
    get( "/api/usersWithName", query).then(
        (foundUsers) =>{
                this.setState({ gotUsers: foundUsers });
        }
    );
    get( "/api/categoriesWithSubstring", query).then(
        (foundCategories) =>{
                this.setState(
                    { gotCategories: foundCategories });
        }
    );
  }

  componentDidUpdate(prevProps){
    if(this.props.ambiguousQuery !== prevProps.ambiguousQuery){
        const query = { target: this.props.ambiguousQuery};
        get( "/api/usersWithName", query).then(
            (foundUsers) =>{
                    this.setState({ gotUsers: foundUsers });
            }
        );
        get( "/api/categoriesWithSubstring", query).then(
            (foundCategories) =>{
                    this.setState(
                        { gotCategories: foundCategories });
            }
    );}
  }

  render() {
    let sph = "sidePaneExpandedSR";
    if(this.props.isSidePaneHidden){
        sph = "sidePaneCollapsedSR";
    }

    let usersToDisplay = null;
        const hasUser = this.state.gotUsers.length !== 0;
        if (hasUser) {
            let x = "/profile/";
            usersToDisplay = this.state.gotUsers
                      .map((usrObj) => (
                        <Link to= {x + usrObj._id} 
                        className="resultsItem userColor"
                        key={`userResult_${usrObj._id}`}>
                            {usrObj.name}
                            {/* <br/>
                            id: {usrObj._id} */}
                        </Link>
        ));
        } else {
            usersToDisplay = <div className="noneFoundLabel">No users found.</div>;
        };
    let catsToDisplay = null;
        const hasCat = this.state.gotCategories.length !== 0;
        if (hasCat) {
            let x = "/category/";
            catsToDisplay = this.state.gotCategories
                      .map((catObj) => (
                        <Link to= {x + catObj.categoryName} 
                        className="resultsItem"
                        key={`catResult_${catObj._id}`}>
                            {catObj.categoryName}
                        </Link>
        ));
        } else {
            catsToDisplay = <div className="noneFoundLabel">No categories found.</div>;
        };

    return(
      <div className={"feedContainer"}>
                <SidePane
                    isSidePaneHidden = {this.props.isSidePaneHidden}
                    hideSidePane = {this.props.hideSidePane}
                    showSidePane = {this.props.showSidePane}
                />
        <div className={sph}>
          <div className="resultsDescription">
            <div className="miniTagRes">results for&nbsp;</div> 
            <div className="queryLabel">{this.props.ambiguousQuery}</div>
          </div>
          <div className="resultGrouping">
            <div className="singleResultsColumn">
                <div className="categoriesColumnLabel">categories</div>
                {catsToDisplay}
            </div>
            <div className="singleResultsColumn">
                <div className="usersColumnLabel">users</div>
                {usersToDisplay}
            </div>
          </div>
          {this.props.isShowingPostPopup 
                && <PostPopup
                    closePostPopup={this.props.closePostPopup}
                    addNewAdvice={()=>{0}}
                    shouldAddNewAdvice = {()=>{false}}
                />
            }
        </div>
      </div>
    )
  }
}

export default SearchResults;
