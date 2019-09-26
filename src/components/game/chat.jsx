import React from "react";
import Pusher from "pusher-js";

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
      chat:
        prev.chat.length >= 30
          ? [msg, ...prev.chat.slice(1)]
          : [msg, ...prev.chat]
    }));
  };

  componentDidMount() {
    Pusher.logToConsole = true;

    const pusher = new Pusher("345e464acd1baf7700e8", {
      cluster: "us3",
      forceTLS: true
    });
    const channel_user = pusher.subscribe(`p-channel-${this.props.uuid}`);
    channel_user.bind("broadcast", data => {
      this.addMessage(data.message);
    });

    const channel_main = pusher.subscribe(`main-channel`);
    channel_main.bind("broadcast", data => {
      this.addMessage(data.message);
    });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="chat-inner-box">
          {this.state.chat.map(txt => {
            return <p className="chat-text">{txt}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default Chat;
