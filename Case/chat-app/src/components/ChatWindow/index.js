import React, { useState, useEffect } from "react";
import Style from "./style.module.scss";
import Image from "next/image";
import { Clock, Eye } from "../elements/icons";
import avatarImg from "../../../public/small-logo.svg";
import nameAvatarImg from "../../../public/SSTTEK_DARK_Logo.svg";

const ActiveUser = {
  avatar: avatarImg,
  nameAvatar: nameAvatarImg,
  userName: "",
  userDesc: "Cloud, The Internet",
  lastMessage: "Living the dream",
  userStatus: "online",
  userTime: "",
  color: "",
};

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatWindow = () => {
  const initials = ActiveUser.userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState(`user${Math.floor(Math.random() * 100)}`);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.emit('joinRoom', username);
  }, [username]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  useEffect(() => {
    socket.on("typing", (username) => {
      handleTyping(true);
    });

    socket.on("stopTyping", (data) => {
      handleTyping(false);
    });
  });

  const handleMessageSend = () => {
    socket.emit("message", { username, message });
    setMessage("");
    setIsTyping(false);
    socket.emit('stopTyping', username);
  };

  const handleTyping = (isTyping) => {
    setIsTyping(isTyping);
  };

  const handleKeyPress = (event) => {
    if (event && event.key === "Enter") {
      event.preventDefault();
      handleMessageSend();
    } 
    else {
      socket.emit("typing", username);
    }
  };

  return (
    <div className={Style.ChatWindow}>
      <div className={Style.chatHeader}>
        <div className={Style.userInfo}>
          {ActiveUser.avatar ? (
            <div className={Style.userAvatar}>
              <Image
                src={ActiveUser.avatar}
                width={32}
                height={28}
                alt="Avatar Image"
              />
            </div>
          ) : (
            <div
              className={Style.userAvatar}
              style={{ backgroundColor: color }}
            >
              {initials}
            </div>
          )}
          <div className={Style.UserInfoInner}>
            {ActiveUser.nameAvatar ? (
              <Image
                src={ActiveUser.nameAvatar}
                width={60}
                height={13}
                alt="Avatar Image"
              />
            ) : (
              <div className={Style.userName}>{ActiveUser.userName}</div>
            )}
            <p>{ActiveUser.userDesc}</p>
          </div>
        </div>
        <div className={Style.statusInfo}>
          <div className={Style.statusItem}>
            <Eye />
            <span>botty-beep-boop</span>
          </div>
          <div className={Style.statusItem}>
            <Clock />
            <span>5m</span>
          </div>
        </div>
      </div>
      <div className={Style.chatContainer}>
        <ul className={Style.messagesList}>
          {messages.map((message, index) =>
            message.username === username ? (
              <li
                key={index}
                className={`${Style.userMessage} ${Style.currentUserMessage} `}
              >
                {message.message}
              </li>
            ) : (
              <li key={index} className={Style.userMessage}>
                {message.message}
                
              </li>
            )
          )}
        </ul>
        {isTyping && (
                  <span
                    className={Style.typingMessage}
                  >Şu an yazıyor...</span>
                )}
      </div>
      <div className={Style.chatFooter}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          onBlur={() => handleTyping(false)}
          className={Style.Input}
          placeholder="Write a message..."
        />
        <button className={Style.sendButton} onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
