import React from "react";
import "./game.css";

function Data({ gameData }) {
  console.log(gameData);
  return (
    <div className="data-container">
      <h2>{gameData.name}</h2>
      {gameData.players && (
        <div className="data-players">
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
