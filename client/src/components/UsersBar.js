import React from "react";
import "../style.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";

export const UsersBar = (props) => {
  const { userId } = useAuth();
  const { usersConnect } = props;
  const connections = usersConnect.currentConnect
    ? usersConnect.currentConnect[0]
    : [];
  const usersData = usersConnect.users ? usersConnect.users : [];

  return (
    <div className="usersBar">
      {connections.map((u, i) => (
        <div key={i} className="userLogo">
          <div className="userName">{u}</div>
        </div>
      ))}
    </div>
  );
};
