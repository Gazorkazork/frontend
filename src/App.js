import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/Gazorkazork_title.png"

import Landing from "./components/landing/landing.js";
import Game from "./components/game/game";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (localStorage.token) setIsLoggedIn(true);
  }, []);
  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="main-container">
          <img className="logo" alt="Gazorkazork" src={logo}/>
          <Game handleLogout={handleLogout} />
        </div>
      ) : (
        <Landing setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
