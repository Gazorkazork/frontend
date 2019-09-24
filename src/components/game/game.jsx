import React, { useState, useEffect } from "react";
import axios from "axios";

import World from "./world";

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

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://gazorkazork.herokuapp.com/api/adv/init/")
      .then(res => {
        setUserData({ name: res.data.name });
        setGameData(res.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
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
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <World />
          <button onClick={e => handleLogout(e)}>Logout</button>
          <h1>{userData.name}</h1>
          <h3>{gameData.title}</h3>
          <h5>{gameData.description}</h5>
          <button onClick={e => move(e, "n")}>N</button>
          <button onClick={e => move(e, "e")}>E</button>
          <button onClick={e => move(e, "s")}>S</button>
          <button onClick={e => move(e, "w")}>W</button>
          <h3>{gameData.error_msg}</h3>
        </>
      )}
    </div>
  );
}

export default Game;
