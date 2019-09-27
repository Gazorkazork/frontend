import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  const [loginState, setLoginState] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({
    login: false,
    registration: false,
    msg: ""
  });

  const [registerState, setRegisterState] = useState({
    username: "",
    password1: "",
    password2: ""
  });

  const [passwordErr, setPasswordErr] = useState({
    isError: false,
    message: ""
  });

  const passwordError = password => {
    let chars = RegExp("[a-zA-Z]", "g");
    let digits = RegExp("[0-9]", "g");

    if (
      password.length < 9 ||
      !chars.test(password) ||
      !digits.test(password)
    ) {
      setPasswordErr({
        isError: true,
        message:
          "Password must contain AT LEAST 9 characters, 2 letters, and 2 numbers"
      });
    } else {
      setPasswordErr({
        isError: false,
        message: ""
      });
    }
  };

  // const [isRegister, setIsRegister] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post("https://gazorkazork.herokuapp.com/api/login/", loginState)
      .then(res => {
        localStorage.setItem("token", res.data.key);
        props.setIsLoggedIn(true);
      })
      .catch(err => {
        setErrorMsg({ login: true, msg: "Bad! Bad credentials!" });
        console.error(err);
      });
  };

  const handleRegister = e => {
    e.preventDefault();
    axios
      .post(
        "https://gazorkazork.herokuapp.com/api/registration/",
        registerState
      )
      .then(res => {
        localStorage.setItem("token", res.data.key);
        props.setIsLoggedIn(true);
      })
      .catch(err => {
        setErrorMsg({
          register: true,
          msg: "Try a stronger password or different username or something idk"
        });
        console.error(err);
      });
  };

  const loginChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    });
  };

  const registerChange = e => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-wrapper">
      <div className="login-wrapper">
        {/* <div className="collapsed-section">
          <div className="hide-section">
            <h2 className="collapsed-heading">Have an Account?</h2>
            <p className="collapsed-text">
              To keep connected with us please
              <br />
              login with your personal info
            </p>
            <button
              className="collapsed-btn"
              onClick={e => {
                e.preventDefault();
                setIsRegister(false);
              }}
            >
              Log In
            </button>
          </div>
        </div> */}

        <div className="form-wrapper login">
          <h2 className="form-heading">Log In To Your Profile</h2>
          <form className="form login" onSubmit={handleLogin}>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                placeholder="Username"
                onChange={loginChange}
                name="username"
                value={loginState.username}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-key"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={loginChange}
                name="password"
                value={loginState.password}
              />
            </div>
            {errorMsg.login && (
              <p className="login-error-message">{errorMsg.msg}</p>
            )}
            <button className="form-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>

      <div className="signup-wrapper">
        {/* <div className="collapsed-section hidden">
          <div className="hide-section">
            <h2 className="collapsed-heading">New Here?</h2>
            <p className="collapsed-text">
              Create an account
              <br />
              and start playing!
            </p>
            <button
              className="collapsed-btn"
              onClick={e => {
                e.preventDefault();
                setIsRegister(true);
              }}
            >
              Sign Up
            </button>
          </div>
        </div> */}

        <div className="form-wrapper signup">
          <h2 className="form-heading">Create Account</h2>

          <form action="" className="form login" onSubmit={handleRegister}>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                placeholder="Username"
                onChange={registerChange}
                name="username"
                value={registerState.username}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-key"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={registerChange}
                name="password1"
                value={registerState.password1}
                onBlur={e => {
                  passwordError(e.target.value);
                }}
              />
              {passwordErr.isError && (
                <p className="login-error-message">{passwordErr.message}</p>
              )}
            </div>
            <div className="input-field">
              <i className="fas fa-key"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={registerChange}
                name="password2"
                value={registerState.password2}
              />
            </div>
            {errorMsg.register && (
              <p className="login-error-message">{errorMsg.msg}</p>
            )}
            <button className="form-btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
