import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import "../style.scss";
import { useHttp } from "../hooks/http.hook";
import { UsersBar } from "../components/UsersBar";
import { UsersChat } from "../components/UsersChat";
import { useAuth } from "../hooks/auth.hook";
import io from "socket.io-client";

export const socket = io();

export const ChatPage = (props) => {
  const [users, setUsers] = useState([]);
  const { request } = useHttp();
  const [flagReload, setFlagLoad] = useState(false);
  const { userId } = useAuth();

  const getUsers = async () => {
    try {
      const data = await request("/api/chat/users");
      setUsers(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="chatWindow">
      <div className="row">
        <NavBar />
        <UsersBar isExsistChat={props.isExsistChat} users={users} />
        {props.isExsistChat ? (
          <UsersChat isExsistChat={props.isExsistChat} userId={userId} />
        ) : (
          <div className="startingText">
            <h5>Select User for starting chat...</h5>
          </div>
        )}
      </div>
    </div>
  );
};
