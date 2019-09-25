import React from "react";
import Map from "./map";
import Controls from "./controls";

function Hub_Right(props) {
  return (
    <div className="hub-right-container">
      {/* <h2>This is the right hub</h2> */}
      <Map worldMap={props.worldMap} gameData={props.gameData} />
      <Controls />
    </div>
  );
}

export default Hub_Right;
