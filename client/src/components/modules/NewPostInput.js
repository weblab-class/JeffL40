import React, { Component } from "react";
import { Link } from "@reach/router";
import "./NewPostInput.css";
import { post } from "../../utilities";

class SearchInput extends Component {
    constructor(props) {//props: defaultText, onSubmit
      super(props);
  
      this.state = {
        value: "",
      };
    }
  
    // called whenever the user types in the new post input box
    handleChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    };
    render() {
      let linkDest = "/searchResults/";
      linkDest = linkDest + this.state.value;
      return (
        <div className="u-flex">
          <input
            type="text"
            placeholder={this.props.defaultText}
            value={this.state.value}
            onChange={this.handleChange}
            className="searchTextInput"
          />
          <Link to={linkDest} 
                onClick={this.props.onSubmit}
                className="searchButton"
                >
              &#x1F50E;
          </Link>
        </div>
      );
    }
  }

class ThreePostInput extends Component {
    constructor(props) {//props: defaultText0,1,2, onSubmit
      super(props);
  
      this.state = {
        value0: "", //advice
        value1: "", //advice story
        value2: "", //category
      };
    }
  
    // called whenever the user types in the new post input box
    handleChange0 = (event) => {
      this.setState({
        value0: event.target.value,
      });
    };
    handleChange1 = (event) => {
        this.setState({
          value1: event.target.value,
        });
      };
    handleChange2 = (event) => {
    this.setState({
        value2: event.target.value,
    });
    };
    // called when the user hits "Submit" for a new post
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit && this.props.onSubmit(this.state.value0
                                                ,this.state.value1
                                                ,this.state.value2);
      this.setState({
        value0: "",
        value1: "",
        value2: "",
      });
      if(this.props.closePostPopup){
        this.props.closePostPopup();
        };
    };
  
    render() {
      return (
        <div className="u-flex">
            <form className="threeContainer centerStuff">
                <textarea
                    type="text"
                    placeholder={this.props.defaultText0}
                    value={this.state.value0}
                    onChange={this.handleChange0}
                    className="adviceInput"
                >
                </textarea>
                <textarea
                    type="text"
                    placeholder={this.props.defaultText1}
                    value={this.state.value1}
                    onChange={this.handleChange1}
                    className="storyInput"
                >
                </textarea>
                <div className="catSubmitGroup">
                  <textarea
                      type="text"
                      placeholder={this.props.defaultText2}
                      value={this.state.value2}
                      onChange={this.handleChange2}
                      className="categoryInput"
                  >
                  </textarea>
                  <button
                      type="submit"
                      className="postSubmitButton u-pointer"
                      value="Submit"
                      onClick={this.handleSubmit}
                  >
                      Submit
                  </button>
                </div>
            </form>
        </div>
      );
    }
  }


class NewAdvice extends Component {
    constructor(props) { //props: addNewAdvice from allfeed
        super(props);
    }

    addAdvice = (value0, value1, value2) => {
        const body = {advice: value0, adviceStory: value1, category: value2};
        post("/api/advice", body).then((receivedAdvice) => {
            if( this.props.shouldAddNewAdvice 
                && this.props.shouldAddNewAdvice(receivedAdvice))
                {this.props.addNewAdvice(receivedAdvice);}
            else if (this.props.shouldAddNewAdvice === null){
                this.props.addNewAdvice(receivedAdvice);
            }
        });
    }
    render() {
        return <ThreePostInput 
                    defaultText0="input your advice here"
                    defaultText1="augment your advice with a story"
                    defaultText2="finally, label your advice with a category"
                    onSubmit={this.addAdvice}
                    closePostPopup={this.props.closePostPopup}
                    />
    }
}

export { NewAdvice, SearchInput };
