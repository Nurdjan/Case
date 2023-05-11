import Head from "next/head";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700"],
});

import io from "socket.io-client";
import { useState, useEffect } from "react";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import ChatWindow from "@/components/ChatWindow";
import { UserListData } from "@/constants/userListData";

const socket = io.connect("http://localhost:3001");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleMessageSend = () => {
    socket.emit("message", message);
    setMessage("");
  };
  return (
    <>
      <Head>
        <title>ChatApp</title>
        <meta name="description" content="ChatApp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`main-container ${roboto.className}`}>
        <LeftSideBar data={UserListData} />
        <ChatWindow />
        <RightSideBar />
        {/* <div>
          <h1>Chat App</h1>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessageSend}>Send</button>
        </div> */}
      </main>
    </>
  );
}
