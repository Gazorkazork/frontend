import React, { useState } from "react";
import axios from "axios";

import parseCommand from "../../utils/textParser";

let histIndex = -1;

function Input({ gameData, setGameData }) {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const handleKeyUp = async e => {
    if (e.key === "ArrowUp" && histIndex < history.length - 1) {
      e.preventDefault();
      histIndex++;
      setUserInput(history[histIndex]);
    } else if (e.key === "ArrowDown" && histIndex > 0) {
      e.preventDefault();
      histIndex--;
      setUserInput(history[histIndex]);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newHist = history.filter((el, i) => i !== histIndex);
    setHistory(
      newHist.length >= 100
        ? [userInput, ...newHist.slice(1)]
        : [userInput, ...newHist]
    );
    histIndex = -1;
    const parsedInput = parseCommand(userInput);
    switch (parsedInput.act) {
      case "go":
        axios
          .post("https://gazorkazork.herokuapp.com/api/adv/move/", {
            direction: parsedInput.adv
          })
          .then(res => {
            setGameData(res.data);
          })
          .catch(err => console.error(err));
        break;
      case "say":
        axios
          .post("https://gazorkazork.herokuapp.com/api/adv/say/", {
            message: parsedInput.dirObj
          })
          .catch(err => console.error(err));
        break;
      case "shout":
        axios
          .post("https://gazorkazork.herokuapp.com/api/adv/shout/", {
            message: parsedInput.dirObj
          })
          .catch(err => console.error(err));
        break;
      case "whisper":
        axios
          .post("https://gazorkazork.herokuapp.com/api/adv/whisper/", {
            message: parsedInput.dirObj,
            target: parsedInput.indObj
          })
          .catch(err => console.error(err));
        break;
      default:
        break;
    }
    setUserInput("");
  };
  return (
    <div className="input-container">
      <h2 className="input-room-title">{gameData.title}</h2>
      <h3 className="input-room-description">{gameData.description}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          type="text"
          name="userInput"
          placeholder="Type a command..."
          value={userInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          autoComplete="off"
          maxLength="250"
        />
      </form>
    </div>
  );
}

export default Input;
