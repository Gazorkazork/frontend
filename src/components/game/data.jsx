import React from "react";
import "./game.css";

function Data({ gameData }) {
  console.log(gameData);
  return (
    <div className="data-container">
      <h2 className="data-heading">{gameData.name}</h2>
      <h3>Health:</h3>
      <p className="player">100</p>
      <h3>Stamina:</h3>
      <p className="player">250</p>
      <br />
      {gameData.players && (
        <div className="data-players">
          <h3>Players in room:</h3>
          {gameData.players.map(player => (
            <p key={player} className="player">
              {player}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Data;
