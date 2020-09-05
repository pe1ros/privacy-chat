import React from "react";
import "../style.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";

export const UsersBar = (props) => {
  const { userId } = useAuth();

  const users = props.users.users
    ? props.users.users.map(
        (u, i) =>
          u._id !== userId && (
            <NavLink to={`/chat/global`} key={i}>
              <div className="userLogo">
                <div className="userName">{u.name}</div>
              </div>
            </NavLink>
          )
      )
    : "Users not found";
  return !props.isExsistChat && <div className="usersBar"> {users}</div>;
};
