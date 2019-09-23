import React, { useState } from "react";

const Login = () => {

  const [isRegister, setIsRegister] = useState(false)

  return (
    <div class="modal-wrapper">
      <div class="login-wrapper">
        <div class="collapsed-section hidden">
          <div class="hide-section">
            <h2 class="collapsed-heading">Have an Account?</h2>
            <p class="collapsed-text">
              To keep connected with us please
              <br />
              login with your personal info
            </p>
            <button class="collapsed-btn" onclick={(e) => {
              e.preventDefault()
              setIsRegister(false)
            }}>
              Log In
            </button>
          </div>
        </div>

        <div class="form-wrapper login">
          <h2 class="form-heading">Log In To Your Profile</h2>
          <form action="" class="form login">
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value="" />
            </div>

            <div class="input-field">
              <i class="fas fa-key"></i>
              <input type="password" placeholder="Password" value="" />
            </div>
            <button class="form-btn" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>

      <div class="signup-wrapper">
        <div class="collapsed-section hidden">
          <div class="hide-section">
            <h2 class="collapsed-heading">New Here?</h2>
            <p class="collapsed-text">
              Create an account
              <br />
              and start playing!
            </p>
            <button class="collapsed-btn" onclick={(e) => {
              e.preventDefault()
              setIsRegister(true)
            }}>
              Sign Up
            </button>
          </div>
        </div>

        <div class="form-wrapper signup">
          <h2 class="form-heading">Create Account</h2>

          <form action="" class="form login">
            <span>or use your email for registration:</span>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Name" value="" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" value="" />
            </div>
            <div class="input-field">
              <i class="fas fa-key"></i>
              <input type="password" placeholder="Password" value="" />
            </div>
            <button class="form-btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
