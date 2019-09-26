import React, { useState } from "react";
import axios from "axios";

import parseCommand from "../../utils/textParser";

function Input({ gameData, setGameData }) {
  const [userInput, setUserInput] = useState("");

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const parsedInput = parseCommand(userInput);
    switch (parsedInput.act) {
      case "go":
        axios
          .post("https://gazorkazork.herokuapp.com/api/adv/move/", {
            direction: parsedInput.adv
          })
          .then(res => {
            console.log(res);
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
      default:
        break;
    }
    setUserInput("");
  };
  return (
    <div className="input-container">
      <h2>{gameData.title}</h2>
      <h3>{gameData.description}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userInput"
          placeholder="Type a command..."
          value={userInput}
          onChange={handleChange}
          autoComplete="off"
        />
      </form>
    </div>
  );
}

export default Input;
