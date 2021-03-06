import React from "react";

import Chat from "./chat.jsx";
import Input from "./input.jsx";

function HubLeft(props) {
  return (
    <div className="hub-left-container">
      <Chat
        uuid={props.gameData.uuid}
        setGameData={props.setGameData}
        gameData={props.gameData}
      />
      <Input setGameData={props.setGameData} gameData={props.gameData} />
    </div>
  );
}

export default HubLeft;
