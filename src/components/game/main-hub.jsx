import React from "react";
import Map from "./map";
import "./game.css";
import Hub_Left from "./hub-left";
import Hub_Right from "./hub-right";

function Main_Hub(props) {
  return (
    <div className="hub-container">
      {/* <h2>This is the main hub</h2> */}
      <Hub_Left gameData={props.gameData} setGameData={props.setGameData} />
      <Hub_Right worldMap={props.worldMap} gameData={props.gameData} userData={props.userData} move={props.move}/>
    </div>
  );
}

export default Main_Hub;
