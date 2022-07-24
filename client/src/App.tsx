import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {useSockets} from './context/socket.context';

function App() {
  const {socket, messages, setMessages} = useSockets();
  const messageRef = useRef(null);
  console.log(messages);

  function handleClick() {
    const message = messageRef.current.value;
    if (!String(message).trim()) return;

    socket.emit("sendMessage", message);

    messageRef.current.value = "";
  }

  socket.on("responseMessage", (message) => {
    console.log(message);
    setMessages([...messages, message]);
    console.log(messages);
  });

  return (
    <>
      <input type="text" ref={messageRef} placeholder="write message" />
      <button onClick={handleClick}>Send</button>
      <Messages />
        
    </>
  );
}

function Messages() {
  const {socket, messages, setMessages} = useSockets();
  return (<>
    {messages && (<div>
      {messages.map(({message}, index) => {
        return <li key={index}>{message}</li>
      })}
    </div>)}
  </>
  );
}

export default App;