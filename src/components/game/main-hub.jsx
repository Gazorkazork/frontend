import React from "react";
import "./game.css";
import HubLeft from "./hub-left";
import HubRight from "./hub-right";

function MainHub(props) {
  return (
    <div className="hub-container">
      {/* <h2>This is the main hub</h2> */}
      <HubLeft gameData={props.gameData} setGameData={props.setGameData} />
      <HubRight
        handleLogout={props.handleLogout}
        worldMap={props.worldMap}
        gameData={props.gameData}
        userData={props.userData}
        move={props.move}
      />
    </div>
  );
}

export default MainHub;
