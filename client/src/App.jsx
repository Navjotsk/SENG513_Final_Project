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
  const [ready, setReady] = useState(false);
  const [finish, setFinish] = useState(false);
  const [otherFinish, setOtherFinish] = useState(false);
  const [madLib, setMadlib] = useState([]);

  const joinGame = (data) => {
    socket.emit("joinGame", {topic: data});
  };

  const typeGame = (data) => {
    socket.emit("typeGame", {id: data.id, content: data.content, room: room});

  };

  const finishGame = (data) => {
    setFinish(true)
    socket.emit("finishGame", {room: room});
  };

  const revealText = () => {
    let dom_el = document.querySelectorAll('.text-container span');
    let length = dom_el.length;
    for(let i = 0 ; i < length ; i++) {
        dom_el[i].style.color = '#000000';
        dom_el[i].style.textShadow = 'none';
    }
  }

  const finishToMain = () => {
    setLocation('main')
    setRoom(-1)
    setReady(false)
    setFinish(false)
    setOtherFinish(false)
    setMadlib([])
  }

  let id = 1; //the madlib u want to retreive
  const getMadLib = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/madlibs/${id}`);
      const jsonData = await response.json();
      setMadlib(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    socket.on("gameJoined", (data) => {
      setRoom(data.room);
      if (data.first === false) setReady(true);
    });

    socket.on("playerJoined", () => {
      setReady(true);
    });

    socket.on("receivedType", (data) => {
      document.getElementById(data.id).value = data.content; 
    });

    socket.on("otherFinish", () => {
      setOtherFinish(true);
    });

    if (finish && otherFinish) revealText();

    console.log(madLib)
    
  });

  return (
    <div className="App">
      {/* <Navbar handleSetLocation={setLocation}/> */}
      {/*<ChatBox/>*/}
      {/* {location === 'main' && <Main handleSetLocation={setLocation} />}
      {location === 'choose' && <Choice handleSetLocation={setLocation} handleJoinGame={joinGame}/>}
      {location === 'game' && <Game handleTypeGame={typeGame} isReady={ready} isFinish={finish} handleFinishGame={finishGame} handleFinishMain={finishToMain} isOtherFinish={otherFinish}/>} */}
      <UserPage />
    </div>
  );
}

export default App;