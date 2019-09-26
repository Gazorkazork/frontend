import React from "react";

function Controls(props) {
  return (
    <div className="controls-container">
      <h3 className="hub-right-heading">Controls</h3>
      <div className="controls-buttons">
        <div className="direction-controls">
          <div className="direction-box" />
          <button
            className="direction-box direction-button"
            onClick={e => props.move(e, "n")}
          >
            N
          </button>
          <div className="direction-box" />
          <button
            className="direction-box direction-button"
            onClick={e => props.move(e, "w")}
          >
            W
          </button>
          <div className="direction-box" />
          <button
            className="direction-box direction-button"
            onClick={e => props.move(e, "e")}
          >
            E
          </button>
          <div className="direction-box" />
          <button
            className="direction-box direction-button"
            onClick={e => props.move(e, "s")}
          >
            S
          </button>
          <div className="direction-box" />
        </div>
        <div className="command-buttons">
          <h4 className="commands">Text Commands:</h4>
          <p className="command-text">go</p>
          <p className="command-text">say</p>
          <p className="command-text">shout</p>
          <p className="command-text">whisper to</p>
          <p className="command-text">get</p>
          <p className="command-text">drop</p>
        </div>
      </div>
      <div>
        <button
          className="direction-button logout-button"
          onClick={e => props.handleLogout(e)}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Controls;
