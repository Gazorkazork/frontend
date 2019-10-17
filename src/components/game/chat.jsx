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
          ? [{ key: Date.now(), message: msg }, ...prev.chat.slice(0, -1)]
          : [{ key: Date.now(), message: msg }, ...prev.chat]
    }));
  };

  componentDidMount() {
    Pusher.logToConsole = true;

    const pusher = new Pusher("345e464acd1baf7700e8", {
      cluster: "us3",
      forceTLS: true,
      authEndpoint: "https://gazorkazork.herokuapp.com/api/adv/pusher_auth/"
    });
    const channel_user = pusher.subscribe(`p-channel-${this.props.uuid}`);
    channel_user.bind("broadcast", data => {
      const split_message = data.message.split(" ");
      if (split_message[1] === "has" && split_message[2] === "entered") {
        //add name to data component
        this.props.setGameData({
          ...this.props.gameData,
          players: [...this.props.gameData.players, split_message[0]]
        });
      } else if (split_message[1] === "has" && split_message[2] === "walked") {
        //remove name to data component
        this.props.setGameData({
          ...this.props.gameData,
          players: this.props.gameData.players.filter(
            name => name !== split_message[0]
          )
        });
      }
      this.addMessage(data.message);
    });

    const channel_main = pusher.subscribe(`presence-main-channel`);
    channel_main.bind("broadcast", data => {
      const split_message = data.message.split(" ");
      if (split_message[0] === this.props.gameData.name) return;
      this.addMessage(data.message);
    });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="chat-inner-box">
          {this.state.chat.map(el => {
            return (
              <p key={el.key} className="chat-text">
                {el.message}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Chat;
