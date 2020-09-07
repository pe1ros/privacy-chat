import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../style.scss";
import { socket } from "../pages/ChatPage";

export const NavBar = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    auth.logOut();
    window.location.reload();
    //socket.emit("forceDisconnect");
  };

  return (
    <div className="nav">
      <h4>Chat</h4>
      <button className="btn btn-exit" onClick={logoutHandler}>
        Exit
      </button>
    </div>
  );
};
