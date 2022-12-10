import './App.css';
import { useState, useEffect } from "react";
import Navbar from './components/NavBar';
import Main from './components/Main';
import Choice from './components/Choice';
import Game from './components/Game';

import ChatBox from './components/ChatBox';
import UserPage from './components/UserPage'

import io from 'socket.io-client';
const socket = io.connect("http://localhost:5000");

function App() {

  const [location, setLocation] = useState('main');
  const [room, setRoom] = useState(-1);

  const joinGame = (data) => {
    socket.emit("joinGame", {topic: data});
  };

  const typeGame = (data) => {
    socket.emit("typeGame", {id: data.id, content: data.content, room: room});
  };

  useEffect(() => {
    socket.on("gameJoined", (data) => {
      setRoom(data.room);
    });

    socket.on("receivedType", (data) => {
      document.getElementById(data.id).value = data.content; 
    });
    
  }, [socket]);

  return (
    <div className="App">
      <Navbar handleSetLocation={setLocation}/>
      {/*<ChatBox/>*/}
      {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'choose' && <Choice handleSetLocation={setLocation} />}
      {location === 'game' && <Game />}
      <ChatBox/>
    </div>
  );
}

export default App;