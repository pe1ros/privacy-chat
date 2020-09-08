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
  const users = usersConnect.users ? usersConnect.users : [];
  const connectUserNames = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < connections.length; j++) {
      if (users[i]._id === connections[j]) {
        connectUserNames.push(users[i].name);
      }
    }
  }
  return (
    <div className="usersBar">
      {connectUserNames.map((u, i) => (
        <div key={i} className="userLogo">
          <div className="userName">{u}</div>
        </div>
      ))}
    </div>
  );
};
