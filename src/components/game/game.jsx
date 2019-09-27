import React, { useState, useEffect } from "react";
import "./game.css";
import axios from "axios";
import Data from "./data";
import MainHub from "./main-hub";

axios.interceptors.request.use(
  options => {
    if (localStorage.token)
      options.headers.authorization = `Token ${localStorage.token}`;
    return options;
  },
  err => {
    // do something with the error
    return Promise.reject(err);
  }
);

function Game(props) {
  const [userData, setUserData] = useState({});
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [worldMap, setWorldMap] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://gazorkazork.herokuapp.com/api/adv/init/")
      .then(res => {
        setUserData({ name: res.data.name });
        setGameData(res.data);
        setWorldMap(res.data.planet_map);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem("token");
        setIsLoading(false);
      });
  }, []);

  const handleLogout = e => {
    e.preventDefault();
    setGameData({});
    setUserData({});
    props.handleLogout();
  };

  const move = (e, direction) => {
    e.preventDefault();
    axios
      .post("https://gazorkazork.herokuapp.com/api/adv/move/", { direction })
      .then(res => {
        setGameData(res.data);
      })
      .catch(err => console.error(err));
  };
  return (
    <div className="game-container">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <Data gameData={gameData} />

          {worldMap.rooms && (
            <MainHub
              worldMap={worldMap}
              gameData={gameData}
              setGameData={setGameData}
              userData={userData}
              move={move}
              handleLogout={handleLogout}
            />
          )}
          {/* <h3>{gameData.error_msg}</h3> */}
        </>
      )}
    </div>
  );
}

export default Game;
