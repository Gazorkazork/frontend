import React from "react";

import Chat from "./chat.jsx";
import Input from "./input.jsx";

function Hub_Left(props) {
  return (
    <div className="hub-left-container">
      <Chat />
      <Input />
    </div>
  );
}

export default Hub_Left;
