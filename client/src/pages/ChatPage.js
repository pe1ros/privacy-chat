import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import "../style.scss";
import { useHttp } from "../hooks/http.hook";
import { UsersBar } from "../components/UsersBar";
import { UsersChat } from "../components/UsersChat";
import { useAuth } from "../hooks/auth.hook";

export const ChatPage = ({ isExsistChat }) => {
  const [usersConnect, setUsersConnect] = useState([]);
  const { request } = useHttp();
  const [flagReload, setFlagReoad] = useState(false);
  const { userId } = useAuth();

  const getUsers = async () => {
    try {
      //get all registered users array and users connections Id
      const data = await request("/api/chat/users");
      setUsersConnect(data);
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getUsers();
    setFlagReoad(false);
  }, [flagReload]);

  return (
    <div className="chatWindow">
      <div className="row">
        <NavBar />
        <UsersBar usersConnect={usersConnect} />
        <UsersChat usersConnect={usersConnect} setFlagReoad={setFlagReoad} />
      </div>
    </div>
  );
};
