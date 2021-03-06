import React, { useState, useEffect } from "react";
import "../style.scss";
import { NavLink } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";
import io from "socket.io-client";
import Moment from "moment";

export const socket = io();

export const UsersChat = ({ setFlagReoad, usersConnect }) => {
  const { userId } = useAuth();
  const chatId = 999;
  let userName = "";
  const users = usersConnect.users || [];
  const [message, setMessage] = useState("");
  const [usersChat, setUsersChat] = useState([]);
  const [messagesChat, setMessagesChat] = useState([]);
  const { request } = useHttp();

  for (let i = 0; i < users.length; i++) {
    if (users[i]._id === userId) {
      userName = users[i].name;
    }
  }

  const setChat = async () => {
    try {
      await request(`/api/chat/chat`, "POST", { userId, chatId });
    } catch (error) {}
  };
  const changeHandler = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    setMessagesChat([
      ...messagesChat,
      { chatId, userId, text: message.message, userName, date: Date.now() },
    ]);
    socket.emit("NEW:MESSAGE", {
      chatId,
      userId,
      text: message.message,
      userName,
      date: Date.now(),
    });
    setMessage("");
  };

  useEffect(() => {
    setChat();
    socket.emit("CHAT:JOIN", { userId, chatId });
    socket.on("GET:USERS:CHAT", (users) => {
      setUsersChat(users);
      setFlagReoad(true);
    });
    socket.on("CHAT:LEAVE", (users) => {
      setUsersChat(users);
      setFlagReoad(true);
    });
  }, []);
  socket.on("CHAT:NEW:MESSAGE", (objMessage) => {
    setMessagesChat([...messagesChat, objMessage]);
  });

  return (
    <div className="usersChat">
      <div className="twoUsersChat">
        {messagesChat.map((k, i) => {
          let styleMsg = {
            color: "green",
            alignSelf: "flex-start",
            border: "1px solid green",
            borderRadius: "10px",
            margin: "3px",
          };
          if (k.userId === userId) {
            styleMsg = {
              color: "white",
              alignSelf: "flex-end",
              border: "1px solid white",
              borderRadius: "10px",
              margin: "3px",
            };
          }
          return (
            <div key={i} style={styleMsg}>
              <div>User Name: {k.userName}</div>
              <div>
                Date: {Moment(k.date).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div>Message: {k.text}</div>
            </div>
          );
        })}{" "}
      </div>
      <div className="manager-panel">
        <input
          placeholder="Write your message here..."
          className="twoUsersChatInput"
          id="message"
          type="text"
          name="message"
          onChange={changeHandler}
          required
          value={message && message.message}
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};
