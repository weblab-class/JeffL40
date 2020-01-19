import React, { Component } from "react";

import "./NewPostInput.css";
import { post } from "../../utilities";

class NewPostInput extends Component {
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

  // called when the user hits "Submit" for a new post
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="textInput"
        />
        <button
          type="submit"
          className="submitButton u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
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
            <form>
                <input
                    type="text"
                    placeholder={this.props.defaultText0}
                    value={this.state.value0}
                    onChange={this.handleChange0}
                    className="textInput"
                />
                <br/>
                <input
                    type="text"
                    placeholder={this.props.defaultText1}
                    value={this.state.value1}
                    onChange={this.handleChange1}
                    className="textInput"
                />
                <br/>
                <input
                    type="text"
                    placeholder={this.props.defaultText2}
                    value={this.state.value2}
                    onChange={this.handleChange2}
                    className="textInput"
                />
                <br/>
                <button
                    type="submit"
                    className="submitButton u-pointer"
                    value="Submit"
                    onClick={this.handleSubmit}
                >
                    Submit
                </button>
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
        })
    }
    render() {
        return <ThreePostInput 
                    defaultText0="New Advice"
                    defaultText1="storyGoesHere"
                    defaultText2="categoryGoesHere"
                    onSubmit={this.addAdvice}
                    closePostPopup={this.props.closePostPopup}
                    />
    }
}

// class NewAdvice extends Component {
//     constructor(props) { //props: addNewAdvice from allfeed
//         super(props);
//     }

//     addAdvice = (value) => {
//         const body = {advice: value};
//         post("/api/advice", body).then((receivedAdvice) => {
//             this.props.addNewAdvice(receivedAdvice);
//         })
//     }
//     render() {
//         return <NewPostInput defaultText="New Advice" onSubmit={this.addAdvice}/>
//     }
// }

/**
 * New Comment is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId to add comment to
 */
class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  addComment = (value) => {
    const body = { parent: this.props.storyId, content: value };
    post("/api/comment", body).then((comment) => {
      // display this comment on the screen
      this.props.addNewComment(comment);
    });
  };

  render() {
    return <NewPostInput defaultText="New Comment" onSubmit={this.addComment} />;
  }
}

/**
 * New Story is a New Post component for comments
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewStory extends Component {
  addStory = (value) => {
    const body = { content: value };
    post("/api/story", body).then((story) => {
      // display this story on the screen
      this.props.addNewStory(story);
    });
  };

  render() {
    return <NewPostInput defaultText="New Story" onSubmit={this.addStory} />;
  }
}

/**
 * New Message is a New Message component for messages
 *
 * Proptypes
 * @param {UserObject} recipient is the intended recipient
 */
class NewMessage extends Component {
  sendMessage = (value) => {
    const body = { recipient: this.props.recipient, content: value };
    post("/api/message", body);
  };

  render() {
    return <NewPostInput defaultText="New Message" onSubmit={this.sendMessage} />;
  }
}

export { NewAdvice, NewComment, NewStory, NewMessage };
