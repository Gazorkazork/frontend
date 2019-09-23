import React from "react"
import Login from "./login-modal"

import './landing.css'

const Landing = () => {
  return (
    <div className="landing-main">
      {/* <h1>Gazorkazork MUD</h1>
      <p>This will be a landing page filled with whatever data and information we feel like sharing 
        with our users in addition to the login and register modal</p>
      <p>Maybe possibly an image or something like that for the background???</p>
      <p>The sky is the limit, really.</p> */}

      <Login />
    </div>

  )
}

export default Landing