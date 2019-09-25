import React from "react";

function Controls(props) {
  return (
    <div className="controls-container">

      <h3 className="room-title">Controls</h3>

      <div className="direction-controls">
        <div className="direction-box" />
        <button className="direction-box direction-button" onClick={e => props.move(e, "n")}>N</button>
        <div className="direction-box" />
        <button className="direction-box direction-button" onClick={e => props.move(e, "w")}>W</button>
        <div className="direction-box" />
        <button className="direction-box direction-button" onClick={e => props.move(e, "e")}>E</button>
        <div className="direction-box" />
        <button className="direction-box direction-button" onClick={e => props.move(e, "s")}>S</button>
        <div className="direction-box" />
        
      </div>
    </div>
  );
}

export default Controls;
