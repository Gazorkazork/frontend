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
      <Hub_Right worldMap={props.worldMap} gameData={props.gameData} />
      {/* <button onClick={e => props.handleLogout(e)}>Logout</button>
      <h1>{props.userData.name}</h1>
      <h3>{props.gameData.title}</h3>
      <h5>{props.gameData.description}</h5>
      <button onClick={e => props.move(e, "n")}>N</button>
      <button onClick={e => props.move(e, "e")}>E</button>
      <button onClick={e => props.move(e, "s")}>S</button>
      <button onClick={e => props.move(e, "w")}>W</button> */}
    </div>
  );
}

export default Main_Hub;
