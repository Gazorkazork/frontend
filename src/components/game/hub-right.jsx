import React from "react";
import Map from "./map";
import Controls from "./controls";

function Hub_Right(props) {
  return (
    <div className="hub-right-container">
      <Map worldMap={props.worldMap} gameData={props.gameData} userData={props.userData} />
      
      {/* <button onClick={e => props.handleLogout(e)}>Logout</button>
      <h1>{props.userData.name}</h1>
      <h5>{props.gameData.description}</h5> */}
      <Controls move={props.move} />
    </div>
  );
}

export default Hub_Right;
