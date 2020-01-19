import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "../../utilities.css";

class TestPage extends Component{
    constructor(props) {
        super(props);
        this.state={
        };
    }
    componentDidMount() {
        this.setState( {content: this.props.auxilliaryProp});
    }
    render() {
        return (
            <>
                <h1>testPage</h1>
                {this.state.content ? <h2>{this.state.content}</h2> : <h2>no content</h2>}
            </>
        )
    }
}

export default TestPage;