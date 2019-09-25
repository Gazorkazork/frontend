import React, { useState, useEffect } from "react";
import "./App.css";

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
          <Game handleLogout={handleLogout} />
        </div>
      ) : (
        <Landing setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
