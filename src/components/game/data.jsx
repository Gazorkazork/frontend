import React from "react";
import "./game.css";

function Data({ gameData }) {
  console.log("gamedata", gameData);
  return (
    <div className="data-container">
      <h2 className="data-heading">{gameData.name}</h2>
      <h3 className="data-categories">Health:</h3>
      <p className="player">100</p>
      <h3 className="data-categories">Stamina:</h3>
      <p className="player">250</p>
      <br />
      {gameData.players && (
        <div className="data-players">
          <h3 className="data-categories">Players in room:</h3>
          {gameData.players.map(player => (
            <p key={player} className="player">
              {player}
            </p>
          ))}
        </div>
      )}
      <h3 className="data-categories">Items in room:</h3>
      {gameData.items &&
        gameData.items.map(item => (
          <p className="player" key={item.item_name}>
            {`${item.item_name} x ${item.amount}`}
          </p>
        ))}
    </div>
  );
}

export default Data;
