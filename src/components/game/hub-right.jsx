import React from "react";
import Map from "./map";
import Controls from "./controls";

function HubRight(props) {
  return (
    <div className="hub-right-container">
      <Map
        worldMap={props.worldMap}
        gameData={props.gameData}
        userData={props.userData}
      />
      <Controls move={props.move} handleLogout={props.handleLogout} />
    </div>
  );
}

export default HubRight;
