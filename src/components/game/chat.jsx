import React from "react";
import Pusher from "pusher-js";
import axios from "axios";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: []
    };
  }
  addMessage = msg => {
    this.setState(prev => ({
      ...prev,
      chat: [msg, ...prev.chat]
    }));
  };
  say = e => {
    e.preventDefault();
    axios
      .post("https://gazorkazork.herokuapp.com/api/adv/say/", {
        message: "what a message"
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    Pusher.logToConsole = true;

    const pusher = new Pusher("345e464acd1baf7700e8", {
      cluster: "us3",
      forceTLS: true
    });
    const channel_user = pusher.subscribe(`p-channel-${this.props.uuid}`);
    channel_user.bind("broadcast", data => {
      this.setState(prev => ({
        ...prev,
        chat: [data.message, ...prev.chat]
      }));
    });

    const channel_main = pusher.subscribe(`main-channel`);
    channel_main.bind("broadcast", data => {
      this.addMessage(data.message);
    });
  }

  render() {
    return (
      <div className="chat-container">
        <button onClick={this.say}>Test Say</button>
        {this.state.chat.map(txt => {
          return <p>{txt}</p>;
        })}
      </div>
    );
  }
}

export default Chat;