import React, { useState, useEffect } from "react";
import "../style.scss";
import { NavLink } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { socket } from "../pages/ChatPage";
import { useAuth } from "../hooks/auth.hook";

export const UsersChat = (props) => {
  const chatId = window.location.pathname.split("/chat/")[1];
  const [message, setMessage] = useState("");
  const [messagesChat, setMessagesChat] = useState([]);
  const { request } = useHttp();

  const getChatData = async () => {
    try {
      socket.emit("CHAT:JOIN", {
        chatId,
        userId: props.userId,
      });
      await request(`/api/chat/global`);
    } catch (error) {}
  };

  const changeHandler = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
  };
  useEffect(() => {
    getChatData();
  }, []);

  socket.on("USER:JOINED", (chats) => {
    console.log(chats);
  });
  return (
    <div className="usersChat">
      <div className="twoUsersChat">
        {messagesChat && (
          <div>
            <div>{messagesChat.date}</div>
            <div>{messagesChat.message}</div>
          </div>
        )}
      </div>
      <div>
        <NavLink to={"/"}>
          <img
            className="closeImg"
            src="https://image.flaticon.com/icons/svg/1828/1828665.svg"
            alt="Close"
          />
        </NavLink>
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
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};
