import React, { useState } from "react";
import axios from "axios";

function Input(props) {
  const [userInput, setUserInput] = useState("");
  const say = e => {
    e.preventDefault();
    axios
      .post("https://gazorkazork.herokuapp.com/api/adv/say/", {
        message: userInput
      })
      .then(res => setUserInput(""))
      .catch(err => console.error(err));
  };

  const handleChange = e => {
    setUserInput(e.target.value);
  };
  return (
    <div className="input-container">
      <h2>This is the input box</h2>
      <form onSubmit={say}>
        <input
          type="text"
          name="userInput"
          placeholder="Type a command..."
          value={userInput}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Input;
