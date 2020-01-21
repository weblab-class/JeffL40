import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import LoginPage from "./pages/LoginPage.js";
//import Profile from "./pages/Profile.js";
import BrowseContainer from "./modules/BrowseContainer.js";
import PostPopup from "./modules/PostPopup.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NavBar from "./modules/NavBar.js";
import SidePane from "./modules/SidePane.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      //auxilliaryState : -1,
      userId: undefined,
      userName: undefined,
      userLikes: 0,
      userDislikes: 0,
      userAdvices: 0,
      isShowingPostPopup: false,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id,
          userName: user.name,
          userLikes: user.numLikes,
          userDislikes: user.numDislikes,
          userAdvices: user.numAdvices,
        });
      }
    });
    document.body.style.backgroundColor="white";
  }

  // changeAuxilliaryState = () => {
  //   this.setState({ auxilliaryState: -this.state.auxilliaryState});
  // }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  closePostPopup = () => {
    this.setState({ isShowingPostPopup: false});
  };

  openPostPopup = () => {
    this.setState({isShowingPostPopup: true});
  };

  render() {
    if (
      //true||
      this.state.userId){
      return (
        <>
          <NavBar
            handleLogout={this.handleLogout}
            openPostPopup = {this.openPostPopup}
            userId={this.state.userId}
          />
            <BrowseContainer
              userId={this.state.userId}
              userName={this.state.userName}
              userLikes={this.state.userLikes}
              userDislikes={this.state.userDislikes}
              userAdvices={this.state.userAdvices}
              isShowingPostPopup = {this.state.isShowingPostPopup}
              closePostPopup={this.closePostPopup}
            />
        </>
      )
    }
    /**
     {this.state.isShowingPostPopup 
            && <PostPopup
                  closePostPopup={this.closePostPopup}
              />
      }
     */
    /**
          <NavBar
            handleLogout={this.handleLogout}
          />
     */
    /**
          <Router>
            <BrowseContainer 
              path="/" 
              userId={this.state.userId} 
            />
            <Profile path="/profile/:userId" />
            <NotFound default />
          </Router>
     */
    else {
      return(
        <>
          <LoginPage
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.userId}
          />
        </>
      )
    }
  }
}
export default App;
