import React, { useState, useEffect } from "react";
import axios from "axios";

// axios.interceptors.request.use(
//   options => {
//     options.headers.authorization = `Token ${localStorage.token}`;
//     return options;
//   },
//   err => {
//     // do something with the error
//     return Promise.reject(err);
//   }
// );

function Game(props) {
  const [userData, setUserData] = useState({});
  const [gameData, setGameData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let options = {
      headers: {
        authorization: `Token ${localStorage.token}`
      }
    };
    setIsLoading(true);
    axios
      .get("https://gazorkazork.herokuapp.com/api/adv/init/", options)
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
  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          <button onClick={e => handleLogout(e)}>Logout</button>
          <h1>{userData.name}</h1>
          <h3>{gameData.title}</h3>
          <h5>{gameData.description}</h5>
        </>
      )}
    </div>
  );
}

export default Game;
