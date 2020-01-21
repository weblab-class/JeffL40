import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./SearchBox.css";
import {SearchInput} from "./NewPostInput.js";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "121479668229-t5j82jrbi9oejh7c8avada226s75bopn.apps.googleusercontent.com";

class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className="searchBoxContainer">
                <div className="searchLabel">
                    Search
                    <SearchInput 
                        defaultText="searchHere"
                        onSubmit = {this.props.rerenderBrowseContainer}
                    />
                </div>
                <div className="commonCategories">
                    COMMONCATS_HERE_TEST
                    <Link to="/category/general" className="categoryLink linkOne">
                        general
                    </Link>
                    <br/>
                    <Link to="/category/academic" className="categoryLink linkTwo">
                        academic
                    </Link>
                    <br/>
                    <Link to="/category/career" className="categoryLink linkThree">
                        career
                    </Link>
                    <br/>
                    <Link to="/category/MIT" className="categoryLink linkFour">
                        MIT
                    </Link>
                </div>
            </div>
        )
    }
}
export default SearchBox;